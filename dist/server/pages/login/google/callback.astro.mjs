import { g as google } from '../../../chunks/google_BNcsARaT.mjs';
import { d as db, u as users } from '../../../chunks/db_DooF3xjr.mjs';
import { or, eq } from 'drizzle-orm';
import { OAuth2RequestError } from 'arctic';
import { l as lucia } from '../../../chunks/auth_ByadPpnO.mjs';
import { ulid } from 'ulid';
export { r as renderers } from '../../../chunks/_@astro-renderers_BpdHmnqV.mjs';

async function GET(context) {
  const code = context.url.searchParams.get("code");
  const state = context.url.searchParams.get("state");
  const storedState = context.cookies.get("google_oauth_state")?.value ?? null;
  const codeVerifier = context.cookies.get("google_oauth_code_verifier")?.value ?? null;
  if (!code || !state || !codeVerifier || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400
    });
  }
  try {
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`
        }
      }
    );
    const googleUser = await response.json();
    const [existingUser] = await db.select().from(users).where(
      or(
        eq(users.googleID, googleUser.sub),
        eq(users.email, googleUser.email)
      )
    );
    if (existingUser) {
      if (existingUser.avatarURL !== googleUser.picture) {
        await db.update(users).set({
          avatarURL: googleUser.picture
        }).where(eq(users.id, existingUser.id));
      }
      if (existingUser.googleID !== googleUser.sub) {
        const dataToUpdate = {
          googleID: googleUser.sub
        };
        if (existingUser.status === "deleted") {
          dataToUpdate.status = "active";
        }
        await db.update(users).set(dataToUpdate).where(eq(users.id, existingUser.id));
      }
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      context.cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      console.log(
        `[LOG]: User with google_sub ${googleUser.sub} already exists`
      );
    } else {
      const userId = ulid();
      await db.insert(users).values({
        id: userId,
        username: googleUser.given_name,
        googleID: googleUser.sub,
        avatarURL: googleUser.picture,
        email: googleUser.email ?? ""
      });
      const session = await lucia.createSession(userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      context.cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      console.log(`[LOG]: User with google_sub ${googleUser.sub} created`);
    }
    return context.redirect("/");
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400
      });
    }
    console.error(e);
    return new Response(null, {
      status: 500
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
