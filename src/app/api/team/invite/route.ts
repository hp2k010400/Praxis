import { NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { sendInviteEmail } from "@/lib/email/resend";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  role: z.enum(["admin", "compliance", "risk", "viewer"]),
  organisationId: z.string().uuid(),
});

export async function POST(request: Request) {
  const supabase = await createClient();
  const serviceClient = await createServiceClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { email, role, organisationId } = parsed.data;

  // Verify the inviter is an owner or admin of this org
  const { data: membership } = await supabase
    .from("organisation_members")
    .select("role")
    .eq("organisation_id", organisationId)
    .eq("user_id", user.id)
    .single();

  if (!membership || !["owner", "admin"].includes(membership.role)) {
    return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
  }

  // Get org name and inviter name
  const [{ data: org }, { data: inviterProfile }] = await Promise.all([
    supabase.from("organisations").select("name").eq("id", organisationId).single(),
    supabase.from("profiles").select("full_name").eq("id", user.id).single(),
  ]);

  // Create a pending invite record (uses Supabase auth invite)
  const { data: invite, error } = await serviceClient.auth.admin.inviteUserByEmail(email, {
    data: {
      organisation_id: organisationId,
      role,
      invited_by: user.id,
    },
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback?next=/dashboard`,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Send custom invite email
  await sendInviteEmail({
    to: email,
    inviterName: inviterProfile?.full_name ?? "A team member",
    orgName: org?.name ?? "your organisation",
    role,
    inviteUrl: `${process.env.NEXT_PUBLIC_APP_URL}/signup?token=${invite.user.id}`,
  });

  return NextResponse.json({ success: true });
}
