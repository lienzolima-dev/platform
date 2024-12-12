import { c as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML, b as createAstro, d as renderComponent } from '../chunks/astro/server_JOKs7Agn.mjs';
import { $ as $$Navbar, a as $$Footer, b as $$BaseLayout } from '../chunks/Footer_CUvcjclc.mjs';
import 'clsx';
/* empty css                                                  */
import { marked } from 'marked';
export { r as renderers } from '../chunks/_@astro-renderers_BpdHmnqV.mjs';

const $$Astro = createAstro();
const $$PrivacyPolicy = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PrivacyPolicy;
  const content = await Astro2.glob(/* #__PURE__ */ Object.assign({"./content.md": () => import('../chunks/content_CsF6Zl0t.mjs')}), () => "./content.md");
  const htmlContent = marked.parse(content[0].rawContent());
  return renderTemplate`${maybeRenderHead()}<article class="markdown">${unescapeHTML(htmlContent)}</article>`;
}, "/home/runner/work/platform/platform/src/components/landing/privacyPolicy/PrivacyPolicy.astro", void 0);

const $$PoliticaDePrivacidad = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Lienzo Lima" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="wrapper"> ${renderComponent($$result2, "PrivacyPolicy", $$PrivacyPolicy, {})} </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/home/runner/work/platform/platform/src/pages/politica-de-privacidad.astro", void 0);

const $$file = "/home/runner/work/platform/platform/src/pages/politica-de-privacidad.astro";
const $$url = "/politica-de-privacidad";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$PoliticaDePrivacidad,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
