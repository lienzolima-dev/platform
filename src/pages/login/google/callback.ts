import type { APIContext } from "astro";
import { google } from "../../../auth/providers/google";
import { db } from "../../../db/db";
import { users } from "../../../db/schemas/users";
import { eq, or } from "drizzle-orm";
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
    // Exchange the code for tokens
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );

    // Get the user info
    const googleUser = await response.json();

    // Check if the user with the google sub or email already exists
    const [existingUser] = await db
      .select()
      .from(users)
      .where(
        or(
          eq(users.googleID, googleUser.sub),
          eq(users.email, googleUser.email),
        ),
      );

    // If the user exists, update user info if necessary and create a session
    if (existingUser) {
      // Update avatarURL if necessary
      if (existingUser.avatarURL !== googleUser.picture) {
        await db
          .update(users)
          .set({
            avatarURL: googleUser.picture,
          })
          .where(eq(users.id, existingUser.id));
      }

      // Update googleID if necessary
      if (existingUser.googleID !== googleUser.sub) {
        await db
          .update(users)
          .set({
            googleID: googleUser.sub,
          })
          .where(eq(users.id, existingUser.id));
      }

      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      context.cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      console.log(
        `[LOG]: User with google_sub ${googleUser.sub} already exists`,
      );
    } else {
      // If the user does not exist, create a new user and create a session
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

      console.log(`[LOG]: User with google_sub ${googleUser.sub} created`);
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
