import { Resend } from "resend";

let _resend: Resend | undefined;

function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY ?? "re_placeholder");
  }
  return _resend;
}

function from(): string {
  const name = process.env.RESEND_FROM_NAME ?? "Praxis";
  const email = process.env.RESEND_FROM_EMAIL ?? "noreply@praxis.app";
  return `${name} <${email}>`;
}

export async function sendWelcomeEmail(params: { to: string; name: string; orgName: string }) {
  return getResend().emails.send({
    from: from(),
    to: params.to,
    subject: `Welcome to Praxis, ${params.name}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#e2e8f0;background:#0b0f1a;padding:32px;border-radius:8px">
        <h1 style="font-size:24px;font-weight:700;color:#fff;margin-bottom:8px">Welcome to Praxis</h1>
        <p>Hi ${params.name},</p>
        <p>Your organisation <strong>${params.orgName}</strong> is now set up on Praxis.</p>
        <p>Get started by running your first Consumer Duty assessment.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="display:inline-block;background:#4f79e6;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;margin:16px 0">
          Go to Dashboard →
        </a>
        <p style="color:#64748b;font-size:12px;margin-top:32px">Praxis — Consumer Duty Compliance Platform</p>
      </div>
    `,
  });
}

export async function sendActionDueEmail(params: {
  to: string;
  name: string;
  actionTitle: string;
  dueDate: string;
  assessmentTitle: string;
  actionUrl: string;
}) {
  return getResend().emails.send({
    from: from(),
    to: params.to,
    subject: `Action due: ${params.actionTitle}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#e2e8f0;background:#0b0f1a;padding:32px;border-radius:8px">
        <h2 style="color:#f59e0b">Action Due Reminder</h2>
        <p>Hi ${params.name},</p>
        <p>The following action is due on <strong>${params.dueDate}</strong>:</p>
        <div style="background:#1e293b;border-left:4px solid #4f79e6;padding:16px;border-radius:4px;margin:16px 0">
          <p style="margin:0;font-weight:600">${params.actionTitle}</p>
          <p style="margin:4px 0 0;color:#94a3b8;font-size:14px">Assessment: ${params.assessmentTitle}</p>
        </div>
        <a href="${params.actionUrl}" style="display:inline-block;background:#4f79e6;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600">
          View Action →
        </a>
      </div>
    `,
  });
}

export async function sendInviteEmail(params: {
  to: string;
  inviterName: string;
  orgName: string;
  role: string;
  inviteUrl: string;
}) {
  return getResend().emails.send({
    from: from(),
    to: params.to,
    subject: `${params.inviterName} invited you to ${params.orgName} on Praxis`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#e2e8f0;background:#0b0f1a;padding:32px;border-radius:8px">
        <h2 style="color:#fff">You've been invited to Praxis</h2>
        <p><strong>${params.inviterName}</strong> has invited you to join <strong>${params.orgName}</strong> as a <strong>${params.role}</strong>.</p>
        <a href="${params.inviteUrl}" style="display:inline-block;background:#4f79e6;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;margin:16px 0">
          Accept Invitation →
        </a>
        <p style="color:#64748b;font-size:12px">This invitation expires in 7 days.</p>
      </div>
    `,
  });
}
