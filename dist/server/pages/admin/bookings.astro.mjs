import { c as createComponent, r as renderTemplate, d as renderComponent, b as createAstro, m as maybeRenderHead, F as Fragment, a as addAttribute } from '../../chunks/astro/server_JOKs7Agn.mjs';
import { $ as $$SideBar, a as $$Header, b as $$AdminLayout } from '../../chunks/Header_D00v0fcO.mjs';
import { $ as $$EditIcon, a as $$Pagination } from '../../chunks/Pagination_CEjwCCCl.mjs';
/* empty css                                       */
import { DateTime } from 'luxon';
import { n as noop, p as push, h as fallback, s as store_get, d as copy_payload, f as assign_payload, u as unsubscribe_stores, c as bind_props, g as pop, a as attr, i as stringify, j as add_styles, k as store_set, l as slot } from '../../chunks/_@astro-renderers_BpdHmnqV.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_BpdHmnqV.mjs';
/* empty css                                       */
import { g as getInnerLocale, a as getMonthLength, t as toText, D as DatePicker, l as localeFromDateFnsLocale } from '../../chunks/DatePicker_BALomJQr.mjs';
import { es } from 'date-fns/locale';
import 'clsx';
import { g as getPaginatedBookings } from '../../chunks/bookings_Ctd4NecC.mjs';
import { $ as $$Dialog } from '../../chunks/Dialog_B82jr3Av.mjs';
import { b as bookingStatuses } from '../../chunks/db_DooF3xjr.mjs';

/** @import { Equals } from '#client' */
/** @type {Equals} */

/**
 * @param {unknown} a
 * @param {unknown} b
 * @returns {boolean}
 */
function safe_not_equal(a, b) {
	return a != a
		? b == b
		: a !== b || (a !== null && typeof a === 'object') || typeof a === 'function';
}

