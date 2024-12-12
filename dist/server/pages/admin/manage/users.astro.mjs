import { c as createComponent, r as renderTemplate, m as maybeRenderHead, b as createAstro, d as renderComponent } from '../../../chunks/astro/server_JOKs7Agn.mjs';
import { $ as $$SideBar, a as $$Header, b as $$AdminLayout } from '../../../chunks/Header_D00v0fcO.mjs';
import 'clsx';
/* empty css                                       */
import { $ as $$TableRow, a as $$TableHead } from '../../../chunks/TableRow_CvnT11xS.mjs';
import { $ as $$EditIcon, a as $$Pagination } from '../../../chunks/Pagination_CEjwCCCl.mjs';
import { $ as $$TrashIcon } from '../../../chunks/TrashIcon_BTahMnHo.mjs';
import { $ as $$Dialog } from '../../../chunks/Dialog_B82jr3Av.mjs';
import { $ as $$AlertIcon, a as $$DeleteIcon } from '../../../chunks/AlertIcon_V-ht1CZj.mjs';
import { a as getPaginatedUsers } from '../../../chunks/users_BgZwyVhH.mjs';
export { r as renderers } from '../../../chunks/_@astro-renderers_BpdHmnqV.mjs';

const $$Astro$4 = createAstro();
const $$UsersHeader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$UsersHeader;
  const { usersAmount } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="container" data-astro-cid-vjoainf7> <h2 data-astro-cid-vjoainf7>Usuarios (${usersAmount})</h2> <div class="search-input" data-astro-cid-vjoainf7> <input type="text" id="search-input" placeholder="Buscar por nombre o email" data-astro-cid-vjoainf7> <button id="search-user-btn" data-astro-cid-vjoainf7>Buscar</button> </div> </div>  `;
}, "/home/runner/work/platform/platform/src/components/admin/manage/users/UsersHeader.astro", void 0);

const $$Astro$3 = createAstro();
const $$UserEditButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$UserEditButton;
  const { user } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "user-edit-button", "user-edit-button", { "data-user": JSON.stringify(user), "data-astro-cid-przx3dzr": true }, { "default": () => renderTemplate` ${maybeRenderHead()}<button data-astro-cid-przx3dzr> ${renderComponent($$result, "EditIcon", $$EditIcon, { "color": "white", "data-astro-cid-przx3dzr": true })} <span data-astro-cid-przx3dzr>Editar</span> </button> ` })}  `;
}, "/home/runner/work/platform/platform/src/components/admin/manage/users/UserEditButton.astro", void 0);

const $$Astro$2 = createAstro();
const $$UserDeleteButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$UserDeleteButton;
  const { user } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "user-delete-button", "user-delete-button", { "data-user": JSON.stringify(user), "data-astro-cid-2rygwaii": true }, { "default": () => renderTemplate` ${maybeRenderHead()}<button data-astro-cid-2rygwaii> ${renderComponent($$result, "TrashIcon", $$TrashIcon, { "color": "white", "data-astro-cid-2rygwaii": true })} <span data-astro-cid-2rygwaii>Eliminar</span> </button> ` })}  `;
}, "/home/runner/work/platform/platform/src/components/admin/manage/users/UserDeleteButton.astro", void 0);

const $$Astro$1 = createAstro();
const $$UsersTable = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$UsersTable;
  const { users } = Astro2.props;
  const columns = ["Nombre", "Email", "Tel\xE9fono", "Acciones"];
  const rowData = users.reduce(
    (acc, user) => {
      const { id, name, email, phone } = user;
      acc[id] = [name, email, phone];
      return acc;
    },
    {}
  );
  const noResults = users.length === 0;
  return renderTemplate`${maybeRenderHead()}<div class="table-container" data-astro-cid-kd5qj6kz> <table data-astro-cid-kd5qj6kz> ${renderComponent($$result, "TableHead", $$TableHead, { "columnsNames": columns, "data-astro-cid-kd5qj6kz": true })} <tbody data-astro-cid-kd5qj6kz> ${noResults ? renderTemplate`<tr data-astro-cid-kd5qj6kz> <td colspan="5" style="text-align: center;" data-astro-cid-kd5qj6kz>
No hay resultados
</td> </tr>` : users.map((user) => renderTemplate`${renderComponent($$result, "TableRow", $$TableRow, { "rowData": rowData[user.id], "data-astro-cid-kd5qj6kz": true }, { "default": ($$result2) => renderTemplate` <div class="action-button" data-astro-cid-kd5qj6kz> ${renderComponent($$result2, "UserEditButton", $$UserEditButton, { "user": user, "data-astro-cid-kd5qj6kz": true })} ${renderComponent($$result2, "UserDeleteButton", $$UserDeleteButton, { "user": user, "data-astro-cid-kd5qj6kz": true })} </div> ` })}`)} </tbody> </table> </div> `;
}, "/home/runner/work/platform/platform/src/components/admin/manage/users/UsersTable.astro", void 0);

const $$UserEditForm = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section data-astro-cid-ths7hvh2> <div class="form-container" data-astro-cid-ths7hvh2> <h2 data-astro-cid-ths7hvh2>Editar Usuario</h2> <form id="edit-user-form" data-astro-cid-ths7hvh2> <input id="edit-user-id" name="userId" hidden data-astro-cid-ths7hvh2> <label for="username" data-astro-cid-ths7hvh2>
Nombre: <span class="required" data-astro-cid-ths7hvh2>*</span> </label> <input type="text" id="username" name="username" placeholder="Ingresa nombre completo" required data-astro-cid-ths7hvh2> <label for="user-email" data-astro-cid-ths7hvh2>Email <span class="required" data-astro-cid-ths7hvh2>*</span> </label> <input type="email" id="user-email" name="email" placeholder="Ingresa un email" required data-astro-cid-ths7hvh2> <label for="user-phone" data-astro-cid-ths7hvh2>Teléfono</label> <input type="text" id="user-phone" name="phone" placeholder="Ingresa un teléfono" data-astro-cid-ths7hvh2> <p id="u-edit-error-content" data-astro-cid-ths7hvh2></p> <button id="u-edit-submit-btn" type="submit" data-astro-cid-ths7hvh2>Guardar</button> </form> </div> </section>  `;
}, "/home/runner/work/platform/platform/src/components/admin/manage/users/UserEditForm.astro", void 0);

