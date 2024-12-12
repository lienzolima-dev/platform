import { c as createComponent, r as renderTemplate, m as maybeRenderHead, d as renderComponent, b as createAstro } from '../../chunks/astro/server_JOKs7Agn.mjs';
import { $ as $$SideBar, a as $$Header, b as $$AdminLayout } from '../../chunks/Header_D00v0fcO.mjs';
import { e as ensure_array_like, a as attr, b as escape_html, c as bind_props, p as push, d as copy_payload, f as assign_payload, g as pop } from '../../chunks/_@astro-renderers_BpdHmnqV.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_BpdHmnqV.mjs';
/* empty css                                          */
import { DateFormatter } from '@internationalized/date';
import { l as localeFromDateFnsLocale, D as DatePicker } from '../../chunks/DatePicker_BALomJQr.mjs';
/* empty css                                       */
import { es } from 'date-fns/locale';
import '../../chunks/_astro_actions_CVBKVWzJ.mjs';
import { g as getManicuristsOptions } from '../../chunks/users_BgZwyVhH.mjs';
import { g as getServices } from '../../chunks/services_DIUawdlh.mjs';
import { g as getExtras } from '../../chunks/extras_BHEbstrf.mjs';
import { $ as $$Dialog } from '../../chunks/Dialog_B82jr3Av.mjs';

function SimpleSelect($$payload, $$props) {
	let {
		options,
		noOptionText,
		value = undefined,
		required
	} = $$props;

	const each_array = ensure_array_like(options);

	$$payload.out += `<select name="manicuristId" id="manicurist"${attr("required", required, true)} class="svelte-1o8osfi">`;

	if (noOptionText) {
		$$payload.out += "<!--[-->";
		$$payload.out += `<option value="" disabled selected>${escape_html(noOptionText)}</option>`;
	} else {
		$$payload.out += "<!--[!-->";
		$$payload.out += `<option value="" disabled selected>Selecciona una opción</option>`;
	}

	$$payload.out += `<!--]--><!--[-->`;

	for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
		let option = each_array[$$index];

		$$payload.out += `<option${attr("value", option.value)}>${escape_html(option.label)}</option>`;
	}

	$$payload.out += `<!--]--></select>`;
	bind_props($$props, { value });
}

function StackableSelect($$payload, $$props) {
	push();

	let {
		options,
		noOptionText,
		values = [""],
		required
	} = $$props;

	let $$settled = true;
	let $$inner_payload;

	function $$render_inner($$payload) {
		const each_array = ensure_array_like(values);

		$$payload.out += `<div class="select-stack-container svelte-1o5fzkl"><div class="select-stack svelte-1o5fzkl"><!--[-->`;

		for (let index = 0, $$length = each_array.length; index < $$length; index++) {
			each_array[index];

			$$payload.out += `<div class="select svelte-1o5fzkl">`;

			SimpleSelect($$payload, {
				options,
				noOptionText,
				required,
				get value() {
					return values[index];
				},
				set value($$value) {
					values[index] = $$value;
					$$settled = false;
				}
			});

			$$payload.out += `<!----> <button class="svelte-1o5fzkl">-</button></div>`;
		}

		$$payload.out += `<!--]--></div> <button class="svelte-1o5fzkl">+</button></div>`;
	}
	do {
		$$settled = true;
		$$inner_payload = copy_payload($$payload);
		$$render_inner($$inner_payload);
	} while (!$$settled);

	assign_payload($$payload, $$inner_payload);
	bind_props($$props, { values });
	pop();
}