/** Parse a string according to the supplied format tokens. Returns a date if successful, and the missing punctuation if there is any that should be after the string */
function parse(str, tokens, baseDate) {
    let missingPunctuation = '';
    let valid = true;
    baseDate = baseDate || new Date(2020, 0, 1, 0, 0, 0, 0);
    let year = baseDate.getFullYear();
    let month = baseDate.getMonth();
    let day = baseDate.getDate();
    let hours = baseDate.getHours();
    let minutes = baseDate.getMinutes();
    let seconds = baseDate.getSeconds();
    const ms = baseDate.getMilliseconds();
    function parseString(token) {
        for (let i = 0; i < token.length; i++) {
            if (str.startsWith(token[i])) {
                str = str.slice(1);
            }
            else {
                valid = false;
                if (str.length === 0)
                    missingPunctuation = token.slice(i);
                return;
            }
        }
    }
    function parseUint(pattern, min, max) {
        const matches = str.match(pattern);
        if (matches?.[0]) {
            str = str.slice(matches[0].length);
            const n = parseInt(matches[0]);
            if (n > max || n < min) {
                valid = false;
                return null;
            }
            else {
                return n;
            }
        }
        else {
            valid = false;
            return null;
        }
    }
    function parseEnum(allowedValues) {
        const n = allowedValues.findIndex((allowedValue) => {
            return allowedValue.toLowerCase() === str.slice(0, allowedValue.length).toLowerCase();
        });
        if (n >= 0) {
            str = str.slice(allowedValues[n].length);
            return n;
        }
        else {
            valid = false;
            return null;
        }
    }
    function parseToken(token) {
        if (typeof token === 'string') {
            parseString(token);
        }
        else if (token.id === 'yy') {
            const value = parseUint(/^[0-9]{2}/, 0, 99);
            if (value !== null)
                year = 2000 + value;
        }
        else if (token.id === 'yyyy') {
            const value = parseUint(/^[0-9]{4}/, 0, 9999);
            if (value !== null)
                year = value;
        }
        else if (token.id === 'MM') {
            const value = parseUint(/^[0-9]{2}/, 1, 12);
            if (value !== null)
                month = value - 1;
        }
        else if (token.id === 'MMM') {
            const value = parseEnum(token.allowedValues || []);
            if (value !== null)
                month = value;
        }
        else if (token.id === 'dd') {
            const value = parseUint(/^[0-9]{2}/, 1, 31);
            if (value !== null)
                day = value;
        }
        else if (token.id === 'HH') {
            const value = parseUint(/^[0-9]{2}/, 0, 23);
            if (value !== null)
                hours = value;
        }
        else if (token.id === 'mm') {
            const value = parseUint(/^[0-9]{2}/, 0, 59);
            if (value !== null)
                minutes = value;
        }
        else if (token.id === 'ss') {
            const value = parseUint(/^[0-9]{2}/, 0, 59);
            if (value !== null)
                seconds = value;
        }
    }
    for (const token of tokens) {
        parseToken(token);
        if (!valid)
            break;
    }
    const monthLength = getMonthLength(year, month);
    if (day > monthLength) {
        valid = false;
    }
    return {
        date: valid ? new Date(year, month, day, hours, minutes, seconds, ms) : null,
        missingPunctuation: missingPunctuation,
    };
}
function twoDigit(value) {
    return ('0' + value.toString()).slice(-2);
}
function parseRule(s, innerLocale) {
    if (s.startsWith('yyyy')) {
        return {
            id: 'yyyy',
            toString: (d) => d.getFullYear().toString(),
        };
    }
    else if (s.startsWith('yy')) {
        return {
            id: 'yy',
            toString: (d) => d.getFullYear().toString().slice(-2),
        };
    }
    else if (s.startsWith('MMM')) {
        return {
            id: 'MMM',
            allowedValues: innerLocale.shortMonths,
            toString: (d) => innerLocale.shortMonths[d.getMonth()],
        };
    }
    else if (s.startsWith('MM')) {
        return {
            id: 'MM',
            toString: (d) => twoDigit(d.getMonth() + 1),
        };
    }
    else if (s.startsWith('dd')) {
        return {
            id: 'dd',
            toString: (d) => twoDigit(d.getDate()),
        };
    }
    else if (s.startsWith('HH')) {
        return {
            id: 'HH',
            toString: (d) => twoDigit(d.getHours()),
        };
    }
    else if (s.startsWith('mm')) {
        return {
            id: 'mm',
            toString: (d) => twoDigit(d.getMinutes()),
        };
    }
    else if (s.startsWith('ss')) {
        return {
            id: 'ss',
            toString: (d) => twoDigit(d.getSeconds()),
        };
    }
}
function createFormat(s, locale = {}) {
    const innerLocale = getInnerLocale(locale);
    const tokens = [];
    while (s.length > 0) {
        const token = parseRule(s, innerLocale);
        if (token) {
            // parsed a token like "yyyy"
            tokens.push(token);
            s = s.slice(token.id.length);
        }
        else if (typeof tokens[tokens.length - 1] === 'string') {
            // last token is a string token, so append to it
            tokens[tokens.length - 1] += s[0];
            s = s.slice(1);
        }
        else {
            // add string token
            tokens.push(s[0]);
            s = s.slice(1);
        }
    }
    return tokens;
}

/** @import { Readable, StartStopNotifier, Subscriber, Unsubscriber, Updater, Writable } from '../public.js' */
/** @import { Stores, StoresValues, SubscribeInvalidateTuple } from '../private.js' */

/**
 * @type {Array<SubscribeInvalidateTuple<any> | any>}
 */
const subscriber_queue = [];

/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 *
 * @template T
 * @param {T} [value] initial value
 * @param {StartStopNotifier<T>} [start]
 * @returns {Writable<T>}
 */
function writable(value, start = noop) {
	/** @type {Unsubscriber | null} */
	let stop = null;

	/** @type {Set<SubscribeInvalidateTuple<T>>} */
	const subscribers = new Set();

	/**
	 * @param {T} new_value
	 * @returns {void}
	 */
	function set(new_value) {
		if (safe_not_equal(value, new_value)) {
			value = new_value;
			if (stop) {
				// store is ready
				const run_queue = !subscriber_queue.length;
				for (const subscriber of subscribers) {
					subscriber[1]();
					subscriber_queue.push(subscriber, value);
				}
				if (run_queue) {
					for (let i = 0; i < subscriber_queue.length; i += 2) {
						subscriber_queue[i][0](subscriber_queue[i + 1]);
					}
					subscriber_queue.length = 0;
				}
			}
		}
	}

	/**
	 * @param {Updater<T>} fn
	 * @returns {void}
	 */
	function update(fn) {
		set(fn(/** @type {T} */ (value)));
	}

	/**
	 * @param {Subscriber<T>} run
	 * @param {() => void} [invalidate]
	 * @returns {Unsubscriber}
	 */
	function subscribe(run, invalidate = noop) {
		/** @type {SubscribeInvalidateTuple<T>} */
		const subscriber = [run, invalidate];
		subscribers.add(subscriber);
		if (subscribers.size === 1) {
			stop = start(set, update) || noop;
		}
		run(/** @type {T} */ (value));
		return () => {
			subscribers.delete(subscriber);
			if (subscribers.size === 0 && stop) {
				stop();
				stop = null;
			}
		};
	}
	return { set, update, subscribe };
}

