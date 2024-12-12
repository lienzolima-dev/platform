import { c as createComponent, r as renderTemplate, d as renderComponent, b as createAstro, m as maybeRenderHead, a as addAttribute } from '../chunks/astro/server_JOKs7Agn.mjs';
import { $ as $$Navbar, a as $$Footer, b as $$BaseLayout } from '../chunks/Footer_CUvcjclc.mjs';
import { $ as $$GoogleButton } from '../chunks/GoogleButton_BGzJOID5.mjs';
import { a as actions } from '../chunks/_astro_actions_CVBKVWzJ.mjs';
/* empty css                                 */
import { i as isInputError } from '../chunks/shared_BgmuPqmk.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_BpdHmnqV.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const result = Astro2.getActionResult(actions.auth.login);
  let errorMessage = "";
  if (result && !result.error) {
    return Astro2.redirect("/verify-your-email/");
  }
  if (result?.error && !isInputError(result?.error)) {
    errorMessage = result.error.message;
  }
  if (isInputError(result?.error)) {
    for (const issue of result.error.issues) {
      errorMessage += `${issue.message} `;
    }
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Iniciar sesi\xF3n - Lienzo Lima", "data-astro-cid-x2pxh5t7": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, { "data-astro-cid-x2pxh5t7": true })} ${maybeRenderHead()}<main class="wrapper login-page" data-astro-cid-x2pxh5t7> <section class="login-section" data-astro-cid-x2pxh5t7> <h1 data-astro-cid-x2pxh5t7>Inicia sesión</h1> <form${addAttribute(actions.auth.login, "action")} method="post" data-astro-cid-x2pxh5t7> <div class="input-group" data-astro-cid-x2pxh5t7> <input id="email" type="email" name="email" required data-astro-cid-x2pxh5t7> <label for="email" data-astro-cid-x2pxh5t7>Email</label> </div> <div class="input-group" data-astro-cid-x2pxh5t7> <input id="password" type="password" name="password" required data-astro-cid-x2pxh5t7> <label for="password" data-astro-cid-x2pxh5t7>Contraseña</label> </div> <button type="submit" data-astro-cid-x2pxh5t7>Ingresar</button> </form> <span data-astro-cid-x2pxh5t7>
¿No tienes una cuenta? <a href="/signup" data-astro-cid-x2pxh5t7>Regístrate</a> </span> <p class="error" data-astro-cid-x2pxh5t7>${errorMessage}</p> <p data-astro-cid-x2pxh5t7>Accede a tu cuenta usando Google.</p> ${renderComponent($$result2, "GoogleButton", $$GoogleButton, { "data-astro-cid-x2pxh5t7": true })} </section> </main> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-x2pxh5t7": true })} ` })}  `;
}, "/home/runner/work/platform/platform/src/pages/login/index.astro", void 0);

const $$file = "/home/runner/work/platform/platform/src/pages/login/index.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
