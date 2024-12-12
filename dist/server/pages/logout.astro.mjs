import { l as lucia } from '../chunks/auth_ByadPpnO.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_BpdHmnqV.mjs';

async function GET(context) {
  if (context.locals.session) {
    await lucia.invalidateSession(context.locals.session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  }
  return context.redirect("/login");
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
