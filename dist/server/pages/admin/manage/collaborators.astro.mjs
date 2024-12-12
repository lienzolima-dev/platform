import { c as createComponent, r as renderTemplate, m as maybeRenderHead, b as createAstro, d as renderComponent, a as addAttribute, e as renderSlot } from '../../../chunks/astro/server_JOKs7Agn.mjs';
import { $ as $$SideBar, a as $$Header, b as $$AdminLayout } from '../../../chunks/Header_D00v0fcO.mjs';
import 'clsx';
/* empty css                                               */
import { $ as $$TableRow, a as $$TableHead } from '../../../chunks/TableRow_CvnT11xS.mjs';
import { $ as $$EditIcon, a as $$Pagination } from '../../../chunks/Pagination_CEjwCCCl.mjs';
import { $ as $$TrashIcon } from '../../../chunks/TrashIcon_BTahMnHo.mjs';
import { $ as $$Dialog } from '../../../chunks/Dialog_B82jr3Av.mjs';
import { $ as $$AlertIcon, a as $$DeleteIcon } from '../../../chunks/AlertIcon_V-ht1CZj.mjs';
import { and, not, eq, desc, or, like, count } from 'drizzle-orm';
import { u as users, d as db } from '../../../chunks/db_DooF3xjr.mjs';
import '../../../chunks/complaints_DeMGL233.mjs';
export { r as renderers } from '../../../chunks/_@astro-renderers_BpdHmnqV.mjs';

const $$Astro$5 = createAstro();
const $$CollaboratorsHeader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$CollaboratorsHeader;
  const { collabsAmount } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="container" data-astro-cid-2bxh4g4s> <div class="title" data-astro-cid-2bxh4g4s> <h2 data-astro-cid-2bxh4g4s>Colaboradores (${collabsAmount})</h2> <button id="add-collaborator-btn" data-astro-cid-2bxh4g4s>Añadir</button> </div> <div class="search-input" data-astro-cid-2bxh4g4s> <input type="text" id="search-input" placeholder="Buscar por nombre o email" data-astro-cid-2bxh4g4s> <button id="search-collaborator-btn" data-astro-cid-2bxh4g4s>Buscar</button> </div> </div>  `;
}, "/home/runner/work/platform/platform/src/components/admin/manage/colaborators/CollaboratorsHeader.astro", void 0);

const $$Astro$4 = createAstro();
const $$CollaboratorEditButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$CollaboratorEditButton;
  const { collaborator } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "user-collaborator-button", "user-collaborator-button", { "data-collaborator": JSON.stringify(collaborator), "data-astro-cid-qmibym4i": true }, { "default": () => renderTemplate` ${maybeRenderHead()}<button data-astro-cid-qmibym4i> ${renderComponent($$result, "EditIcon", $$EditIcon, { "color": "white", "data-astro-cid-qmibym4i": true })} <span data-astro-cid-qmibym4i>Editar</span> </button> ` })}  `;
}, "/home/runner/work/platform/platform/src/components/admin/manage/colaborators/CollaboratorEditButton.astro", void 0);