function DateInput($$payload, $$props) {
	push();

	var $$store_subs;
	const defaultDate = /* @__PURE__ */ new Date();

	function cloneDate(d) {
		return new Date(d.getTime());
	}

	const innerStore = writable(null);

	const store = (() => {
		return {
			subscribe: innerStore.subscribe,
			set: (date) => {
				if (date === null || date === void 0) {
					innerStore.set(null);
					value = date;
				} else if (date.getTime() !== store_get($$store_subs ??= {}, "$innerStore", innerStore)?.getTime()) {
					innerStore.set(cloneDate(date));
					value = date;
				}
			}
		};
	})();

	let value = fallback($$props["value"], null);
	let min = fallback($$props["min"], () => new Date(defaultDate.getFullYear() - 20, 0, 1), true);
	let max = fallback($$props["max"], () => new Date(defaultDate.getFullYear(), 11, 31, 23, 59, 59, 999), true);
	let id = fallback($$props["id"], null);
	let placeholder = fallback($$props["placeholder"], "2020-12-31 23:00:00");
	let valid = fallback($$props["valid"], true);
	let disabled = fallback($$props["disabled"], false);
	let required = fallback($$props["required"], false);
	let classes = fallback($$props["class"], "");
	let locale = fallback($$props["locale"], () => ({}), true);
	let format = fallback($$props["format"], "yyyy-MM-dd HH:mm:ss");
	let formatTokens = createFormat(format, locale);

	function valueUpdate(value2, formatTokens2) {
		text = toText(value2, formatTokens2);
	}

	let text = fallback($$props["text"], () => toText(store_get($$store_subs ??= {}, "$store", store), formatTokens), true);

	function textUpdate(text2, formatTokens2) {
		if (text2.length) {
			const result = parse(text2, formatTokens2, store_get($$store_subs ??= {}, "$store", store));

			if (result.date !== null) {
				valid = true;
				store.set(result.date);
			} else {
				valid = false;
			}
		} else {
			valid = true;

			if (value) {
				value = null;
				store.set(null);
			}
		}
	}

	let visible = fallback($$props["visible"], false);
	let closeOnSelection = fallback($$props["closeOnSelection"], false);
	let browseWithoutSelecting = fallback($$props["browseWithoutSelecting"], false);
	let timePrecision = fallback($$props["timePrecision"], null);

	let dynamicPositioning = fallback($$props["dynamicPositioning"], false);
	let pickerLeftPosition = null;

	store.set(value);
	formatTokens = createFormat(format, locale);
	valueUpdate(store_get($$store_subs ??= {}, "$store", store), formatTokens);
	textUpdate(text, formatTokens);

	let $$settled = true;
	let $$inner_payload;

	function $$render_inner($$payload) {
		$$payload.out += `<div${attr("class", `date-time-field ${stringify(classes)} svelte-1vabmef`)}><input type="text" autocomplete="off"${attr("value", text)}${attr("id", id)}${attr("placeholder", placeholder)}${attr("disabled", disabled, true)}${attr("required", required, true)}${attr("class", `svelte-1vabmef ${stringify([!valid ? "invalid" : ""].filter(Boolean).join(" "))}`)}> `;

		if (visible && !disabled) {
			$$payload.out += "<!--[-->";

			$$payload.out += `<div${add_styles({
				"--picker-left-position": `${stringify(pickerLeftPosition)}px`
			})}${attr("class", `picker svelte-1vabmef ${stringify([
				visible ? "visible" : "",
				""
			].filter(Boolean).join(" "))}`)}>`;

			DatePicker($$payload, {
				get value() {
					return store_get($$store_subs ??= {}, "$store", store);
				},
				set value($$value) {
					store_set(store, $$value);
					$$settled = false;
				},
				min,
				max,
				locale,
				browseWithoutSelecting,
				timePrecision,
				children: ($$payload) => {
					$$payload.out += `<!---->`;
					slot($$payload, $$props, "default", {});
					$$payload.out += `<!---->`;
				},
				$$slots: { default: true }
			});

			$$payload.out += `<!----></div>`;
		} else {
			$$payload.out += "<!--[!-->";
		}

		$$payload.out += `<!--]--></div>`;
	}
	do {
		$$settled = true;
		$$inner_payload = copy_payload($$payload);
		$$render_inner($$inner_payload);
	} while (!$$settled);

	assign_payload($$payload, $$inner_payload);
	if ($$store_subs) unsubscribe_stores($$store_subs);

	bind_props($$props, {
		value,
		min,
		max,
		id,
		placeholder,
		valid,
		disabled,
		required,
		class: classes,
		locale,
		format,
		text,
		visible,
		closeOnSelection,
		browseWithoutSelecting,
		timePrecision,
		dynamicPositioning
	});

	pop();
}

