import { c as createComponent, r as renderTemplate, m as maybeRenderHead, d as renderComponent, b as createAstro, a as addAttribute } from '../chunks/astro/server_JOKs7Agn.mjs';
import { $ as $$SideBar, a as $$Header, b as $$AdminLayout } from '../chunks/Header_D00v0fcO.mjs';
import 'clsx';
import { g as getPaymentStatusLabel, d as db, t as tasks } from '../chunks/db_DooF3xjr.mjs';
/* empty css                                 */
import { a as actions } from '../chunks/_astro_actions_CVBKVWzJ.mjs';
import { $ as $$TrashIcon } from '../chunks/TrashIcon_BTahMnHo.mjs';
import '../chunks/complaints_DeMGL233.mjs';
import { eq, desc } from 'drizzle-orm';
import { a as getUpcomingBookings } from '../chunks/bookings_Ctd4NecC.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_BpdHmnqV.mjs';

const $$CalendarIcon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"> <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l80 0 0 56-80 0 0-56zm0 104l80 0 0 64-80 0 0-64zm128 0l96 0 0 64-96 0 0-64zm144 0l80 0 0 64-80 0 0-64zm80-48l-80 0 0-56 80 0 0 56zm0 160l0 40c0 8.8-7.2 16-16 16l-64 0 0-56 80 0zm-128 0l0 56-96 0 0-56 96 0zm-144 0l0 56-64 0c-8.8 0-16-7.2-16-16l0-40 80 0zM272 248l-96 0 0-56 96 0 0 56z"></path> </svg>`;
}, "/home/runner/work/platform/platform/src/components/svgs/admin/IndexContent/CalendarIcon.astro", void 0);

const $$MoneyIcon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <path d="M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2c0 0 0 0 0 0s0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2 43.9-25.5l0 35.4c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336l0-35.4c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4l0 3.4 0 5.7 0 26.3zm32 0l0-32 0-25.9c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5l0 35.4c0 10.5-5 21-14.9 30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5l0 35.4c0 44.2-86 80-192 80S0 476.2 0 432l0-35.4c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z"></path></svg>`;
}, "/home/runner/work/platform/platform/src/components/svgs/admin/IndexContent/MoneyIcon.astro", void 0);

const $$UserIcon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"></path></svg>`;
}, "/home/runner/work/platform/platform/src/components/svgs/admin/IndexContent/UserIcon.astro", void 0);

const $$Astro$8 = createAstro();
const $$NextBookingFinishButton = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$NextBookingFinishButton;
  const { bookingId } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "next-bookings-finish-button", "next-bookings-finish-button", { "data-booking-id": JSON.stringify({ bookingId }), "data-astro-cid-r2xpzpmu": true }, { "default": () => renderTemplate` ${maybeRenderHead()}<button data-astro-cid-r2xpzpmu>Finalizar</button> ` })}  `;
}, "/home/runner/work/platform/platform/src/components/admin/indexContent/NextBookingFinishButton.astro", void 0);

const $$Astro$7 = createAstro();
const $$NextBookingItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$NextBookingItem;
  const { booking } = Astro2.props;
  const paymentCompleted = booking.paymentStatus === "full" || booking.status === "finished";
  const isPendingPayment = booking.status === "pending" && booking.totalPrice > booking.advanceAmount;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["item", [{ finished: booking.status === "finished" }]], "class:list")} data-astro-cid-uvnas24y> <div class="info" data-astro-cid-uvnas24y> <span${addAttribute(["item-rectangle", [
    {
      pending: booking.status === "pending",
      finished: booking.status === "finished"
    }
  ]], "class:list")} data-astro-cid-uvnas24y></span> <div class="item-inner" data-astro-cid-uvnas24y> <div class="item-top" data-astro-cid-uvnas24y> <span data-astro-cid-uvnas24y> ${booking.startTime} - ${booking.endTime} </span> <div class="item-user" data-astro-cid-uvnas24y> ${renderComponent($$result, "UserIcon", $$UserIcon, { "data-astro-cid-uvnas24y": true })} <span data-astro-cid-uvnas24y>${booking.username.toUpperCase()}</span> </div> <div class="item-user" data-astro-cid-uvnas24y> ${isPendingPayment && renderTemplate`<span data-astro-cid-uvnas24y>
(${renderComponent($$result, "MoneyIcon", $$MoneyIcon, { "data-astro-cid-uvnas24y": true })}
Por pagar: S/ ${booking.totalPrice - booking.advanceAmount})
</span>`} ${paymentCompleted && renderTemplate`<span data-astro-cid-uvnas24y>(PAGO COMPLETO)</span>`} </div> </div> <div class="item-bottom" data-astro-cid-uvnas24y> <span class="item-payment-label" data-astro-cid-uvnas24y> ${getPaymentStatusLabel(booking.paymentStatus)} </span> <span class="item-date-label" data-astro-cid-uvnas24y> ${booking.date.toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long"
  })} </span> <span class="item-manicurist-label" data-astro-cid-uvnas24y> ${booking.manicurist} </span> </div> </div> </div> <div class="button-container" data-astro-cid-uvnas24y> ${booking.status === "pending" && renderTemplate`${renderComponent($$result, "NextBookingFinishButton", $$NextBookingFinishButton, { "bookingId": booking.id, "data-astro-cid-uvnas24y": true })}`} ${booking.status === "finished" && renderTemplate`<button class="finished-button" disabled data-astro-cid-uvnas24y>
