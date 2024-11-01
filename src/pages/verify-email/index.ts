import type { APIContext } from "astro";
import { db } from "../../db/db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import { resend } from "../../resend/client";

export async function GET(context: APIContext): Promise<Response> {
  // ${baseUrl}/verify-email?code=${verificationCode}
  const code = context.url.searchParams.get("code");

  // If no code is provided, redirect to home
  if (!code) return context.redirect("/home", 302);

  // Check if verification code is valid
  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.verificationCode, code));

  // If no user is found, redirect to home
  if (!existingUser) return context.redirect("/home", 302);

  try {
    await db
      .update(users)
      .set({ emailVerified: true, verificationCode: null })
      .where(eq(users.verificationCode, code));

    await resend.emails.send({
      from: "noreply@lienzolima.com",
      to: [existingUser.email || ""],
      subject: "Lienzo Lima - Email verificado",
      html: `<p>${existingUser.username}, tu email ha sido verificado</p>`,
    });
  } catch (e) {
    console.error("[ERROR]: Error verifying email, ", e);
    console.error("User:", existingUser);
    console.error("Code:", code);

    return context.redirect("/home", 302);
  }

  return context.redirect("/home", 302);
}
