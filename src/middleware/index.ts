import { lucia } from "../auth/auth";
import { verifyRequestOrigin } from "lucia";
import { defineMiddleware } from "astro:middleware";
import { eq } from "drizzle-orm";

import { db } from "../db/db";
import { users } from "../db/schema";
import { isPublicRoute } from "../auth/routes";

import type { APIContext } from "astro";
import type { Session } from "lucia";

async function getUser(id: string) {
  const [existingUser] = await db.select().from(users).where(eq(users.id, id));
  if (!existingUser) {
    return null;
  }

  return existingUser;
}

/**
 * Handle authenticated session
 */
async function handleAuthenticatedSession(
  context: APIContext,
  session: Session,
  auth: { id: string },
): Promise<Response | null> {
  if (context.locals?.session?.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  }
  context.locals.session = session;
  const user = await getUser(auth.id);
  context.locals.user = user;
  return null; // Proceed with the request
}

/**
 * Handle unauthenticated request
 */
function handleUnauthenticatedRequest(context: APIContext): void {
  const sessionCookie = lucia.createBlankSessionCookie();
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  context.locals.user = null;
  context.locals.session = null;
}

/**
 * Verify request origin for non-GET requests
 *
 * Used to ensure that state-changing
 * requests (POST, PUT, DELETE, etc.) come from trusted sources.
 */
function verifyNonGetRequest(context: APIContext): boolean {
  const originHeader = context.request.headers.get("Origin");
  const hostHeader = context.request.headers.get("Host");
  if (!originHeader || !hostHeader) {
    return false;
  }
  return verifyRequestOrigin(originHeader, [hostHeader]) === true;
}

export const onRequest = defineMiddleware(
  async (
    context: APIContext,
    next: () => Promise<Response>,
  ): Promise<Response> => {
    // Extract the path from the request URL
    const urlPath = new URL(context.request.url).pathname;

    // Attempt to retrieve the session ID from cookies
    const sessionID = context.cookies.get(lucia.sessionCookieName)?.value;

    if (sessionID) {
      // If a session ID exists, validate it
      const { session, user: auth } = await lucia.validateSession(sessionID);
      if (session) {
        // If the session is valid:

        // Redirect authenticated users away from login and root pages
        if (urlPath === "/login" || urlPath === "/") {
          return new Response(null, {
            status: 302,
            headers: { Location: "/home" },
          });
        }

        // Handle the authenticated session and check for admin access
        const authResponse = await handleAuthenticatedSession(
          context,
          session,
          auth,
        );
        if (authResponse) {
          return authResponse; // Return 404 if admin access is required but user is not admin
        }
        return next();
      }
      // If the session is invalid, clear it and redirect to the login page
      handleUnauthenticatedRequest(context);
      return new Response(null, {
        status: 302,
        headers: { Location: "/login" },
      });
    }

    // If no session ID exists, check if the requested route is public
    if (isPublicRoute(urlPath)) {
      // For public routes, proceed with the request
      return next();
    }

    // For non-GET requests to non-public routes, verify the request origin
    if (context.request.method !== "GET" && !verifyNonGetRequest(context)) {
      // If origin verification fails, return a 403 Forbidden response
      return new Response(null, { status: 403 });
    }

    // For unauthenticated requests to non-public routes:
    // Clear any existing session data and redirect to the login page
    handleUnauthenticatedRequest(context);
    return new Response(null, { status: 302, headers: { Location: "/login" } });
  },
);
