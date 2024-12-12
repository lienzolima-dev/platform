import { c as createComponent, b as createAstro } from '../chunks/astro/server_JOKs7Agn.mjs';
import 'clsx';
export { r as renderers } from '../chunks/_@astro-renderers_BpdHmnqV.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return Astro2.redirect("/home");
}, "/home/runner/work/platform/platform/src/pages/index.astro", void 0);

const $$file = "/home/runner/work/platform/platform/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