const $$Astro$5 = createAstro();
const $$BookingEditButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$BookingEditButton;
  const { booking } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "booking-edit-button", "booking-edit-button", { "data-booking": JSON.stringify(booking), "data-astro-cid-vfzptexz": true }, { "default": () => renderTemplate` ${maybeRenderHead()}<button data-astro-cid-vfzptexz> <span class="icon-bg" data-astro-cid-vfzptexz></span> ${renderComponent($$result, "EditIcon", $$EditIcon, { "color": "white", "data-astro-cid-vfzptexz": true })} </button> ` })}  `;
}, "/home/runner/work/platform/platform/src/components/admin/bookings/BookingEditButton.astro", void 0);

const $$Astro$4 = createAstro();
const $$BookingCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$BookingCard;
  const { booking } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="card" data-astro-cid-qoslozjw> <div class="flex" data-astro-cid-qoslozjw> <h3 data-astro-cid-qoslozjw>${booking.username}</h3> <span data-astro-cid-qoslozjw> ${booking.date.toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long"
  })} </span> </div> ${booking.phone && renderTemplate`<span data-astro-cid-qoslozjw>Teléfono: ${booking.phone}</span>`} ${booking.email && renderTemplate`<span data-astro-cid-qoslozjw>Correo: ${booking.email}</span>`} <span data-astro-cid-qoslozjw>
Horario: ${booking.startTime} - ${booking.endTime} </span> <span class="separator" data-astro-cid-qoslozjw>Manicurista</span> <span data-astro-cid-qoslozjw>${booking.manicurist}</span> <span class="separator" data-astro-cid-qoslozjw>Servicios:</span> <div class="services-list" data-astro-cid-qoslozjw> ${booking.services.map((service) => renderTemplate`<span data-astro-cid-qoslozjw>${service.name}</span>`)} </div> ${booking.extras.length > 0 && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-qoslozjw": true }, { "default": ($$result2) => renderTemplate` <span class="separator" data-astro-cid-qoslozjw>Extras</span> <div class="services-list" data-astro-cid-qoslozjw> ${booking.extras.map((extra) => renderTemplate`<span data-astro-cid-qoslozjw>${extra.name}</span>`)} </div> ` })}`} <div class="flex" data-astro-cid-qoslozjw> <span class="separator" data-astro-cid-qoslozjw>Adelanto</span> <span data-astro-cid-qoslozjw>S/ ${booking.advanceAmount}</span> </div> <div class="flex" data-astro-cid-qoslozjw> <span class="separator" data-astro-cid-qoslozjw>Total</span> <span data-astro-cid-qoslozjw>S/ ${booking.totalPrice}</span> </div> <div class="flex-end edit-button" data-astro-cid-qoslozjw> ${renderComponent($$result, "BookingEditButton", $$BookingEditButton, { "booking": booking, "data-astro-cid-qoslozjw": true })} </div> </div> `;
}, "/home/runner/work/platform/platform/src/components/admin/bookings/BookingCard.astro", void 0);

const $$Astro$3 = createAstro();
const $$BookingsList = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$BookingsList;
  const { bookings } = Astro2.props;
  return renderTemplate`${bookings.length === 0 && renderTemplate`${maybeRenderHead()}<p data-astro-cid-gv2qg6fm>No hay reservas para mostrar</p>`}<div class="cards-list" data-astro-cid-gv2qg6fm>${bookings.map((booking) => renderTemplate`${renderComponent($$result, "BookingCard", $$BookingCard, { "booking": booking, "data-astro-cid-gv2qg6fm": true })}`)}</div>`;
}, "/home/runner/work/platform/platform/src/components/admin/bookings/BookingsList.astro", void 0);

function BookingsDateFilters($$payload, $$props) {
	push();

	let { date } = $$props;
	let locale = localeFromDateFnsLocale(es);

	let $$settled = true;
	let $$inner_payload;

	function $$render_inner($$payload) {
		$$payload.out += `<div class="container svelte-1xv77lq"><div class="date-input svelte-1xv77lq">`;

		DateInput($$payload, {
			get value() {
				return date;
			},
			set value($$value) {
				date = $$value;
				$$settled = false;
			},
			format: "dd-MM-yyyy",
			locale
		});

		$$payload.out += `<!----> <button class="svelte-1xv77lq">Aplicar</button></div> <button class="reset-button svelte-1xv77lq">Limpiar Filtros</button></div>`;
	}
	do {
		$$settled = true;
		$$inner_payload = copy_payload($$payload);
		$$render_inner($$inner_payload);
	} while (!$$settled);

	assign_payload($$payload, $$inner_payload);
	pop();
}

const $$Astro$2 = createAstro();
const $$BookingsStatusFilter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$BookingsStatusFilter;
  const { status } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div data-astro-cid-iipftjle> <select class="form-select" id="booking-status-select" name="status"${addAttribute(status, "data-status")} data-astro-cid-iipftjle> <option value="all" data-astro-cid-iipftjle>Todos</option> <option value="pending" data-astro-cid-iipftjle>Pendiente</option> <option value="finished" data-astro-cid-iipftjle>Finalizado</option> <option value="cancelled" data-astro-cid-iipftjle>Cancelado</option> </select> </div>  `;
}, "/home/runner/work/platform/platform/src/components/admin/bookings/BookingsStatusFilter.astro", void 0);

