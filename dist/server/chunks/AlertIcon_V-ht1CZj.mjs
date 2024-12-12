import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as addAttribute, b as createAstro } from './astro/server_JOKs7Agn.mjs';
import 'clsx';
/* empty css                                 */

const $$Astro = createAstro();
const $$DeleteIcon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$DeleteIcon;
  const { color = "#000" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"> <path d="M10.667 6v6.667H5.333V6h5.334Zm-1-4H6.333l-.666.667H3.333V4h9.334V2.667h-2.334L9.667 2ZM12 4.667H4v8C4 13.4 4.6 14 5.333 14h5.334C11.4 14 12 13.4 12 12.667v-8Z"${addAttribute(color, "fill")}></path> </svg>`;
}, "/home/runner/work/platform/platform/src/components/svgs/admin/IndexContent/DeleteIcon.astro", void 0);

const $$AlertIcon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-astro-cid-myosvxix> <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" data-astro-cid-myosvxix></path> </svg> `;
}, "/home/runner/work/platform/platform/src/components/svgs/admin/IndexContent/AlertIcon.astro", void 0);

export { $$AlertIcon as $, $$DeleteIcon as a };