const $$UserDeleteForm = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="container" data-astro-cid-4myxwbct> ${renderComponent($$result, "AlertIcon", $$AlertIcon, { "data-astro-cid-4myxwbct": true })} <h3 data-astro-cid-4myxwbct>
Estas seguro de que quiere eliminar a <span id="selected-user" data-astro-cid-4myxwbct>Username</span>?
</h3> <p data-astro-cid-4myxwbct>Al eliminar a un usuario, no se podrá recuperar su información.</p> <div class="buttons" data-astro-cid-4myxwbct> <form id="delete-user-form" data-astro-cid-4myxwbct> <input type="hidden" name="userId" data-astro-cid-4myxwbct> <button id="u-delete-submit-btn" type="submit" data-astro-cid-4myxwbct> ${renderComponent($$result, "DeleteIcon", $$DeleteIcon, { "color": "#fff", "data-astro-cid-4myxwbct": true })} <span data-astro-cid-4myxwbct>Sí, eliminar usuario</span> </button> </form> <button class="cancel" data-astro-cid-4myxwbct>Cancelar</button> </div> <p id="u-delete-error-content" data-astro-cid-4myxwbct></p> </section>  `;
}, "/home/runner/work/platform/platform/src/components/admin/manage/users/UserDeleteForm.astro", void 0);

const $$Astro = createAstro();
const $$Users = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Users;
  const user = Astro2.locals.user;
  if (!user || user.role !== "admin" && user.role !== "manicurist")
    return Astro2.redirect("/home", 302);
  const { avatarURL, username, role } = user;
  const { searchParams } = new URL(Astro2.request.url);
  const searchParam = (searchParams.get("search") || "").toLowerCase();
  const pageParam = Number.parseInt(searchParams.get("page") || "1");
  const pageSize = 10;
  const {
    data: users,
    count: totalUsers,
    totalPages
  } = await getPaginatedUsers({
    page: pageParam,
    pageSize,
    nameOrEmail: searchParam
  });
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Admin", "data-astro-cid-22zh2ysz": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SideBar", $$SideBar, { "data-astro-cid-22zh2ysz": true })} ${maybeRenderHead()}<div data-astro-cid-22zh2ysz> ${renderComponent($$result2, "Header", $$Header, { "avatarURL": avatarURL, "username": username, "role": role, "data-astro-cid-22zh2ysz": true })} ${renderComponent($$result2, "Dialog", $$Dialog, { "id": "editUser", "data-astro-cid-22zh2ysz": true }, { "default": ($$result3) => renderTemplate`${renderComponent($$result3, "UserEditForm", $$UserEditForm, { "data-astro-cid-22zh2ysz": true })}` })} ${renderComponent($$result2, "Dialog", $$Dialog, { "id": "deleteUser", "data-astro-cid-22zh2ysz": true }, { "default": ($$result3) => renderTemplate`${renderComponent($$result3, "UserDeleteForm", $$UserDeleteForm, { "data-astro-cid-22zh2ysz": true })}` })} <main class="wrapper" data-astro-cid-22zh2ysz> ${renderComponent($$result2, "UsersHeader", $$UsersHeader, { "usersAmount": totalUsers, "data-astro-cid-22zh2ysz": true })} ${renderComponent($$result2, "UsersTable", $$UsersTable, { "users": users, "data-astro-cid-22zh2ysz": true })} ${renderComponent($$result2, "Pagination", $$Pagination, { "currentPage": pageParam, "totalPages": totalPages, "data-astro-cid-22zh2ysz": true })} </main> </div> ` })} `;
}, "/home/runner/work/platform/platform/src/pages/admin/manage/users.astro", void 0);

const $$file = "/home/runner/work/platform/platform/src/pages/admin/manage/users.astro";
const $$url = "/admin/manage/users";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Users,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
