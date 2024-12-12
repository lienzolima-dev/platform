import { c as createComponent, r as renderTemplate, d as renderComponent, b as createAstro, m as maybeRenderHead, a as addAttribute } from '../chunks/astro/server_JOKs7Agn.mjs';
import { $ as $$Navbar, a as $$Footer, b as $$BaseLayout } from '../chunks/Footer_CUvcjclc.mjs';
import { $ as $$GoogleButton } from '../chunks/GoogleButton_BGzJOID5.mjs';
import { a as actions } from '../chunks/_astro_actions_CVBKVWzJ.mjs';
/* empty css                                  */
import { i as isInputError } from '../chunks/shared_BgmuPqmk.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_BpdHmnqV.mjs';

const $$Astro = createAstro();
const $$Signup = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Signup;
  const result = Astro2.getActionResult(actions.auth.signup);
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
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Iniciar sesi\xF3n - Lienzo Lima", "data-astro-cid-sgjovbj7": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, { "data-astro-cid-sgjovbj7": true })} ${maybeRenderHead()}<main class="wrapper login-page" data-astro-cid-sgjovbj7> <section class="login-section" data-astro-cid-sgjovbj7> <h1 data-astro-cid-sgjovbj7>Regístrate</h1> <p class="info" data-astro-cid-sgjovbj7>Introduce tus datos para registrarte</p> <form${addAttribute(actions.auth.signup, "action")} method="post" data-astro-cid-sgjovbj7> <div class="input-group" data-astro-cid-sgjovbj7> <input id="username" type="text" name="username" required data-astro-cid-sgjovbj7> <label for="username" data-astro-cid-sgjovbj7>Nombre de usuario</label> </div> <div class="input-group" data-astro-cid-sgjovbj7> <input id="email" type="email" name="email" required data-astro-cid-sgjovbj7> <label for="email" data-astro-cid-sgjovbj7>Email</label> </div> <div class="input-group" data-astro-cid-sgjovbj7> <input id="password" type="password" name="password" required data-astro-cid-sgjovbj7> <label for="password" data-astro-cid-sgjovbj7>Contraseña</label> </div> <div class="input-group" data-astro-cid-sgjovbj7> <input id="passwordConfirm" type="password" name="passwordConfirm" required data-astro-cid-sgjovbj7> <label for="passwordConfirm" data-astro-cid-sgjovbj7>Confirmar contraseña</label> </div> <button type="submit" data-astro-cid-sgjovbj7>Registrarse</button> </form> <p class="error" data-astro-cid-sgjovbj7>${errorMessage}</p> <p data-astro-cid-sgjovbj7>O continúa usando Google</p> ${renderComponent($$result2, "GoogleButton", $$GoogleButton, { "data-astro-cid-sgjovbj7": true })} </section> </main> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-sgjovbj7": true })} ` })}  `;
}, "/home/runner/work/platform/platform/src/pages/signup.astro", void 0);

const $$file = "/home/runner/work/platform/platform/src/pages/signup.astro";
const $$url = "/signup";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Signup,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