const $$DownloadIcon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"> <path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM216 232l0 102.1 31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31L168 232c0-13.3 10.7-24 24-24s24 10.7 24 24z"></path> </svg>`;
}, "/home/runner/work/platform/platform/src/components/svgs/admin/bookings/DownloadIcon.astro", void 0);

const $$BookingsExportButton = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "bookings-export-button", "bookings-export-button", { "data-astro-cid-v5l2chyz": true }, { "default": () => renderTemplate` ${maybeRenderHead()}<button data-astro-cid-v5l2chyz> ${renderComponent($$result, "DownloadIcon", $$DownloadIcon, { "data-astro-cid-v5l2chyz": true })} <span data-astro-cid-v5l2chyz>Exportar</span> </button> ` })}  `;
}, "/home/runner/work/platform/platform/src/components/admin/bookings/BookingsExportButton.astro", void 0);

const $$Astro$1 = createAstro();
const $$BookingsHeader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BookingsHeader;
  const { dateParam } = Astro2.props;
  const { statusParam } = Astro2.props;
  const date = dateParam ? DateTime.fromISO(dateParam, { zone: "America/Lima" }).toJSDate() : null;
  const status = statusParam || null;
  return renderTemplate`${maybeRenderHead()}<section data-astro-cid-a4akd4ab> <div class="flex" data-astro-cid-a4akd4ab> <h1 data-astro-cid-a4akd4ab>Reservas</h1> ${renderComponent($$result, "BookingsExportButton", $$BookingsExportButton, { "data-astro-cid-a4akd4ab": true })} </div> <div class="filters" data-astro-cid-a4akd4ab> ${renderComponent($$result, "BookingsStatusFilter", $$BookingsStatusFilter, { "status": status || "", "data-astro-cid-a4akd4ab": true })} ${renderComponent($$result, "BookingsDateFilters", BookingsDateFilters, { "date": date, "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/platform/platform/src/components/admin/bookings/BookingsDateFilters.svelte", "client:component-export": "default", "data-astro-cid-a4akd4ab": true })} </div> </section> `;
}, "/home/runner/work/platform/platform/src/components/admin/bookings/BookingsHeader.astro", void 0);