const $$Astro$3 = createAstro();
const $$CollaboratorDeleteButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$CollaboratorDeleteButton;
  const { collaborator } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "collaborator-delete-button", "collaborator-delete-button", { "data-collaborator": JSON.stringify(collaborator), "data-astro-cid-dulr7hdn": true }, { "default": () => renderTemplate` ${maybeRenderHead()}<button data-astro-cid-dulr7hdn> ${renderComponent($$result, "TrashIcon", $$TrashIcon, { "color": "white", "data-astro-cid-dulr7hdn": true })} <span data-astro-cid-dulr7hdn>Eliminar</span> </button> ` })}  `;
}, "/home/runner/work/platform/platform/src/components/admin/manage/colaborators/CollaboratorDeleteButton.astro", void 0);

const $$Astro$2 = createAstro();
const $$CollaboratorTable = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$CollaboratorTable;
  const { collaborators } = Astro2.props;
  const columns = ["Nombre", "Email", "Rol", "Tel\xE9fono", "Acciones"];
  const rowData = collaborators.reduce(
    (acc, collaborator) => {
      const { id, name, email, role, phone } = collaborator;
      acc[id] = [name, email, role, phone];
      return acc;
    },
    {}
  );
  const noResults = collaborators.length === 0;
  return renderTemplate`${maybeRenderHead()}<div class="table-container" data-astro-cid-iqnrd6sb> <table data-astro-cid-iqnrd6sb> ${renderComponent($$result, "TableHead", $$TableHead, { "columnsNames": columns, "data-astro-cid-iqnrd6sb": true })} <tbody data-astro-cid-iqnrd6sb> ${noResults ? renderTemplate`<tr data-astro-cid-iqnrd6sb> <td colspan="5" style="text-align: center;" data-astro-cid-iqnrd6sb>
No hay resultados
</td> </tr>` : collaborators.map((collaborator) => renderTemplate`${renderComponent($$result, "TableRow", $$TableRow, { "rowData": rowData[collaborator.id], "data-astro-cid-iqnrd6sb": true }, { "default": ($$result2) => renderTemplate` <div class="action-button" data-astro-cid-iqnrd6sb> ${renderComponent($$result2, "CollaboratorEditButton", $$CollaboratorEditButton, { "collaborator": collaborator, "data-astro-cid-iqnrd6sb": true })} ${renderComponent($$result2, "CollaboratorDeleteButton", $$CollaboratorDeleteButton, { "collaborator": collaborator, "data-astro-cid-iqnrd6sb": true })} </div> ` })}`)} </tbody> </table> </div> `;
}, "/home/runner/work/platform/platform/src/components/admin/manage/colaborators/CollaboratorTable.astro", void 0);

const $$Astro$1 = createAstro();
const $$Toggle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Toggle;
  const { id, name } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<label${addAttribute(id, "for")} data-astro-cid-wdgkffoa> <span data-astro-cid-wdgkffoa>${renderSlot($$result, $$slots["default"])}</span> <div class="toggle-container" data-astro-cid-wdgkffoa> <input type="checkbox"${addAttribute(id, "id")}${addAttribute(name, "name")} data-astro-cid-wdgkffoa> <span class="toggle" data-astro-cid-wdgkffoa></span> </div> </label> `;
}, "/home/runner/work/platform/platform/src/components/global/form/Toggle.astro", void 0);

const $$CollaboratorEditForm = createComponent(async ($$result, $$props, $$slots) => {
  const userRolesMap = {
    admin: "Administrador",
    manicurist: "Manicurista",
    user: "Usuario"
  };
  return renderTemplate`${maybeRenderHead()}<section data-astro-cid-rx4t4zmz> <div class="form-container" data-astro-cid-rx4t4zmz> <h2 data-astro-cid-rx4t4zmz>Editar Usuario</h2> <form id="edit-collaborator-form" data-astro-cid-rx4t4zmz> <input type="hidden" id="collaborator-id" name="userId" data-astro-cid-rx4t4zmz> <label for="username" data-astro-cid-rx4t4zmz>
Nombre: <span class="required" data-astro-cid-rx4t4zmz>*</span> </label> <input type="text" id="username" name="username" placeholder="Ingresa nombre completo" required data-astro-cid-rx4t4zmz> <label for="collaborator-email" data-astro-cid-rx4t4zmz>Email <span class="required" data-astro-cid-rx4t4zmz>*</span> </label> <input type="email" id="collaborator-email" name="email" placeholder="Ingresa un email" required data-astro-cid-rx4t4zmz> <label for="collaborator-phone" data-astro-cid-rx4t4zmz>Teléfono</label> <input type="text" id="collaborator-phone" name="phone" placeholder="Ingresa un teléfono" data-astro-cid-rx4t4zmz> <label for="collaborator-role" data-astro-cid-rx4t4zmz>
Rol <span class="required" data-astro-cid-rx4t4zmz>*</span> </label> <select id="collaborator-role" name="userRole" data-astro-cid-rx4t4zmz> ${Object.entries(userRolesMap).map(([role, label]) => renderTemplate`<option${addAttribute(role, "value")} data-astro-cid-rx4t4zmz>${label}</option>`)} </select> <div class="toggle" data-astro-cid-rx4t4zmz> ${renderComponent($$result, "Toggle", $$Toggle, { "id": "c-toggle-password", "name": "changePassword", "data-astro-cid-rx4t4zmz": true }, { "default": ($$result2) => renderTemplate`
Cambiar contraseña
` })} </div> <div id="c-password-fields" class="hidden" data-astro-cid-rx4t4zmz> <label for="c-password" data-astro-cid-rx4t4zmz>
Contraseña<span class="required" data-astro-cid-rx4t4zmz>*</span> </label> <input type="password" id="c-password" name="password" placeholder="Ingresa nueva contraseña" data-astro-cid-rx4t4zmz> <label for="c-confirm-password" data-astro-cid-rx4t4zmz>
Confirmar Contraseña <span class="required" data-astro-cid-rx4t4zmz>*</span> </label> <input type="password" id="c-confirm-password" name="confirmPassword" placeholder="Confirma la nueva contraseña" data-astro-cid-rx4t4zmz> </div> <button id="c-edit-submit-btn" type="submit" data-astro-cid-rx4t4zmz>Guardar</button> </form> <div id="c-edit-error-content" data-astro-cid-rx4t4zmz></div> </div> </section>  `;
}, "/home/runner/work/platform/platform/src/components/admin/manage/colaborators/CollaboratorEditForm.astro", void 0);

