import type { APIContext } from "astro";
import { lucia } from "../../auth/auth";

export async function GET(context: APIContext): Promise<Response> {
  if (context.locals.session) {
    await lucia.invalidateSession(context.locals.session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  }

  return context.redirect("/login");
}
