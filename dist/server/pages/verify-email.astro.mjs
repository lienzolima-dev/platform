import { d as db, u as users } from '../chunks/db_DooF3xjr.mjs';
import '../chunks/complaints_DeMGL233.mjs';
import { eq } from 'drizzle-orm';
import { r as resend } from '../chunks/client_DByUswZd.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_BpdHmnqV.mjs';

async function GET(context) {
  const code = context.url.searchParams.get("code");
  if (!code) return context.redirect("/home", 302);
  const [existingUser] = await db.select().from(users).where(eq(users.verificationCode, code));
  if (!existingUser) return context.redirect("/home", 302);
  try {
    await db.update(users).set({ emailVerified: true, verificationCode: null }).where(eq(users.verificationCode, code));
    await resend.emails.send({
      from: "noreply@lienzolima.com",
      to: [existingUser.email || ""],
      subject: "Lienzo Lima - Email verificado",
      html: `<p>${existingUser.username}, tu email ha sido verificado</p>`
    });
  } catch (e) {
    console.error("[ERROR]: Error verifying email, ", e);
    console.error("User:", existingUser);
    console.error("Code:", code);
    return context.redirect("/home", 302);
  }
  return context.redirect("/home", 302);
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