const $$CollaboratorDeleteForm = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="container" data-astro-cid-cofinme7> ${renderComponent($$result, "AlertIcon", $$AlertIcon, { "data-astro-cid-cofinme7": true })} <h3 data-astro-cid-cofinme7>
Estas seguro de que quiere eliminar a
<span id="selected-collaborator" data-astro-cid-cofinme7>Username</span>?
</h3> <p data-astro-cid-cofinme7>Al eliminar a un colaborador, no se podrá recuperar su información.</p> <div class="buttons" data-astro-cid-cofinme7> <form id="delete-collaborator-form" data-astro-cid-cofinme7> <input type="hidden" name="collaboratorId" data-astro-cid-cofinme7> <button id="c-delete-submit-btn" type="submit" data-astro-cid-cofinme7> ${renderComponent($$result, "DeleteIcon", $$DeleteIcon, { "color": "#fff", "data-astro-cid-cofinme7": true })} <span data-astro-cid-cofinme7>Sí, eliminar colaborador</span> </button> </form> <button class="cancel" data-astro-cid-cofinme7>Cancelar</button> </div> <p id="c-delete-error-content" data-astro-cid-cofinme7></p> </section>  `;
}, "/home/runner/work/platform/platform/src/components/admin/manage/colaborators/CollaboratorDeleteForm.astro", void 0);

async function getCollaboratorsTableData({
  offset,
  limit,
  nameOrEmail
}) {
  const conditions = [
    and(not(eq(users.role, "user")), not(eq(users.status, "deleted")))
  ];
  const query = db.select({
    id: users.id,
    name: users.username,
    email: users.email,
    role: users.role,
    phone: users.phone
  }).from(users).orderBy(desc(users.username)).$dynamic();
  if (nameOrEmail) {
    conditions.push(
      or(
        like(users.username, `%${nameOrEmail}%`),
        like(users.email, `%${nameOrEmail}%`)
      )
    );
  }
  if (limit) query.limit(limit);
  if (offset) query.offset(offset);
  query.where(and(...conditions));
  const collaborators = await query;
  return collaborators;
}
async function getCollaboratorsCount({
  nameOrEmail
}) {
  const conditions = [
    and(not(eq(users.role, "user")), not(eq(users.status, "deleted")))
  ];
  let query = db.select({ count: count() }).from(users).$dynamic();
  if (nameOrEmail) {
    conditions.push(
      or(
        like(users.username, `%${nameOrEmail}%`),
        like(users.email, `%${nameOrEmail}%`)
      )
    );
  }
  query = query.where(and(...conditions));
  const collaboratorsCount = await query;
  return collaboratorsCount[0].count;
}
async function getPaginatedCollaborators({
  page,
  pageSize,
  nameOrEmail
}) {
  const offset = (page - 1) * pageSize;
  const [collaborators, collaboratorsCount] = await Promise.all([
    getCollaboratorsTableData({
      offset,
      limit: pageSize,
      nameOrEmail
    }),
    getCollaboratorsCount({ nameOrEmail })
  ]);
  return {
    data: collaborators,
    count: collaboratorsCount,
    totalPages: Math.ceil(collaboratorsCount / pageSize)
  };
}

const $$CollaboratorAddForm = createComponent(async ($$result, $$props, $$slots) => {
  const userRolesMap = {
    admin: "Administrador",
    manicurist: "Manicurista"
  };
  return renderTemplate`${renderComponent($$result, "collaborator-add-form", "collaborator-add-form", { "data-astro-cid-2wyoetgy": true }, { "default": () => renderTemplate` ${maybeRenderHead()}<section data-astro-cid-2wyoetgy> <div class="form-container" data-astro-cid-2wyoetgy> <h2 data-astro-cid-2wyoetgy>Añadir Usuario</h2> <form id="add-collaborator-form" data-astro-cid-2wyoetgy> <label data-astro-cid-2wyoetgy>
Nombre: <span class="required" data-astro-cid-2wyoetgy>*</span> </label> <input type="text" class="username" name="username" placeholder="Ingresa nombre completo" required data-astro-cid-2wyoetgy> <label data-astro-cid-2wyoetgy>Email <span class="required" data-astro-cid-2wyoetgy>*</span> </label> <input type="email" class="email" name="email" placeholder="Ingresa un email" required data-astro-cid-2wyoetgy> <label data-astro-cid-2wyoetgy>Teléfono</label> <input type="text" class="phone" name="phone" placeholder="Ingresa un teléfono" data-astro-cid-2wyoetgy> <label data-astro-cid-2wyoetgy>Rol <span class="required" data-astro-cid-2wyoetgy>*</span></label> <select name="userRole" class="user-role" required data-astro-cid-2wyoetgy> ${Object.entries(userRolesMap).map(([role, label]) => renderTemplate`<option${addAttribute(role, "value")} data-astro-cid-2wyoetgy>${label}</option>`)} </select> <label data-astro-cid-2wyoetgy>
Contraseña<span class="required" data-astro-cid-2wyoetgy>*</span> </label> <input type="password" name="password" class="password" placeholder="Ingresa nueva contraseña" data-astro-cid-2wyoetgy> <label data-astro-cid-2wyoetgy>
Confirmar Contraseña <span class="required" data-astro-cid-2wyoetgy>*</span> </label> <input type="password" name="confirmPassword" class="confirm-password" placeholder="Confirma la nueva contraseña" data-astro-cid-2wyoetgy> <button class="submit-button" type="submit" data-astro-cid-2wyoetgy>Guardar</button> </form> <div class="error-content" data-astro-cid-2wyoetgy></div> </div> </section> ` })}  `;
}, "/home/runner/work/platform/platform/src/components/admin/manage/colaborators/CollaboratorAddForm.astro", void 0);

const $$Astro = createAstro();
const $$Collaborators = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Collaborators;
  const user = Astro2.locals.user;
  if (!user || user.role !== "admin" && user.role !== "manicurist")
    return Astro2.redirect("/home", 302);
  const { avatarURL, username, role } = user;
  const { searchParams } = new URL(Astro2.request.url);
  const searchParam = (searchParams.get("search") || "").toLowerCase();
  const pageParam = Number.parseInt(searchParams.get("page") || "1");
  const pageSize = 10;
  const {
    data: collaborators,
    count: totalCollaborators,
    totalPages
  } = await getPaginatedCollaborators({
    page: pageParam,
    pageSize,
    nameOrEmail: searchParam
  });
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Admin", "data-astro-cid-ljog6ssy": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SideBar", $$SideBar, { "data-astro-cid-ljog6ssy": true })} ${maybeRenderHead()}<div data-astro-cid-ljog6ssy> ${renderComponent($$result2, "Header", $$Header, { "avatarURL": avatarURL, "username": username, "role": role, "data-astro-cid-ljog6ssy": true })} ${renderComponent($$result2, "Dialog", $$Dialog, { "id": "editCollaborator", "data-astro-cid-ljog6ssy": true }, { "default": ($$result3) => renderTemplate`${renderComponent($$result3, "CollaboratorEditForm", $$CollaboratorEditForm, { "data-astro-cid-ljog6ssy": true })}` })} ${renderComponent($$result2, "Dialog", $$Dialog, { "id": "deleteCollaborator", "data-astro-cid-ljog6ssy": true }, { "default": ($$result3) => renderTemplate`${renderComponent($$result3, "CollaboratorDeleteForm", $$CollaboratorDeleteForm, { "data-astro-cid-ljog6ssy": true })}` })} ${renderComponent($$result2, "Dialog", $$Dialog, { "id": "addCollaborator", "data-astro-cid-ljog6ssy": true }, { "default": ($$result3) => renderTemplate`${renderComponent($$result3, "CollaboratorAddForm", $$CollaboratorAddForm, { "data-astro-cid-ljog6ssy": true })}` })} <main class="wrapper" data-astro-cid-ljog6ssy> ${renderComponent($$result2, "CollaboratorsHeader", $$CollaboratorsHeader, { "collabsAmount": totalCollaborators, "data-astro-cid-ljog6ssy": true })} ${renderComponent($$result2, "CollaboratorTable", $$CollaboratorTable, { "collaborators": collaborators, "data-astro-cid-ljog6ssy": true })} ${renderComponent($$result2, "Pagination", $$Pagination, { "currentPage": pageParam, "totalPages": totalPages, "data-astro-cid-ljog6ssy": true })} </main> </div> ` })} `;
}, "/home/runner/work/platform/platform/src/pages/admin/manage/collaborators.astro", void 0);

const $$file = "/home/runner/work/platform/platform/src/pages/admin/manage/collaborators.astro";
const $$url = "/admin/manage/collaborators";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Collaborators,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
