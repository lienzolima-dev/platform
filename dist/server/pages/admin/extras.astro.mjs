import { c as createComponent, r as renderTemplate, m as maybeRenderHead, b as createAstro, d as renderComponent } from '../../chunks/astro/server_JOKs7Agn.mjs';
import { $ as $$SideBar, a as $$Header, b as $$AdminLayout } from '../../chunks/Header_D00v0fcO.mjs';
import { $ as $$Dialog } from '../../chunks/Dialog_B82jr3Av.mjs';
import 'clsx';
/* empty css                                     */
import { $ as $$TableRow, a as $$TableHead } from '../../chunks/TableRow_CvnT11xS.mjs';
import { $ as $$EditIcon, a as $$Pagination } from '../../chunks/Pagination_CEjwCCCl.mjs';
import { $ as $$TrashIcon } from '../../chunks/TrashIcon_BTahMnHo.mjs';
import { $ as $$AlertIcon, a as $$DeleteIcon } from '../../chunks/AlertIcon_V-ht1CZj.mjs';
import { a as getPaginatedExtras } from '../../chunks/extras_BHEbstrf.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_BpdHmnqV.mjs';

const $$Astro$4 = createAstro();
const $$ExtrasHeader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ExtrasHeader;
  const { extrasAmount } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="container" data-astro-cid-hcpcsdxl> <div class="title" data-astro-cid-hcpcsdxl> <h2 data-astro-cid-hcpcsdxl>Adicionales (${extrasAmount})</h2> <button id="add-extra-btn" data-astro-cid-hcpcsdxl>Añadir</button> </div> <div class="search-input" data-astro-cid-hcpcsdxl> <input type="text" id="e-search-input" placeholder="Buscar por nombre de adicional" data-astro-cid-hcpcsdxl> <button id="search-extra-btn" data-astro-cid-hcpcsdxl>Buscar</button> </div> </div>  `;
}, "/home/runner/work/platform/platform/src/components/admin/servicesExtras/extras/ExtrasHeader.astro", void 0);

const $$Astro$3 = createAstro();
const $$ExtrasEditButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ExtrasEditButton;
  const { extra } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "extra-edit-button", "extra-edit-button", { "data-extra": JSON.stringify(extra), "data-astro-cid-3ik6qkzb": true }, { "default": () => renderTemplate` ${maybeRenderHead()}<button data-astro-cid-3ik6qkzb> ${renderComponent($$result, "EditIcon", $$EditIcon, { "color": "white", "data-astro-cid-3ik6qkzb": true })} <span data-astro-cid-3ik6qkzb>Editar</span> </button> ` })}  `;
}, "/home/runner/work/platform/platform/src/components/admin/servicesExtras/extras/ExtrasEditButton.astro", void 0);