function BookingData($$payload, $$props) {
	let {
		selectedManicurist = "",
		selectedPayingState = "",
		selectedServices = [""],
		selectedExtras = [""],
		totalPrice = null,
		advanceAmount = null,
		manicuristsOptions,
		servicesOptions,
		extrasOptions
	} = $$props;

	let payingStates = [
		{ value: "full", label: "Pago Completo" },
		{ value: "advance", label: "Adelanto" },
		{ value: "partial", label: "Pago Parcial" },
		{ value: "none", label: "No Pago" }
	];

	function isPartialPayment() {
		return selectedPayingState === "partial" || selectedPayingState === "advance";
	}

	let $$settled = true;
	let $$inner_payload;

	function $$render_inner($$payload) {
		$$payload.out += `<section class="svelte-1jzdq81"><h2 class="svelte-1jzdq81">Datos de la reserva:</h2> <div class="booking-data svelte-1jzdq81"><div class="input-container svelte-1jzdq81"><label for="service">Servicio:</label> `;

		StackableSelect($$payload, {
			options: servicesOptions,
			noOptionText: "Seleccion un servicio",
			get values() {
				return selectedServices;
			},
			set values($$value) {
				selectedServices = $$value;
				$$settled = false;
			},
			required: true
		});

		$$payload.out += `<!----></div> <div class="input-container svelte-1jzdq81"><label for="extra">Adicional:</label> `;

		StackableSelect($$payload, {
			options: extrasOptions,
			noOptionText: "Selecciona un adicional",
			get values() {
				return selectedExtras;
			},
			set values($$value) {
				selectedExtras = $$value;
				$$settled = false;
			}
		});

		$$payload.out += `<!----></div> <div class="input-container svelte-1jzdq81"><label for="manicurist">Manicurista:</label> `;

		SimpleSelect($$payload, {
			options: manicuristsOptions,
			noOptionText: "Selecciona un manicurista",
			get value() {
				return selectedManicurist;
			},
			set value($$value) {
				selectedManicurist = $$value;
				$$settled = false;
			},
			required: true
		});

		$$payload.out += `<!----></div> <div class="input-container svelte-1jzdq81"><label for="paying-state">Estado del Pago:</label> <div class="flex svelte-1jzdq81">`;

		SimpleSelect($$payload, {
			options: payingStates,
			noOptionText: "Selecciona un estado",
			get value() {
				return selectedPayingState;
			},
			set value($$value) {
				selectedPayingState = $$value;
				$$settled = false;
			},
			required: true
		});

		$$payload.out += `<!----> <input type="number"${attr("required", isPartialPayment(), true)}${attr("disabled", !isPartialPayment(), true)}${attr("value", advanceAmount)} placeholder="Ingrese el monto" class="svelte-1jzdq81"></div></div> <div class="input-container svelte-1jzdq81"><label for="price">Precio Total:</label> <input type="number" id="price" name="price"${attr("value", totalPrice)} placeholder="Ingrese el precio total" required class="svelte-1jzdq81"></div></div></section>`;
	}
	do {
		$$settled = true;
		$$inner_payload = copy_payload($$payload);
		$$render_inner($$inner_payload);
	} while (!$$settled);

	assign_payload($$payload, $$inner_payload);

	bind_props($$props, {
		selectedManicurist,
		selectedPayingState,
		selectedServices,
		selectedExtras,
		totalPrice,
		advanceAmount
	});
}

function DatePicker_1($$payload, $$props) {
	push();

	let { date = undefined } = $$props;

	date = /* @__PURE__ */ new Date();

	let nextYear = /* @__PURE__ */ new Date();

	nextYear.setFullYear(nextYear.getFullYear() + 1);

	let locale = localeFromDateFnsLocale(es);
	let $$settled = true;
	let $$inner_payload;

	function $$render_inner($$payload) {
		$$payload.out += `<div class="date-picker svelte-psy4bv">`;

		DatePicker($$payload, {
			get value() {
				return date;
			},
			set value($$value) {
				date = $$value;
				$$settled = false;
			},
			max: nextYear,
			locale
		});

		$$payload.out += `<!----></div>`;
	}
	do {
		$$settled = true;
		$$inner_payload = copy_payload($$payload);
		$$render_inner($$inner_payload);
	} while (!$$settled);

	assign_payload($$payload, $$inner_payload);
	bind_props($$props, { date });
	pop();
}

