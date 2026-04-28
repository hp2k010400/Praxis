import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { stripe, PLANS } from "@/lib/stripe";
import { z } from "zod";
import type { Plan } from "@/lib/stripe";

const schema = z.object({
  plan: z.enum(["starter", "professional", "enterprise"]),
  organisationId: z.string().uuid(),
});

export async function POST(request: Request) {
  const supabase = await createClient();

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

  const { plan, organisationId } = parsed.data;
  const planConfig = PLANS[plan as Plan];

  if (plan === "enterprise") {
    return NextResponse.json({ error: "Contact sales for Enterprise" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: planConfig.priceId,
        quantity: 1,
      },
    ],
    metadata: {
      organisation_id: organisationId,
      plan,
    },
    customer_email: user.email,
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?canceled=1`,
    subscription_data: {
      trial_period_days: 14,
      metadata: { organisation_id: organisationId, plan },
    },
  });

  return NextResponse.json({ url: session.url });
}
