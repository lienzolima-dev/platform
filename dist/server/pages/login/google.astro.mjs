import { generateState, generateCodeVerifier } from 'arctic';
import { g as google } from '../../chunks/google_BNcsARaT.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_BpdHmnqV.mjs';

async function GET(context) {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ["openid", "profile", "email"]
  });
  context.cookies.set("google_oauth_state", state, {
    path: "/",
    secure: "true",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax"
  });
  context.cookies.set("google_oauth_code_verifier", codeVerifier, {
    path: "/",
    secure: "true",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax"
  });
  return context.redirect(url.toString());
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
