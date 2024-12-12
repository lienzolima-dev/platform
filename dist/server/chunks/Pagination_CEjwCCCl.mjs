import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as addAttribute, b as createAstro, d as renderComponent, F as Fragment } from './astro/server_JOKs7Agn.mjs';
import 'clsx';
/* empty css                            */

const $$Astro$2 = createAstro();
const $$EditIcon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$EditIcon;
  const { color = "black" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"${addAttribute(color, "fill")}> <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"></path> </svg>`;
}, "/home/runner/work/platform/platform/src/components/svgs/admin/IndexContent/EditIcon.astro", void 0);

function updateRoute(url, newFilter) {
  const params = new URLSearchParams(url.search);
  for (const key in newFilter) {
    if (newFilter[key] === "") {
      params.delete(key);
      continue;
    }
    params.set(key, newFilter[key]);
  }
  if (!("page" in newFilter)) {
    params.set("page", "1");
  }
  const newRoute = `${url.pathname}?${params.toString()}`;
  return newRoute;
}

const getPaginationButtons = ({
  totalPages,
  maxBtns,
  currentPage
}) => {
  let max = maxBtns;
  if (totalPages <= maxBtns) max = totalPages;
  const half = Math.floor(max / 2);
  let to = max;
  if (currentPage + half >= totalPages) {
    to = totalPages;
  } else if (currentPage > half) {
    to = currentPage + half;
  }
  const from = to - max;
  const arr = Array.from({ length: max }, (_, i) => from + i + 1);
  return arr;
};

const $$Astro$1 = createAstro();
const $$ThinArrow = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ThinArrow;
  const { direction, color } = Astro2.props;
  const arrowDirection = {
    left: "rotate(0deg)",
    right: "rotate(180deg)",
    up: "rotate(90deg)",
    down: "rotate(270deg)"
  }[direction];
  return renderTemplate`${maybeRenderHead()}<svg${addAttribute(`transform: ${arrowDirection};`, "style")} width="8" xmlns="http://www.w3.org/2000/svg" height="8" viewBox="4283.3 10087 8 8" fill="none"> <path d="M4291.3 10090.5h-6.085l2.795-2.795-.71-.705-4 4 4 4 .705-.705-2.79-2.795h6.085v-1Z"${addAttribute(`fill: ${color};`, "style")}></path> </svg>`;
}, "/home/runner/work/platform/platform/src/components/svgs/ThinArrow.astro", void 0);

const $$Astro = createAstro();
const $$Pagination = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pagination;
  const { currentPage, totalPages, buttonsAmount } = Astro2.props;
  const url = Astro2.url;
  const previousPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;
  const paginationButtons = getPaginationButtons({
    totalPages,
    maxBtns: buttonsAmount || 3,
    currentPage
  });
  const previousLink = currentPage <= 1 ? "javascript:void(0)" : updateRoute(url, { page: previousPage.toString() });
  const nextLink = currentPage >= totalPages ? "javascript:void(0)" : updateRoute(url, { page: nextPage.toString() });
  return renderTemplate`${paginationButtons.length > 0 && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-nonszfec": true }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<section data-astro-cid-nonszfec><a${addAttribute(["prev", [{ disabled: currentPage <= 1 }]], "class:list")}${addAttribute(previousLink, "href")} data-astro-cid-nonszfec>${renderComponent($$result2, "ThinArrowIcon", $$ThinArrow, { "direction": "left", "color": "black", "data-astro-cid-nonszfec": true })}<span data-astro-cid-nonszfec>Previous</span></a><div class="pag-buttons" data-astro-cid-nonszfec>${paginationButtons.map((buttonNumber) => renderTemplate`<a${addAttribute({
    btn: true,
    selected: buttonNumber === currentPage
  }, "class:list")}${addAttribute(updateRoute(url, { page: buttonNumber.toString() }), "href")} data-astro-cid-nonszfec>${buttonNumber}</a>`)}</div><a${addAttribute(["next", [{ disabled: currentPage >= totalPages }]], "class:list")}${addAttribute(nextLink, "href")} data-astro-cid-nonszfec><span data-astro-cid-nonszfec>Next</span>${renderComponent($$result2, "ThinArrowIcon", $$ThinArrow, { "direction": "right", "color": "black", "data-astro-cid-nonszfec": true })}</a></section>` })}`}`;
}, "/home/runner/work/platform/platform/src/components/global/Pagination.astro", void 0);

export { $$EditIcon as $, $$Pagination as a };
