import { c as createComponent, r as renderTemplate, m as maybeRenderHead, b as createAstro, d as renderComponent } from '../../chunks/astro/server_JOKs7Agn.mjs';
import { $ as $$SideBar, a as $$Header, b as $$AdminLayout } from '../../chunks/Header_D00v0fcO.mjs';
import 'clsx';
/* empty css                                       */
import { $ as $$TableRow, a as $$TableHead } from '../../chunks/TableRow_CvnT11xS.mjs';
import { $ as $$EditIcon, a as $$Pagination } from '../../chunks/Pagination_CEjwCCCl.mjs';
import { $ as $$TrashIcon } from '../../chunks/TrashIcon_BTahMnHo.mjs';
import { $ as $$Dialog } from '../../chunks/Dialog_B82jr3Av.mjs';
import { $ as $$AlertIcon, a as $$DeleteIcon } from '../../chunks/AlertIcon_V-ht1CZj.mjs';
import { a as getPaginatedServices } from '../../chunks/services_DIUawdlh.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_BpdHmnqV.mjs';

const $$Astro$4 = createAstro();
const $$ServicesHeader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ServicesHeader;
  const { servicesAmount } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="container" data-astro-cid-l2p2jliz> <div class="title" data-astro-cid-l2p2jliz> <h2 data-astro-cid-l2p2jliz>Servicios (${servicesAmount})</h2> <button id="add-service-btn" data-astro-cid-l2p2jliz>Añadir</button> </div> <div class="search-input" data-astro-cid-l2p2jliz> <input type="text" id="search-input" placeholder="Buscar por nombre de servicio" data-astro-cid-l2p2jliz> <button id="search-service-btn" data-astro-cid-l2p2jliz>Buscar</button> </div> </div>  `;
}, "/home/runner/work/platform/platform/src/components/admin/servicesExtras/services/ServicesHeader.astro", void 0);

const $$Astro$3 = createAstro();
const $$ServicesEditButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ServicesEditButton;
  const { service } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "service-edit-button", "service-edit-button", { "data-service": JSON.stringify(service), "data-astro-cid-5olsolqi": true }, { "default": () => renderTemplate` ${maybeRenderHead()}<button data-astro-cid-5olsolqi> ${renderComponent($$result, "EditIcon", $$EditIcon, { "color": "white", "data-astro-cid-5olsolqi": true })} <span data-astro-cid-5olsolqi>Editar</span> </button> ` })}  `;
}, "/home/runner/work/platform/platform/src/components/admin/servicesExtras/services/ServicesEditButton.astro", void 0);

