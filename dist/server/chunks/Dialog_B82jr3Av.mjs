import { c as createComponent, r as renderTemplate, d as renderComponent, b as createAstro, m as maybeRenderHead, e as renderSlot } from './astro/server_JOKs7Agn.mjs';
/* empty css                               */

const $$Astro = createAstro();
const $$Dialog = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dialog;
  const { id, manualClose = false } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "component-dialog", "component-dialog", { "data-id": id, "data-manual-close": manualClose, "data-astro-cid-o7g3kyhu": true }, { "default": () => renderTemplate` ${maybeRenderHead()}<div class="import-dialog-container hide" data-astro-cid-o7g3kyhu> <div class="background-overlay" data-astro-cid-o7g3kyhu></div> <div class="modal-container" data-astro-cid-o7g3kyhu> <div class="modal" data-astro-cid-o7g3kyhu> <div class="import-dialog-close-button" data-astro-cid-o7g3kyhu> ${renderSlot($$result, $$slots["close-button"], renderTemplate` <button class="close" data-astro-cid-o7g3kyhu> <span class="bar" data-astro-cid-o7g3kyhu></span> <span class="bar" data-astro-cid-o7g3kyhu></span> </button> `)} </div> <div class="content" data-astro-cid-o7g3kyhu> ${renderSlot($$result, $$slots["default"], renderTemplate` <h2 data-astro-cid-o7g3kyhu>This is a dialog component</h2> `)} </div> </div> </div> </div> ` })}  `;
}, "/home/runner/work/platform/platform/src/components/global/dialog/Dialog.astro", void 0);

export { $$Dialog as $ };
