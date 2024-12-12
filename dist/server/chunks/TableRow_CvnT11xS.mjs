import { c as createComponent, r as renderTemplate, m as maybeRenderHead, b as createAstro, a as addAttribute, e as renderSlot } from './astro/server_JOKs7Agn.mjs';
import 'clsx';
/* empty css                              */

const $$Astro$1 = createAstro();
const $$TableHead = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$TableHead;
  const { columnsNames } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<thead data-astro-cid-2lidqn4a> <tr data-astro-cid-2lidqn4a> ${columnsNames.map((column) => renderTemplate`<th data-astro-cid-2lidqn4a>${column}</th>`)} </tr> </thead> `;
}, "/home/runner/work/platform/platform/src/components/global/table/TableHead.astro", void 0);

const $$Astro = createAstro();
const $$TableRow = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$TableRow;
  const { rowData } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<tr data-astro-cid-g44ohrsf> ${rowData.map((row) => {
    if (row === null) {
      return renderTemplate`<td data-astro-cid-g44ohrsf>---</td>`;
    }
    if (typeof row === "object") {
      return renderTemplate`<td data-astro-cid-g44ohrsf> <span class="label"${addAttribute(`--bg-color: ${row.color}`, "style")} data-astro-cid-g44ohrsf> ${row.label} </span> </td>`;
    }
    return renderTemplate`<td data-astro-cid-g44ohrsf>${row || "---"}</td>`;
  })} <td data-astro-cid-g44ohrsf>${renderSlot($$result, $$slots["default"])}</td> </tr> `;
}, "/home/runner/work/platform/platform/src/components/global/table/TableRow.astro", void 0);

export { $$TableRow as $, $$TableHead as a };