const $$Astro$2 = createAstro();
const $$ServicesDeleteButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ServicesDeleteButton;
  const { service } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "service-delete-button", "service-delete-button", { "data-service": JSON.stringify(service), "data-astro-cid-boxme2oj": true }, { "default": () => renderTemplate` ${maybeRenderHead()}<button data-astro-cid-boxme2oj> ${renderComponent($$result, "TrashIcon", $$TrashIcon, { "color": "white", "data-astro-cid-boxme2oj": true })} <span data-astro-cid-boxme2oj>Eliminar</span> </button> ` })}  `;
}, "/home/runner/work/platform/platform/src/components/admin/servicesExtras/services/ServicesDeleteButton.astro", void 0);

const $$Astro$1 = createAstro();
const $$ServicesTable = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ServicesTable;
  const { services } = Astro2.props;
  const columns = [
    "Nombre",
    "Precio",
    "Descripci\xF3n",
    "Duraci\xF3n",
    "Categor\xEDa",
    "Acciones"
  ];
  const rowData = (service) => [
    service.name,
    service.price ? `s/.${service.price.toFixed(2)}` : null,
    service.description && service.description.length > 30 ? `${service.description.slice(0, 30)}...` : service.description || null,
    service.formattedDuration || null,
    service.category
  ];
  const noResults = services.length === 0;
  return renderTemplate`${maybeRenderHead()}<div class="table-container" data-astro-cid-kddg4bx4> <table data-astro-cid-kddg4bx4> ${renderComponent($$result, "TableHead", $$TableHead, { "columnsNames": columns, "data-astro-cid-kddg4bx4": true })} <tbody data-astro-cid-kddg4bx4> ${noResults ? renderTemplate`<tr data-astro-cid-kddg4bx4> <td colspan="6" style="text-align: center;" data-astro-cid-kddg4bx4>
No hay resultados
</td> </tr>` : services.map((service) => renderTemplate`${renderComponent($$result, "TableRow", $$TableRow, { "rowData": rowData(service), "data-astro-cid-kddg4bx4": true }, { "default": ($$result2) => renderTemplate` <div class="action-button" data-astro-cid-kddg4bx4> ${renderComponent($$result2, "ServicesEditButton", $$ServicesEditButton, { "service": service, "data-astro-cid-kddg4bx4": true })} ${renderComponent($$result2, "ServicesDeleteButton", $$ServicesDeleteButton, { "service": service, "data-astro-cid-kddg4bx4": true })} </div> ` })}`)} </tbody> </table> </div> `;
}, "/home/runner/work/platform/platform/src/components/admin/servicesExtras/services/ServicesTable.astro", void 0);

const $$ServicesAddForm = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "service-add-form", "service-add-form", { "data-astro-cid-c5ca7icx": true }, { "default": () => renderTemplate` ${maybeRenderHead()}<section data-astro-cid-c5ca7icx> <div class="form-container" data-astro-cid-c5ca7icx> <h2 data-astro-cid-c5ca7icx>Añadir Servicio</h2> <form id="add-service-form" data-astro-cid-c5ca7icx> <label data-astro-cid-c5ca7icx>
Nombre de servicio <span class="required" data-astro-cid-c5ca7icx>*</span> </label> <input type="text" class="name" name="name" placeholder="Ingresa nombre de servicio" required data-astro-cid-c5ca7icx> <label data-astro-cid-c5ca7icx>Precio <span class="required" data-astro-cid-c5ca7icx>*</span> </label> <input type="number" class="price" name="price" placeholder="Ingresa el precio" step="0.01" min="0" required data-astro-cid-c5ca7icx> <label data-astro-cid-c5ca7icx>Descripción</label> <textarea class="description" name="description" placeholder="Ingresa una descripción" data-astro-cid-c5ca7icx></textarea> <label data-astro-cid-c5ca7icx>Horas de duración <span class="required" data-astro-cid-c5ca7icx>*</span> </label> <input class="durationHours" name="durationHours" id="add-durationHours" placeholder="00:00" required data-astro-cid-c5ca7icx> <label data-astro-cid-c5ca7icx>
Categoría <span class="required" data-astro-cid-c5ca7icx>*</span> </label> <input type="text" class="category" name="category" placeholder="Ingresa categoría" required data-astro-cid-c5ca7icx> <p id="error-content" data-astro-cid-c5ca7icx></p> <button class="submit-button" type="submit" data-astro-cid-c5ca7icx>Guardar</button> </form> </div> </section> ` })}  `;
}, "/home/runner/work/platform/platform/src/components/admin/servicesExtras/services/ServicesAddForm.astro", void 0);

const $$ServicesEditForm = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section data-astro-cid-74ltcrvq> <div class="form-container" data-astro-cid-74ltcrvq> <h2 data-astro-cid-74ltcrvq>Editar Servicio</h2> <form id="edit-service-form" data-astro-cid-74ltcrvq> <input type="hidden" id="service-id" name="serviceId" data-astro-cid-74ltcrvq> <label data-astro-cid-74ltcrvq>
Nombre de servicio <span class="required" data-astro-cid-74ltcrvq>*</span> </label> <input type="text" class="nameService" name="nameService" placeholder="Ingresa nombre de servicio" required data-astro-cid-74ltcrvq> <label data-astro-cid-74ltcrvq>Precio <span class="required" data-astro-cid-74ltcrvq>*</span> </label> <input type="number" class="price" name="price" placeholder="Ingresa el precio" step="0.01" min="0" required data-astro-cid-74ltcrvq> <label data-astro-cid-74ltcrvq>Descripción</label> <textarea class="description" name="description" placeholder="Ingresa una descripción" data-astro-cid-74ltcrvq></textarea> <label data-astro-cid-74ltcrvq>Horas de duración <span class="required" data-astro-cid-74ltcrvq>*</span> </label> <input class="durationHours" name="durationHours" id="edit-durationHours" placeholder="00:00" required data-astro-cid-74ltcrvq> <label data-astro-cid-74ltcrvq>
Categoría <span class="required" data-astro-cid-74ltcrvq>*</span> </label> <input type="text" class="category" name="category" placeholder="Ingresa categoría" required data-astro-cid-74ltcrvq> <p id="s-error-content" data-astro-cid-74ltcrvq></p> <button id="s-edit-submit-btn" class="submit-button" type="submit" data-astro-cid-74ltcrvq>Guardar</button> </form> </div> </section>  `;
}, "/home/runner/work/platform/platform/src/components/admin/servicesExtras/services/ServicesEditForm.astro", void 0);

const $$ServicesDeleteForm = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="container" data-astro-cid-pvnbiycz> ${renderComponent($$result, "AlertIcon", $$AlertIcon, { "data-astro-cid-pvnbiycz": true })} <h3 data-astro-cid-pvnbiycz>
¿Está seguro de que quiere eliminar
<span id="selected-service" data-astro-cid-pvnbiycz>Service</span>
?
</h3> <p data-astro-cid-pvnbiycz>Al eliminar un servicio, no podrá recuperar su información.</p> <div class="buttons" data-astro-cid-pvnbiycz> <form id="delete-service-form" data-astro-cid-pvnbiycz> <input type="hidden" name="serviceId" data-astro-cid-pvnbiycz> <button id="s-delete-submit-btn" type="submit" data-astro-cid-pvnbiycz> ${renderComponent($$result, "DeleteIcon", $$DeleteIcon, { "color": "#fff", "data-astro-cid-pvnbiycz": true })} <span data-astro-cid-pvnbiycz>Sí, eliminar servicio</span> </button> </form> <button class="cancel" data-astro-cid-pvnbiycz>Cancelar</button> </div> <p id="s-delete-error-content" data-astro-cid-pvnbiycz></p> </section>  `;
}, "/home/runner/work/platform/platform/src/components/admin/servicesExtras/services/ServicesDeleteForm.astro", void 0);

