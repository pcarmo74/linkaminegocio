import "server-only";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "LinkaMiNegocio <onboarding@resend.dev>";

export async function sendWelcomeEmail(
  email: string,
  displayName: string,
): Promise<void> {
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `¡Bienvenido a LinkaMiNegocio, ${displayName}!`,
    html: `
      <h1>¡Bienvenido, ${displayName}!</h1>
      <p>Gracias por registrarte. Estamos felices de tenerte con nosotros.</p>
      <p>Comienza visitando tu <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard">panel</a>.</p>
    `,
  });

  if (error) {
    throw new Error(error.message);
  }
}
