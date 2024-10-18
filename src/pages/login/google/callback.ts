import type { APIContext } from "astro";
import { google } from "../../../auth/providers/google";
import { db } from "../../../db/db";
import { users } from "../../../db/schemas/users";
import { eq } from "drizzle-orm";
import { OAuth2RequestError } from "arctic";
import { lucia } from "../../../auth/auth";
import { ulid } from "ulid";

export async function GET(context: APIContext): Promise<Response> {
  // http://localhost:4321/login/google/callback?state=aaaaa&code=bbbbbb&scope=openid&authuser=1&prompt=consent

  const code = context.url.searchParams.get("code");
  const state = context.url.searchParams.get("state");

  const storedState = context.cookies.get("google_oauth_state")?.value ?? null;
  const codeVerifier =
    context.cookies.get("google_oauth_code_verifier")?.value ?? null;

  if (
    !code ||
    !state ||
    !codeVerifier ||
    !storedState ||
    state !== storedState
  ) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );

    const googleUser = await response.json();

    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.googleID, googleUser.sub));

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      context.cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      console.log("User already exists");
    } else {
      const userId = ulid();

      await db.insert(users).values({
        id: userId,
        username: googleUser.given_name,
        googleID: googleUser.sub,
        avatarURL: googleUser.picture,
        email: googleUser.email ?? "",
      });

      const session = await lucia.createSession(userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      context.cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      console.log("User does not exist");
    }

    return context.redirect("/");
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }

    console.error(e);
    return new Response(null, {
      status: 500,
    });
  }
}