function TimesData($$payload, $$props) {
	push();

	const df = new DateFormatter("es-PE", { dateStyle: "long" });

	let {
		date = undefined,
		startTime = undefined,
		endTime = undefined
	} = $$props;

	let $$settled = true;
	let $$inner_payload;

	function $$render_inner($$payload) {
		$$payload.out += `<section class="svelte-1qgdws0"><h2 class="svelte-1qgdws0">Fecha y Hora:</h2> <div class="current-times-container svelte-1qgdws0"><div class="date-picker"><label for="date">Selecciona un día:</label> `;

		DatePicker_1($$payload, {
			get date() {
				return date;
			},
			set date($$value) {
				date = $$value;
				$$settled = false;
			}
		});

		$$payload.out += `<!----></div> <div class="current-bookings svelte-1qgdws0"><h3 class="svelte-1qgdws0">Horarios usados el <em>${escape_html(df.format(date))}</em>:</h3> <div class="current-bookings-list svelte-1qgdws0"><div class="table-head svelte-1qgdws0"><div class="svelte-1qgdws0">Horario Usado</div> <div class="svelte-1qgdws0">Manicurista</div> <div class="svelte-1qgdws0">Cliente</div> <div class="svelte-1qgdws0">Estado</div></div> <div class="table-body svelte-1qgdws0">`;

		{
			$$payload.out += "<!--[!-->";
			$$payload.out += `<div class="void-table-row svelte-1qgdws0">No hay horarios usados</div>`;
		}

		$$payload.out += `<!--]--></div></div></div></div> <div class="time-inputs svelte-1qgdws0"><div class="input-container svelte-1qgdws0"><label for="start-time">Inicio:</label> <input${attr("value", startTime)} type="time" id="start-time" name="startTime" step="60" required class="svelte-1qgdws0"></div> <div class="input-container svelte-1qgdws0"><label for="end-time">Final:</label> <input${attr("value", endTime)} type="time" id="end-time" name="endTime" step="60" required class="svelte-1qgdws0"></div></div></section>`;
	}
	do {
		$$settled = true;
		$$inner_payload = copy_payload($$payload);
		$$render_inner($$inner_payload);
	} while (!$$settled);

	assign_payload($$payload, $$inner_payload);
	bind_props($$props, { date, startTime, endTime });
	pop();
}

function UserData($$payload, $$props) {
	let {
		name = undefined,
		email = undefined,
		phone = undefined
	} = $$props;

	$$payload.out += `<section class="svelte-19hy4rd"><h2 class="svelte-19hy4rd">Datos del cliente:</h2> <div class="user-data svelte-19hy4rd"><div class="input-container svelte-19hy4rd"><label for="name">Nombre:</label> <input type="text" id="name" name="name"${attr("value", name)} required class="svelte-19hy4rd"></div> <div class="input-container svelte-19hy4rd"><label for="email">Email:</label> <input type="email" id="email" name="email"${attr("value", email)} class="svelte-19hy4rd"></div> <div class="input-container svelte-19hy4rd"><label for="phone">Teléfono:</label> <input type="tel" id="phone" name="phone"${attr("value", phone)} class="svelte-19hy4rd"></div></div></section>`;
	bind_props($$props, { name, email, phone });
}

function BookingForm($$payload, $$props) {
	push();

	const { manicuristsOptions, services, extras } = $$props;
	const servicesOptions = services.map((service) => ({ value: service.id, label: service.name }));
	const extrasOptions = extras.map((extra) => ({ value: extra.id, label: extra.name }));
	let name = "";
	let email = null;
	let phone = null;
	let selectedManicurist = "";
	let selectedPayingState = "";
	let selectedServices = [""];
	let selectedExtras = [""];
	let totalPrice = null;
	let advanceAmount = null;
	let date = /* @__PURE__ */ new Date();
	let startTime = "";
	let endTime = "";

	let $$settled = true;
	let $$inner_payload;

	function $$render_inner($$payload) {
		$$payload.out += `<div class="booking-form-container svelte-1p7eyp4"><form class="svelte-1p7eyp4">`;

		UserData($$payload, {
			get name() {
				return name;
			},
			set name($$value) {
				name = $$value;
				$$settled = false;
			},
			get email() {
				return email;
			},
			set email($$value) {
				email = $$value;
				$$settled = false;
			},
			get phone() {
				return phone;
			},
			set phone($$value) {
				phone = $$value;
				$$settled = false;
			}
		});

		$$payload.out += `<!----> `;

		BookingData($$payload, {
			get selectedManicurist() {
				return selectedManicurist;
			},
			set selectedManicurist($$value) {
				selectedManicurist = $$value;
				$$settled = false;
			},
			get selectedPayingState() {
				return selectedPayingState;
			},
			set selectedPayingState($$value) {
				selectedPayingState = $$value;
				$$settled = false;
			},
			get selectedServices() {
				return selectedServices;
			},
			set selectedServices($$value) {
				selectedServices = $$value;
				$$settled = false;
			},
			get selectedExtras() {
				return selectedExtras;
			},
			set selectedExtras($$value) {
				selectedExtras = $$value;
				$$settled = false;
			},
			get totalPrice() {
				return totalPrice;
			},
			set totalPrice($$value) {
				totalPrice = $$value;
				$$settled = false;
			},
			get advanceAmount() {
				return advanceAmount;
			},
			set advanceAmount($$value) {
				advanceAmount = $$value;
				$$settled = false;
			},
			manicuristsOptions,
			servicesOptions,
			extrasOptions
		});

		$$payload.out += `<!----> `;

		TimesData($$payload, {
			get date() {
				return date;
			},
			set date($$value) {
				date = $$value;
				$$settled = false;
			},
			get startTime() {
				return startTime;
			},
			set startTime($$value) {
				startTime = $$value;
				$$settled = false;
			},
			get endTime() {
				return endTime;
			},
			set endTime($$value) {
				endTime = $$value;
				$$settled = false;
			}
		});

		$$payload.out += `<!----> `;

		{
			$$payload.out += "<!--[!-->";
		}

		$$payload.out += `<!--]--> <button type="submit" class="svelte-1p7eyp4">Reservar</button></form></div>`;
	}
	do {
		$$settled = true;
		$$inner_payload = copy_payload($$payload);
		$$render_inner($$inner_payload);
	} while (!$$settled);

	assign_payload($$payload, $$inner_payload);
	pop();
}