const $$Astro$2 = createAstro();
const $$ExtrasDeleteButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ExtrasDeleteButton;
  const { extra } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "extra-delete-button", "extra-delete-button", { "data-extra": JSON.stringify(extra), "data-astro-cid-foco6xz7": true }, { "default": () => renderTemplate` ${maybeRenderHead()}<button data-astro-cid-foco6xz7> ${renderComponent($$result, "TrashIcon", $$TrashIcon, { "color": "white", "data-astro-cid-foco6xz7": true })} <span data-astro-cid-foco6xz7>Eliminar</span> </button> ` })}  `;
}, "/home/runner/work/platform/platform/src/components/admin/servicesExtras/extras/ExtrasDeleteButton.astro", void 0);

const $$Astro$1 = createAstro();
const $$ExtrasTable = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ExtrasTable;
  const { extras } = Astro2.props;
  const columns = ["Nombre", "Precio", "Descripci\xF3n", "Acciones"];
  const rowData = (extra) => [
    extra.name,
    extra.price ? `s/.${extra.price.toFixed(2)}` : null,
    extra.description && extra.description.length > 30 ? `${extra.description.slice(0, 30)}...` : extra.description || null
  ];
  const noResults = extras.length === 0;
  return renderTemplate`${maybeRenderHead()}<div class="table-container" data-astro-cid-45jy7356> <table data-astro-cid-45jy7356> ${renderComponent($$result, "TableHead", $$TableHead, { "columnsNames": columns, "data-astro-cid-45jy7356": true })} <tbody data-astro-cid-45jy7356> ${noResults ? renderTemplate`<tr data-astro-cid-45jy7356> <td colspan="4" style="text-align: center;" data-astro-cid-45jy7356>
No hay resultados
</td> </tr>` : extras.map((extra) => renderTemplate`${renderComponent($$result, "TableRow", $$TableRow, { "rowData": rowData(extra), "data-astro-cid-45jy7356": true }, { "default": ($$result2) => renderTemplate` <div class="action-button" data-astro-cid-45jy7356> ${renderComponent($$result2, "ExtrasEditButton", $$ExtrasEditButton, { "extra": extra, "data-astro-cid-45jy7356": true })} ${renderComponent($$result2, "ExtrasDeleteButton", $$ExtrasDeleteButton, { "extra": extra, "data-astro-cid-45jy7356": true })} </div> ` })}`)} </tbody> </table> </div> `;
}, "/home/runner/work/platform/platform/src/components/admin/servicesExtras/extras/ExtrasTable.astro", void 0);

const $$ExtrasAddForm = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "extra-add-form", "extra-add-form", { "data-astro-cid-4g4ddnqj": true }, { "default": () => renderTemplate` ${maybeRenderHead()}<section data-astro-cid-4g4ddnqj> <div class="form-container" data-astro-cid-4g4ddnqj> <h2 data-astro-cid-4g4ddnqj>Añadir Adicional</h2> <form id="add-extra-form" data-astro-cid-4g4ddnqj> <label data-astro-cid-4g4ddnqj>
Nombre de adicional <span class="required" data-astro-cid-4g4ddnqj>*</span> </label> <input type="text" class="name" name="name" placeholder="Ingrese nombre de adicional" required data-astro-cid-4g4ddnqj> <label data-astro-cid-4g4ddnqj>Precio <span class="required" data-astro-cid-4g4ddnqj>*</span> </label> <input type="number" class="price" name="price" placeholder="Ingrese el precio" step="0.01" min="0" required data-astro-cid-4g4ddnqj> <label data-astro-cid-4g4ddnqj>Descripción</label> <textarea class="description" name="description" placeholder="Ingrese una descripción" data-astro-cid-4g4ddnqj></textarea> <p id="e-error-content" data-astro-cid-4g4ddnqj></p> <button class="submit-button" type="submit" data-astro-cid-4g4ddnqj>Guardar</button> </form> </div> </section> ` })}  `;
}, "/home/runner/work/platform/platform/src/components/admin/servicesExtras/extras/ExtrasAddForm.astro", void 0);

const $$ExtrasEditForm = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section data-astro-cid-btatcic6> <div class="form-container" data-astro-cid-btatcic6> <h2 data-astro-cid-btatcic6>Editar Adicional</h2> <form id="edit-extra-form" data-astro-cid-btatcic6> <input type="hidden" id="extra-id" name="extraId" data-astro-cid-btatcic6> <label data-astro-cid-btatcic6>
Nombre de adicional <span class="required" data-astro-cid-btatcic6>*</span> </label> <input type="text" class="nameExtra" name="nameExtra" placeholder="Ingrese nombre de adicional" required data-astro-cid-btatcic6> <label data-astro-cid-btatcic6>Precio <span class="required" data-astro-cid-btatcic6>*</span> </label> <input type="number" class="price" name="price" placeholder="Ingrese el precio" step="0.01" min="0" required data-astro-cid-btatcic6> <label data-astro-cid-btatcic6>Descripción</label> <textarea class="description" name="description" placeholder="Ingrese una descripción" data-astro-cid-btatcic6></textarea> <p id="errorContent" data-astro-cid-btatcic6></p> <button id="e-edit-submit-btn" class="submit-button" type="submit" data-astro-cid-btatcic6>Guardar</button> </form> </div> </section>  `;
}, "/home/runner/work/platform/platform/src/components/admin/servicesExtras/extras/ExtrasEditForm.astro", void 0);

const $$ExtrasDeleteForm = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="container" data-astro-cid-d4txlnoo> ${renderComponent($$result, "AlertIcon", $$AlertIcon, { "data-astro-cid-d4txlnoo": true })} <h3 data-astro-cid-d4txlnoo>
¿Está seguro de que quiere eliminar <span id="selected-extra" data-astro-cid-d4txlnoo>Extra</span>?
</h3> <p data-astro-cid-d4txlnoo>Al eliminar un adicional, no podrá recuperar su información.</p> <div class="buttons" data-astro-cid-d4txlnoo> <form id="delete-extra-form" data-astro-cid-d4txlnoo> <input type="hidden" name="extraId" data-astro-cid-d4txlnoo> <button id="e-delete-submit-btn" type="submit" data-astro-cid-d4txlnoo> ${renderComponent($$result, "DeleteIcon", $$DeleteIcon, { "color": "#fff", "data-astro-cid-d4txlnoo": true })} <span data-astro-cid-d4txlnoo>Sí, eliminar adicional</span> </button> </form> <button class="e-cancel" data-astro-cid-d4txlnoo>Cancelar</button> </div> <p id="e-delete-error-content" data-astro-cid-d4txlnoo></p> </section>  `;
}, "/home/runner/work/platform/platform/src/components/admin/servicesExtras/extras/ExtrasDeleteForm.astro", void 0);