Atendida
</button>`} </div> </div> `;
}, "/home/runner/work/platform/platform/src/components/admin/indexContent/NextBookingItem.astro", void 0);

const $$Astro$6 = createAstro();
const $$NextBookings = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$NextBookings;
  const { bookings } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section data-astro-cid-xmpyhmse> <header data-astro-cid-xmpyhmse> ${renderComponent($$result, "CalendarIcon", $$CalendarIcon, { "data-astro-cid-xmpyhmse": true })} <span data-astro-cid-xmpyhmse>Próximas Reservas hoy</span> </header> <div class="booking-list" data-astro-cid-xmpyhmse> ${bookings.length === 0 ? renderTemplate`<p data-astro-cid-xmpyhmse>No hay próximas citas disponibles</p>` : bookings.map((bookingItem) => {
    return renderTemplate`${renderComponent($$result, "NextBookingItem", $$NextBookingItem, { "booking": bookingItem, "data-astro-cid-xmpyhmse": true })}`;
  })} </div> </section> `;
}, "/home/runner/work/platform/platform/src/components/admin/indexContent/NextBookings.astro", void 0);

const $$PinIcon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"> <path d="M32 32C32 14.3 46.3 0 64 0L320 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-29.5 0 11.4 148.2c36.7 19.9 65.7 53.2 79.5 94.7l1 3c3.3 9.8 1.6 20.5-4.4 28.8s-15.7 13.3-26 13.3L32 352c-10.3 0-19.9-4.9-26-13.3s-7.7-19.1-4.4-28.8l1-3c13.8-41.5 42.8-74.8 79.5-94.7L93.5 64 64 64C46.3 64 32 49.7 32 32zM160 384l64 0 0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96z"></path></svg>`;
}, "/home/runner/work/platform/platform/src/components/svgs/admin/IndexContent/PinIcon.astro", void 0);

const $$CheckIcon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#a8c180"> <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path> </svg>`;
}, "/home/runner/work/platform/platform/src/components/svgs/admin/IndexContent/CheckIcon.astro", void 0);

const $$NewTaskForm = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<form${addAttribute(actions.db.tasks.add, "action")} method="post" data-astro-cid-b6sri6r4> <input type="text" placeholder="Insertar nuevo recordatorio" name="description" data-astro-cid-b6sri6r4> <button type="submit" data-astro-cid-b6sri6r4> ${renderComponent($$result, "CheckIcon", $$CheckIcon, { "data-astro-cid-b6sri6r4": true })} </button> </form> `;
}, "/home/runner/work/platform/platform/src/components/admin/indexContent/NewTaskForm.astro", void 0);

const $$Astro$5 = createAstro();
const $$TaskCheckButton = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$TaskCheckButton;
  const { taskId } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "task-check-button", "task-check-button", { "data-task-id": JSON.stringify({ taskId }), "data-astro-cid-yjj7sqlp": true }, { "default": () => renderTemplate` ${maybeRenderHead()}<button class="check-button" data-astro-cid-yjj7sqlp> ${renderComponent($$result, "CheckIcon", $$CheckIcon, { "data-astro-cid-yjj7sqlp": true })} </button> ` })}  `;
}, "/home/runner/work/platform/platform/src/components/admin/indexContent/TaskCheckButton.astro", void 0);