const $$Astro$1 = createAstro();
const $$AddBookingContent = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$AddBookingContent;
  const { manicuristsOptions, services, extras } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section data-astro-cid-hjgz7pnz> <h1 data-astro-cid-hjgz7pnz>Añadir Reserva</h1> ${renderComponent($$result, "BookingForm", BookingForm, { "manicuristsOptions": manicuristsOptions, "services": services, "extras": extras, "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/platform/platform/src/components/admin/addBooking/BookingForm.svelte", "client:component-export": "default", "data-astro-cid-hjgz7pnz": true })} </section> `;
}, "/home/runner/work/platform/platform/src/components/admin/addBooking/AddBookingContent.astro", void 0);

const $$SuccessfulBookingPopup = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "successful-booking-popup", "successful-booking-popup", { "data-astro-cid-lylam7ra": true }, { "default": () => renderTemplate` ${renderComponent($$result, "Dialog", $$Dialog, { "id": "successful-booking-popup", "data-astro-cid-lylam7ra": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div data-astro-cid-lylam7ra> <h2 data-astro-cid-lylam7ra>La reserva ha sido registrada</h2> <p data-astro-cid-lylam7ra>
La reserva ha sido registrada con éxito. Se ha enviado un correo de
        confirmación al cliente si ha proporcionado su dirección de correo.
</p> <button class="accept-button" data-astro-cid-lylam7ra>Aceptar</button> </div> ` })} ` })}  `;
}, "/home/runner/work/platform/platform/src/components/admin/addBooking/SuccessfulBookingPopup.astro", void 0);

const $$Astro = createAstro();
const $$AddBooking = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AddBooking;
  const user = Astro2.locals.user;
  if (!user || user.role !== "admin" && user.role !== "manicurist")
    return Astro2.redirect("/home", 302);
  const { avatarURL, username, role } = user;
  const [manicuristsOptions, services, extras] = await Promise.all([
    getManicuristsOptions(),
    getServices({}),
    getExtras({})
  ]);
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Admin", "data-astro-cid-i5pwsuuv": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SideBar", $$SideBar, { "data-astro-cid-i5pwsuuv": true })} ${maybeRenderHead()}<div data-astro-cid-i5pwsuuv> ${renderComponent($$result2, "Header", $$Header, { "avatarURL": avatarURL, "username": username, "role": role, "data-astro-cid-i5pwsuuv": true })} ${renderComponent($$result2, "SuccessfulBookingPopup", $$SuccessfulBookingPopup, { "data-astro-cid-i5pwsuuv": true })} <main class="wrapper" data-astro-cid-i5pwsuuv> ${renderComponent($$result2, "AddBookingContent", $$AddBookingContent, { "manicuristsOptions": manicuristsOptions, "services": services, "extras": extras, "data-astro-cid-i5pwsuuv": true })} </main> </div> ` })} `;
}, "/home/runner/work/platform/platform/src/pages/admin/add-booking.astro", void 0);

const $$file = "/home/runner/work/platform/platform/src/pages/admin/add-booking.astro";
const $$url = "/admin/add-booking";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$AddBooking,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
