import { c as createComponent, r as renderTemplate, m as maybeRenderHead, b as createAstro, a as addAttribute, d as renderComponent } from '../../chunks/astro/server_JOKs7Agn.mjs';
import { $ as $$SideBar, a as $$Header, b as $$AdminLayout } from '../../chunks/Header_D00v0fcO.mjs';
import 'clsx';
/* empty css                                         */
import { $ as $$TableRow, a as $$TableHead } from '../../chunks/TableRow_CvnT11xS.mjs';
import { $ as $$Dialog } from '../../chunks/Dialog_B82jr3Av.mjs';
import { d as db } from '../../chunks/db_DooF3xjr.mjs';
import { c as complaints } from '../../chunks/complaints_DeMGL233.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_BpdHmnqV.mjs';

const $$Astro$4 = createAstro();
const $$ComplaintHeader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ComplaintHeader;
  const { complaintsAmount } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="container" data-astro-cid-ngjed5ky> <div class="title" data-astro-cid-ngjed5ky> <h2 data-astro-cid-ngjed5ky>Reclamos (${complaintsAmount})</h2> </div> </div> `;
}, "/home/runner/work/platform/platform/src/components/admin/complaints/ComplaintHeader.astro", void 0);

const $$Astro$3 = createAstro();
const $$ViewIcon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ViewIcon;
  const { color = "#000" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.7.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"${addAttribute(color, "fill")}></path></svg>`;
}, "/home/runner/work/platform/platform/src/components/svgs/admin/IndexContent/ViewIcon.astro", void 0);

const $$Astro$2 = createAstro();
const $$ComplaintViewButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ComplaintViewButton;
  const { complaint } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "complaint-view-button", "complaint-view-button", { "data-complaint": JSON.stringify(complaint), "data-astro-cid-mrasdnua": true }, { "default": () => renderTemplate` ${maybeRenderHead()}<button data-astro-cid-mrasdnua> ${renderComponent($$result, "ViewIcon", $$ViewIcon, { "color": "white", "data-astro-cid-mrasdnua": true })} <span data-astro-cid-mrasdnua>Ver detalles</span> </button> ` })}  `;
}, "/home/runner/work/platform/platform/src/components/admin/complaints/ComplaintViewButton.astro", void 0);

const $$Astro$1 = createAstro();
const $$ComplaintTable = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ComplaintTable;
  const { complaints } = Astro2.props;
  const columns = [
    "DNI",
    "Nombres y Apellidos",
    "Email",
    "Tel\xE9fono",
    "Fecha",
    "Acciones"
  ];
  const rowData = complaints.reduce(
    (acc, complaint) => {
      const { id, dni, fullName, email, phone, date } = complaint;
      acc[id] = [dni, fullName, email, phone, date];
      return acc;
    },
    {}
  );
  const noResults = complaints.length === 0;
  return renderTemplate`${maybeRenderHead()}<div class="table-container" data-astro-cid-7r4lfvim> <table data-astro-cid-7r4lfvim> ${renderComponent($$result, "TableHead", $$TableHead, { "columnsNames": columns, "data-astro-cid-7r4lfvim": true })} <tbody data-astro-cid-7r4lfvim> ${noResults ? renderTemplate`<tr data-astro-cid-7r4lfvim> <td colspan="6" style="text-align: center;" data-astro-cid-7r4lfvim>
No hay reclamos
</td> </tr>` : complaints.map((complaint) => renderTemplate`${renderComponent($$result, "TableRow", $$TableRow, { "rowData": rowData[complaint.id], "data-astro-cid-7r4lfvim": true }, { "default": ($$result2) => renderTemplate` <div class="action-button" data-astro-cid-7r4lfvim> ${renderComponent($$result2, "ComplaintViewButton", $$ComplaintViewButton, { "complaint": complaint, "data-astro-cid-7r4lfvim": true })} </div> ` })}`)} </tbody> </table> <!-- <Pagination currentPage={1} totalPages={2} /> --> </div> `;
}, "/home/runner/work/platform/platform/src/components/admin/complaints/ComplaintTable.astro", void 0);

const $$ComplaintViewDialog = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="container" data-astro-cid-m5yz2qqy> <div class="form-container" data-astro-cid-m5yz2qqy> <h2 data-astro-cid-m5yz2qqy>Detalles de reclamo</h2> <form id="view-complaint-form" data-astro-cid-m5yz2qqy> <input type="hidden" id="complaint-id" name="complaintId" data-astro-cid-m5yz2qqy> <label for="service" data-astro-cid-m5yz2qqy> Servicio: </label> <input type="text" id="service" name="service" placeholder="" disabled data-astro-cid-m5yz2qqy> <label for="service-description" data-astro-cid-m5yz2qqy> Descripción del servicio: </label> <textarea id="service-description" name="serviceDescription" disabled data-astro-cid-m5yz2qqy></textarea> <label for="complaint-option" data-astro-cid-m5yz2qqy> Detalle de reclamación: </label> <input type="text" id="complaint-option" name="complaintOption" value="" disabled data-astro-cid-m5yz2qqy> <label for="complaint-description" data-astro-cid-m5yz2qqy> Descripción del reclamo: </label> <textarea id="complaintDescription" disabled data-astro-cid-m5yz2qqy></textarea> <label for="adicional-info" data-astro-cid-m5yz2qqy> Información adicional: </label> <textarea id="adicionalInfo" disabled data-astro-cid-m5yz2qqy></textarea> </form> </div> </section> `;
}, "/home/runner/work/platform/platform/src/components/admin/complaints/ComplaintViewDialog.astro", void 0);

async function getComplaintsTableData() {
  const complaintsData = await db.select().from(complaints).orderBy(complaints.date);
  return complaintsData;
}

const $$Astro = createAstro();
const $$Complaints = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Complaints;
  const user = Astro2.locals.user;
  if (!user || user.role !== "admin" && user.role !== "manicurist")
    return Astro2.redirect("/home", 302);
  const { avatarURL, username, role } = user;
  const complaints = await getComplaintsTableData();
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Admin", "data-astro-cid-rnfkgjmz": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SideBar", $$SideBar, { "data-astro-cid-rnfkgjmz": true })} ${maybeRenderHead()}<div data-astro-cid-rnfkgjmz> ${renderComponent($$result2, "Header", $$Header, { "avatarURL": avatarURL, "username": username, "role": role, "data-astro-cid-rnfkgjmz": true })} ${renderComponent($$result2, "Dialog", $$Dialog, { "id": "viewComplaint", "data-astro-cid-rnfkgjmz": true }, { "default": ($$result3) => renderTemplate`${renderComponent($$result3, "ComplaintViewDialog", $$ComplaintViewDialog, { "data-astro-cid-rnfkgjmz": true })}` })} <main class="wrapper" data-astro-cid-rnfkgjmz> ${renderComponent($$result2, "ComplaintHeader", $$ComplaintHeader, { "complaintsAmount": complaints.length, "data-astro-cid-rnfkgjmz": true })} ${renderComponent($$result2, "ComplaintTable", $$ComplaintTable, { "complaints": complaints, "data-astro-cid-rnfkgjmz": true })} </main> </div> ` })} `;
}, "/home/runner/work/platform/platform/src/pages/admin/complaints.astro", void 0);

const $$file = "/home/runner/work/platform/platform/src/pages/admin/complaints.astro";
const $$url = "/admin/complaints";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Complaints,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