const $$Astro = createAstro();
const $$Extras = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Extras;
  const user = Astro2.locals.user;
  if (!user || user.role !== "admin" && user.role !== "manicurist")
    return Astro2.redirect("/home", 302);
  const { avatarURL, username, role } = user;
  const { searchParams } = new URL(Astro2.request.url);
  const searchParam = (searchParams.get("search") || "").toLowerCase();
  const pageParam = Number.parseInt(searchParams.get("page") || "1");
  const pageSize = 6;
  const {
    extras,
    count: totalExtras,
    totalPages
  } = await getPaginatedExtras({
    page: pageParam,
    pageSize,
    name: searchParam
  });
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Admin", "data-astro-cid-eeb4ihdw": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SideBar", $$SideBar, { "data-astro-cid-eeb4ihdw": true })} ${maybeRenderHead()}<div data-astro-cid-eeb4ihdw> ${renderComponent($$result2, "Header", $$Header, { "avatarURL": avatarURL, "username": username, "role": role, "data-astro-cid-eeb4ihdw": true })} ${renderComponent($$result2, "Dialog", $$Dialog, { "id": "addExtra", "data-astro-cid-eeb4ihdw": true }, { "default": ($$result3) => renderTemplate`${renderComponent($$result3, "ExtrasAddForm", $$ExtrasAddForm, { "data-astro-cid-eeb4ihdw": true })}` })} ${renderComponent($$result2, "Dialog", $$Dialog, { "id": "editExtra", "data-astro-cid-eeb4ihdw": true }, { "default": ($$result3) => renderTemplate`${renderComponent($$result3, "ExtrasEditForm", $$ExtrasEditForm, { "data-astro-cid-eeb4ihdw": true })}` })} ${renderComponent($$result2, "Dialog", $$Dialog, { "id": "deleteExtra", "data-astro-cid-eeb4ihdw": true }, { "default": ($$result3) => renderTemplate`${renderComponent($$result3, "ExtrasDeleteForm", $$ExtrasDeleteForm, { "data-astro-cid-eeb4ihdw": true })}` })} <main class="wrapper" data-astro-cid-eeb4ihdw> ${renderComponent($$result2, "ExtrasHeader", $$ExtrasHeader, { "extrasAmount": totalExtras, "data-astro-cid-eeb4ihdw": true })} ${renderComponent($$result2, "ExtrasTable", $$ExtrasTable, { "extras": extras, "data-astro-cid-eeb4ihdw": true })} ${renderComponent($$result2, "Pagination", $$Pagination, { "currentPage": pageParam, "totalPages": totalPages, "data-astro-cid-eeb4ihdw": true })} </main> </div> ` })} `;
}, "/home/runner/work/platform/platform/src/pages/admin/extras.astro", void 0);

const $$file = "/home/runner/work/platform/platform/src/pages/admin/extras.astro";
const $$url = "/admin/extras";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Extras,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
