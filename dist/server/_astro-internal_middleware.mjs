import { l as lucia } from './chunks/auth_ByadPpnO.mjs';
import { verifyRequestOrigin } from 'lucia';
import { d as defineMiddleware, s as sequence } from './chunks/index_sP9Mx7ln.mjs';
import { eq } from 'drizzle-orm';
import { d as db, u as users } from './chunks/db_DooF3xjr.mjs';
import './chunks/complaints_DeMGL233.mjs';
import './chunks/astro-designed-error-pages_CiH3qK2X.mjs';
import { A as ACTION_QUERY_PARAMS, s as serializeActionResult } from './chunks/shared_BgmuPqmk.mjs';
import { y as yellow } from './chunks/astro/server_JOKs7Agn.mjs';
import { h as hasContentType, f as formContentTypes } from './chunks/utils_DjK6_1cM.mjs';
import { getAction } from './chunks/get-action_DgVHAtWi.mjs';

const publicRoutePatterns = [
  /^\/$/,
  // Matches "/"
  /^\/sample$/,
  // Matches "/"
  /^\/politica-de-privacidad$/,
  // Matches "/politica-de-privacidad"
  /^\/login(\/.*)?$/,
  // Matches "/login" and any subroutes under it
  /^\/signup(\/.*)?$/,
  // Matches "/signup" and any subroutes under it
  /^\/verify-email(\/.*)?$/,
  // Matches "/verify-email" and any subroutes under it
  /^\/verify-your-email(\/.*)?$/,
  // Matches "/verify-your-email" and any subroutes under it
  /^\/home(\/.*)?$/,
  // Matches "/home" and any subroutes under it
  /^\/imgs(\/.*)?$/,
  // Matches "/imgs" and any subroutes under it
  /^\/_image(\/.*)?$/,
  // Matches "/_image" and any subroutes under it
  /^\/libro-de-reclamos$/,
  // Matches "/libro-de-reclamos"
  /^\/_actions\/db.complaints.addComplaint$/
  // Matches "/_actions/db.complaints.addComplaint"
];
function isPublicRoute(path) {
  return publicRoutePatterns.some((pattern) => pattern.test(path));
}

async function getUser(id) {
  const [existingUser] = await db.select().from(users).where(eq(users.id, id));
  if (!existingUser) {
    return null;
  }
  return existingUser;
}
async function handleAuthenticatedSession(context, session, auth) {
  if (context.locals?.session?.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  }
  context.locals.session = session;
  const user = await getUser(auth.id);
  context.locals.user = user;
  return null;
}
function handleUnauthenticatedRequest(context) {
  const sessionCookie = lucia.createBlankSessionCookie();
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  context.locals.user = null;
  context.locals.session = null;
}
function verifyNonGetRequest(context) {
  const originHeader = context.request.headers.get("Origin");
  const hostHeader = context.request.headers.get("Host");
  if (!originHeader || !hostHeader) {
    return false;
  }
  return verifyRequestOrigin(originHeader, [hostHeader]) === true;
}
const onRequest$2 = defineMiddleware(
  async (context, next) => {
    const urlPath = new URL(context.request.url).pathname;
    const sessionID = context.cookies.get(lucia.sessionCookieName)?.value;
    if (sessionID) {
      const { session, user: auth } = await lucia.validateSession(sessionID);
      if (session) {
        if (urlPath === "/login" || urlPath === "/") {
          return new Response(null, {
            status: 302,
            headers: { Location: "/home" }
          });
        }
        const authResponse = await handleAuthenticatedSession(
          context,
          session,
          auth
        );
        if (authResponse) {
          return authResponse;
        }
        return next();
      }
      handleUnauthenticatedRequest(context);
      return new Response(null, {
        status: 302,
        headers: { Location: "/login" }
      });
    }
    if (isPublicRoute(urlPath)) {
      return next();
    }
    if (context.request.method !== "GET" && !verifyNonGetRequest(context)) {
      return new Response(null, { status: 403 });
    }
    handleUnauthenticatedRequest(context);
    return new Response(null, { status: 302, headers: { Location: "/login" } });
  }
);

const onRequest$1 = defineMiddleware(async (context, next) => {
  if (context._isPrerendered) {
    if (context.request.method === "POST") {
      console.warn(
        yellow("[astro:actions]"),
        'POST requests should not be sent to prerendered pages. If you\'re using Actions, disable prerendering with `export const prerender = "false".'
      );
    }
    return next();
  }
  const locals = context.locals;
  if (locals._actionPayload) return next();
  const actionPayload = context.cookies.get(ACTION_QUERY_PARAMS.actionPayload)?.json();
  if (actionPayload) {
    if (!isActionPayload(actionPayload)) {
      throw new Error("Internal: Invalid action payload in cookie.");
    }
    return renderResult({ context, next, ...actionPayload });
  }
  const actionName = context.url.searchParams.get(ACTION_QUERY_PARAMS.actionName);
  if (context.request.method === "POST" && actionName) {
    return handlePost({ context, next, actionName });
  }
  return next();
});
async function renderResult({
  context,
  next,
  actionResult,
  actionName
}) {
  const locals = context.locals;
  locals._actionPayload = { actionResult, actionName };
  const response = await next();
  context.cookies.delete(ACTION_QUERY_PARAMS.actionPayload);
  if (actionResult.type === "error") {
    return new Response(response.body, {
      status: actionResult.status,
      statusText: actionResult.type,
      headers: response.headers
    });
  }
  return response;
}
async function handlePost({
  context,
  next,
  actionName
}) {
  const { request } = context;
  const baseAction = await getAction(actionName);
  const contentType = request.headers.get("content-type");
  let formData;
  if (contentType && hasContentType(contentType, formContentTypes)) {
    formData = await request.clone().formData();
  }
  const action = baseAction.bind(context);
  const actionResult = await action(formData);
  if (context.url.searchParams.get(ACTION_QUERY_PARAMS.actionRedirect) === "false") {
    return renderResult({
      context,
      next,
      actionName,
      actionResult: serializeActionResult(actionResult)
    });
  }
  return redirectWithResult({ context, actionName, actionResult });
}
async function redirectWithResult({
  context,
  actionName,
  actionResult
}) {
  context.cookies.set(ACTION_QUERY_PARAMS.actionPayload, {
    actionName,
    actionResult: serializeActionResult(actionResult)
  });
  if (actionResult.error) {
    const referer = context.request.headers.get("Referer");
    if (!referer) {
      throw new Error("Internal: Referer unexpectedly missing from Action POST request.");
    }
    return context.redirect(referer);
  }
  return context.redirect(context.url.pathname);
}
function isActionPayload(json) {
  if (typeof json !== "object" || json == null) return false;
  if (!("actionResult" in json) || typeof json.actionResult !== "object") return false;
  if (!("actionName" in json) || typeof json.actionName !== "string") return false;
  return true;
}

const onRequest = sequence(
	
	onRequest$2,
	onRequest$1
);

export { onRequest };