const $$Astro = createAstro();
const $$Services = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Services;
  const user = Astro2.locals.user;
  if (!user || user.role !== "admin" && user.role !== "manicurist")
    return Astro2.redirect("/home", 302);
  const { avatarURL, username, role } = user;
  const { searchParams } = new URL(Astro2.request.url);
  const searchParam = (searchParams.get("search") || "").toLowerCase();
  const pageParam = Number.parseInt(searchParams.get("page") || "1");
  const pageSize = 6;
  const {
    services,
    count: totalServices,
    totalPages
  } = await getPaginatedServices({
    page: pageParam,
    pageSize,
    name: searchParam
  });
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Admin", "data-astro-cid-vvh6hhgl": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SideBar", $$SideBar, { "data-astro-cid-vvh6hhgl": true })} ${maybeRenderHead()}<div data-astro-cid-vvh6hhgl> ${renderComponent($$result2, "Header", $$Header, { "avatarURL": avatarURL, "username": username, "role": role, "data-astro-cid-vvh6hhgl": true })} ${renderComponent($$result2, "Dialog", $$Dialog, { "id": "addService", "data-astro-cid-vvh6hhgl": true }, { "default": ($$result3) => renderTemplate`${renderComponent($$result3, "ServicesAddForm", $$ServicesAddForm, { "data-astro-cid-vvh6hhgl": true })}` })} ${renderComponent($$result2, "Dialog", $$Dialog, { "id": "editService", "data-astro-cid-vvh6hhgl": true }, { "default": ($$result3) => renderTemplate`${renderComponent($$result3, "ServicesEditForm", $$ServicesEditForm, { "data-astro-cid-vvh6hhgl": true })}` })} ${renderComponent($$result2, "Dialog", $$Dialog, { "id": "deleteService", "data-astro-cid-vvh6hhgl": true }, { "default": ($$result3) => renderTemplate`${renderComponent($$result3, "ServicesDeleteForm", $$ServicesDeleteForm, { "data-astro-cid-vvh6hhgl": true })}` })} <main class="wrapper" data-astro-cid-vvh6hhgl> ${renderComponent($$result2, "ServicesHeader", $$ServicesHeader, { "servicesAmount": totalServices, "data-astro-cid-vvh6hhgl": true })} ${renderComponent($$result2, "ServicesTable", $$ServicesTable, { "services": services, "data-astro-cid-vvh6hhgl": true })} ${renderComponent($$result2, "Pagination", $$Pagination, { "currentPage": pageParam, "totalPages": totalPages, "data-astro-cid-vvh6hhgl": true })} </main> </div> ` })} `;
}, "/home/runner/work/platform/platform/src/pages/admin/services.astro", void 0);

const $$file = "/home/runner/work/platform/platform/src/pages/admin/services.astro";
const $$url = "/admin/services";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Services,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