const $$BookingEditForm = createComponent(async ($$result, $$props, $$slots) => {
  const bookingStatusesMap = {
    pending: "Pendiente",
    finished: "Finalizada",
    cancelled: "Cancelada"
  };
  return renderTemplate`${maybeRenderHead()}<section data-astro-cid-xd4jr7yw> <div class="form-container" data-astro-cid-xd4jr7yw> <h2 data-astro-cid-xd4jr7yw>Editar Reserva</h2> <form id="edit-booking-form" data-astro-cid-xd4jr7yw> <input type="hidden" id="booking-id" name="bookingId" data-astro-cid-xd4jr7yw> <label data-astro-cid-xd4jr7yw> Nombre de cliente </label> <input type="text" class="username" name="username" disabled data-astro-cid-xd4jr7yw> <label data-astro-cid-xd4jr7yw>Fecha <span class="required" data-astro-cid-xd4jr7yw>*</span> </label> <input type="date" id="date" name="date" required data-astro-cid-xd4jr7yw> <label data-astro-cid-xd4jr7yw>Hora de inicio <span class="required" data-astro-cid-xd4jr7yw>*</span> </label> <input type="time" class="startTime" name="startTime" step="60" required data-astro-cid-xd4jr7yw> <label data-astro-cid-xd4jr7yw>Hora de finalización <span class="required" data-astro-cid-xd4jr7yw>*</span> </label> <input type="time" class="endTime" name="endTime" step="60" required data-astro-cid-xd4jr7yw> <label data-astro-cid-xd4jr7yw>Estado <span class="required" data-astro-cid-xd4jr7yw>*</span> </label> <select id="bookingStatus" name="bookingStatus" required data-astro-cid-xd4jr7yw> ${Object.entries(bookingStatusesMap).map(([status, label]) => renderTemplate`<option${addAttribute(status, "value")} data-astro-cid-xd4jr7yw>${label}</option>`)} </select> <p id="b-error-content" data-astro-cid-xd4jr7yw></p> <button id="b-edit-submit-btn" class="submit-button" type="submit" data-astro-cid-xd4jr7yw>Guardar</button> </form> </div> </section>  `;
}, "/home/runner/work/platform/platform/src/components/admin/bookings/BookingEditForm.astro", void 0);

function isBookingStatus(status) {
  return bookingStatuses.includes(status);
}

const $$Astro = createAstro();
const $$Bookings = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Bookings;
  const user = Astro2.locals.user;
  if (!user || user.role !== "admin" && user.role !== "manicurist")
    return Astro2.redirect("/home", 302);
  const { avatarURL, username, role } = user;
  const { searchParams } = new URL(Astro2.request.url);
  const pageParam = Number.parseInt(searchParams.get("page") || "1");
  const dateParam = searchParams.get("date") || "";
  const statusParam = searchParams.get("status") || "";
  const status = !isBookingStatus(statusParam) ? void 0 : statusParam;
  const pageSize = 8;
  const { data: bookings, totalPages } = await getPaginatedBookings({
    page: pageParam,
    pageSize,
    day: dateParam ? DateTime.fromISO(dateParam, { zone: "America/Lima" }).toJSDate() : void 0,
    status
  });
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Admin", "data-astro-cid-h7so5vei": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SideBar", $$SideBar, { "data-astro-cid-h7so5vei": true })} ${maybeRenderHead()}<div data-astro-cid-h7so5vei> ${renderComponent($$result2, "Header", $$Header, { "avatarURL": avatarURL, "username": username, "role": role, "data-astro-cid-h7so5vei": true })} ${renderComponent($$result2, "Dialog", $$Dialog, { "id": "editBooking", "data-astro-cid-h7so5vei": true }, { "default": ($$result3) => renderTemplate`${renderComponent($$result3, "BookingEditForm", $$BookingEditForm, { "data-astro-cid-h7so5vei": true })}` })} <main class="wrapper" data-astro-cid-h7so5vei> ${renderComponent($$result2, "BookingsHeader", $$BookingsHeader, { "dateParam": dateParam, "statusParam": statusParam || "", "data-astro-cid-h7so5vei": true })} ${renderComponent($$result2, "BookingsList", $$BookingsList, { "bookings": bookings, "data-astro-cid-h7so5vei": true })} ${renderComponent($$result2, "Pagination", $$Pagination, { "currentPage": pageParam, "totalPages": totalPages, "data-astro-cid-h7so5vei": true })} </main> </div> ` })} `;
}, "/home/runner/work/platform/platform/src/pages/admin/bookings.astro", void 0);

const $$file = "/home/runner/work/platform/platform/src/pages/admin/bookings.astro";
const $$url = "/admin/bookings";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Bookings,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