const $$Astro$4 = createAstro();
const $$TaskDeleteButton = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$TaskDeleteButton;
  const { taskId } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "task-delete-button", "task-delete-button", { "data-task-id": JSON.stringify({ taskId }), "data-astro-cid-nzx22emh": true }, { "default": () => renderTemplate` ${maybeRenderHead()}<button class="check-button" data-astro-cid-nzx22emh> ${renderComponent($$result, "TrashIcon", $$TrashIcon, { "data-astro-cid-nzx22emh": true })} </button> ` })}  `;
}, "/home/runner/work/platform/platform/src/components/admin/indexContent/TaskDeleteButton.astro", void 0);

const $$Astro$3 = createAstro();
const $$TaskList = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$TaskList;
  const { tasks } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section data-astro-cid-3mxegkci> <header data-astro-cid-3mxegkci> ${renderComponent($$result, "PinIcon", $$PinIcon, { "data-astro-cid-3mxegkci": true })} <span data-astro-cid-3mxegkci>Recordatorios</span> </header> ${renderComponent($$result, "NewTaskForm", $$NewTaskForm, { "data-astro-cid-3mxegkci": true })} <div class="list" data-astro-cid-3mxegkci> ${tasks.map((taskItem) => {
    return renderTemplate`<div class="item" data-astro-cid-3mxegkci> <div class="item-inner" data-astro-cid-3mxegkci> <div class="item-top" data-astro-cid-3mxegkci> <span data-astro-cid-3mxegkci> <strong data-astro-cid-3mxegkci>${taskItem.date}</strong> </span> <div class="item-date" data-astro-cid-3mxegkci> <span data-astro-cid-3mxegkci>${taskItem.creationTime}</span> </div> </div> <div class="item-bottom" data-astro-cid-3mxegkci> <p data-astro-cid-3mxegkci>${taskItem.description}</p> </div> </div> <div class="buttons" data-astro-cid-3mxegkci> ${renderComponent($$result, "TaskCheckButton", $$TaskCheckButton, { "taskId": taskItem.id, "data-astro-cid-3mxegkci": true })} ${renderComponent($$result, "TaskDeleteButton", $$TaskDeleteButton, { "taskId": taskItem.id, "data-astro-cid-3mxegkci": true })} </div> </div>`;
  })} ${tasks.length === 0 && renderTemplate`<div class="item" data-astro-cid-3mxegkci> <div class="item-inner" data-astro-cid-3mxegkci> <p data-astro-cid-3mxegkci>Añade un nuevo recordatorio</p> </div> </div>`} </div> </section> `;
}, "/home/runner/work/platform/platform/src/components/admin/indexContent/TaskList.astro", void 0);

const $$Astro$2 = createAstro();
const $$TopSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$TopSection;
  const { username, email, cargo } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="container" data-astro-cid-hrrconqw> <div class="user-info" data-astro-cid-hrrconqw> <h2 data-astro-cid-hrrconqw>${username.toLocaleUpperCase()}</h2> <span class="user-info-email" data-astro-cid-hrrconqw>Correo: ${email}</span> </div> <div class="user-role" data-astro-cid-hrrconqw> <p data-astro-cid-hrrconqw>${cargo}</p> </div> </div> `;
}, "/home/runner/work/platform/platform/src/components/admin/indexContent/TopSection.astro", void 0);

const $$Astro$1 = createAstro();
const $$IndexContent = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$IndexContent;
  const { userInfo, tasks, bookings } = Astro2.props;
  let cargo = "No definido";
  if (userInfo.role === "admin") cargo = "Administrador";
  if (userInfo.role === "manicurist") cargo = "Manicurista";
  return renderTemplate`${maybeRenderHead()}<section data-astro-cid-5ypwihx7> ${renderComponent($$result, "TopSection", $$TopSection, { "username": userInfo.username, "email": userInfo.email, "cargo": cargo, "data-astro-cid-5ypwihx7": true })} <div class="grid" data-astro-cid-5ypwihx7> ${renderComponent($$result, "NextBookings", $$NextBookings, { "bookings": bookings, "data-astro-cid-5ypwihx7": true })} ${renderComponent($$result, "TaskList", $$TaskList, { "tasks": tasks, "data-astro-cid-5ypwihx7": true })} </div> </section> `;
}, "/home/runner/work/platform/platform/src/components/admin/indexContent/IndexContent.astro", void 0);

function formatTasksData(task) {
  const date = task.date ? new Date(task.date).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long"
  }) : "";
  const creationTime = task.date ? new Date(task.date).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit"
  }) : "";
  return {
    id: task.id,
    date,
    creationTime,
    description: task.description
  };
}
async function getTasks() {
  const tasksList = await db.select({
    id: tasks.id,
    date: tasks.createdAt,
    description: tasks.description
  }).from(tasks).where(eq(tasks.status, "pending")).orderBy(desc(tasks.createdAt));
  return tasksList.map(formatTasksData);
}

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const user = Astro2.locals.user;
  if (!user || user.role !== "admin" && user.role !== "manicurist")
    return Astro2.redirect("/home", 302);
  const { avatarURL, username, role, email } = user;
  const userInfo = {
    avatarURL,
    email,
    username,
    role
  };
  const [tasks, bookings] = await Promise.all([
    getTasks(),
    getUpcomingBookings()
  ]);
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Admin", "data-astro-cid-u2h3djql": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SideBar", $$SideBar, { "data-astro-cid-u2h3djql": true })} ${maybeRenderHead()}<div data-astro-cid-u2h3djql> ${renderComponent($$result2, "Header", $$Header, { "avatarURL": avatarURL, "username": username, "role": role, "data-astro-cid-u2h3djql": true })} <main class="wrapper" data-astro-cid-u2h3djql> ${renderComponent($$result2, "IndexContent", $$IndexContent, { "bookings": bookings, "tasks": tasks, "userInfo": userInfo, "data-astro-cid-u2h3djql": true })} </main> </div> ` })} `;
}, "/home/runner/work/platform/platform/src/pages/admin/index.astro", void 0);

const $$file = "/home/runner/work/platform/platform/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
