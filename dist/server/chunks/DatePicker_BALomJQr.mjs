import { p as push, b as escape_html, c as bind_props, g as pop, h as fallback, d as copy_payload, f as assign_payload, e as ensure_array_like, a as attr, i as stringify, l as slot } from './_@astro-renderers_BpdHmnqV.mjs';
/* empty css                            */

function TimePicker($$payload, $$props) {
	push();

	let browseDate = $$props["browseDate"];
	let timePrecision = $$props["timePrecision"];
	let setTime = $$props["setTime"];

	function setText(d) {
		("00" + d.getHours()).slice(-2);
		("00" + d.getMinutes()).slice(-2);
		("00" + d.getSeconds()).slice(-2);
		("000" + d.getMilliseconds()).slice(-3);
	}

	setText(browseDate);

	if (timePrecision) {
		$$payload.out += "<!--[-->";
		$$payload.out += `<div class="time-picker svelte-mzlxg7" role="none"><span role="spinbutton" aria-label="Hours" tabindex="0" contenteditable="" inputmode="numeric" class="svelte-mzlxg7">${escape_html(('00' + browseDate.getHours()).slice(-2))}</span>: <span role="spinbutton" aria-label="Minutes" tabindex="0" contenteditable="" inputmode="numeric" class="svelte-mzlxg7">${escape_html(('00' + browseDate.getMinutes()).slice(-2))}</span> `;

		if (timePrecision !== 'minute') {
			$$payload.out += "<!--[-->";
			$$payload.out += `:<span role="spinbutton" aria-label="Seconds" tabindex="0" contenteditable="" inputmode="numeric" class="svelte-mzlxg7">${escape_html(('00' + browseDate.getSeconds()).slice(-2))}</span> `;

			if (timePrecision !== 'second') {
				$$payload.out += "<!--[-->";
				$$payload.out += `.<span role="spinbutton" aria-label="Milliseconds" tabindex="0" contenteditable="" inputmode="numeric" class="svelte-mzlxg7">${escape_html(('000' + browseDate.getMilliseconds()).slice(-3))}</span>`;
			} else {
				$$payload.out += "<!--[!-->";
			}

			$$payload.out += `<!--]-->`;
		} else {
			$$payload.out += "<!--[!-->";
		}

		$$payload.out += `<!--]--></div>`;
	} else {
		$$payload.out += "<!--[!-->";
	}

	$$payload.out += `<!--]-->`;
	bind_props($$props, { browseDate, timePrecision, setTime });
	pop();
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
function getMonthLength(year, month) {
    const feb = isLeapYear(year) ? 29 : 28;
    const monthLengths = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return monthLengths[month];
}
function toText(date, formatTokens) {
    let text = '';
    if (date) {
        for (const token of formatTokens) {
            if (typeof token === 'string') {
                text += token;
            }
            else {
                text += token.toString(date);
            }
        }
    }
    return text;
}
function getMonthDays(year, month) {
    const monthLength = getMonthLength(year, month);
    const days = [];
    for (let i = 0; i < monthLength; i++) {
        days.push({
            year: year,
            month: month,
            number: i + 1,
        });
    }
    return days;
}
function getCalendarDays(value, weekStartsOn) {
    const year = value.getFullYear();
    const month = value.getMonth();
    const firstWeekday = new Date(year, month, 1).getDay();
    let days = [];
    // add last month
    const daysBefore = (firstWeekday - weekStartsOn + 7) % 7;
    if (daysBefore > 0) {
        let lastMonth = month - 1;
        let lastMonthYear = year;
        if (lastMonth === -1) {
            lastMonth = 11;
            lastMonthYear = year - 1;
        }
        days = getMonthDays(lastMonthYear, lastMonth).slice(-daysBefore);
    }
    // add current month
    days = days.concat(getMonthDays(year, month));
    // add next month
    let nextMonth = month + 1;
    let nextMonthYear = year;
    if (nextMonth === 12) {
        nextMonth = 0;
        nextMonthYear = year + 1;
    }
    const daysAfter = 42 - days.length;
    days = days.concat(getMonthDays(nextMonthYear, nextMonth).slice(0, daysAfter));
    return days;
}

function getLocaleDefaults() {
    return {
        weekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
        shortMonths: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ],
        weekStartsOn: 1,
    };
}
function getInnerLocale(locale) {
    const innerLocale = getLocaleDefaults();
    if (typeof locale.weekStartsOn === 'number') {
        innerLocale.weekStartsOn = locale.weekStartsOn;
    }
    if (locale.months)
        innerLocale.months = locale.months;
    if (locale.shortMonths)
        innerLocale.shortMonths = locale.shortMonths;
    if (locale.weekdays)
        innerLocale.weekdays = locale.weekdays;
    return innerLocale;
}
/** Create a Locale from a date-fns locale */
function localeFromDateFnsLocale(dateFnsLocale) {
    const locale = getLocaleDefaults();
    if (typeof dateFnsLocale.options?.weekStartsOn === 'number') {
        locale.weekStartsOn = dateFnsLocale.options.weekStartsOn;
    }
    if (dateFnsLocale.localize) {
        for (let i = 0; i < 7; i++) {
            // widths: narrow, short, abbreviated, wide, any
            locale.weekdays[i] = dateFnsLocale.localize.day(i, { width: 'short' });
        }
        for (let i = 0; i < 12; i++) {
            locale.months[i] = dateFnsLocale.localize.month(i, { width: 'wide' });
            locale.shortMonths[i] = dateFnsLocale.localize.month(i, { width: 'abbreviated' });
        }
    }
    return locale;
}

function DatePicker($$payload, $$props) {
	push();

	let iLocale,
		browseYear,
		browseMonth,
		calendarDays;

	function cloneDate(d) {
		return new Date(d.getTime());
	}

	let value = fallback($$props["value"], null);

	function setValue(d) {
		if (d.getTime() !== value?.getTime()) {
			browseDate = clamp(d, min, max);
			value = cloneDate(browseDate);
		}
	}

	function setTime(d) {
		browseDate = clamp(d, min, max);

		if (value) {
			setValue(browseDate);
		}

		return browseDate;
	}

	const todayDate = /* @__PURE__ */ new Date();
	const defaultDate = /* @__PURE__ */ new Date();
	let timePrecision = fallback($$props["timePrecision"], null);
	let min = fallback($$props["min"], () => new Date(defaultDate.getFullYear() - 20, 0, 1), true);
	let max = fallback($$props["max"], () => new Date(defaultDate.getFullYear(), 11, 31, 23, 59, 59, 999), true);

	function clamp(d, min2, max2) {
		if (d > max2) {
			return cloneDate(max2);
		} else if (d < min2) {
			return cloneDate(min2);
		} else {
			return cloneDate(d);
		}
	}

	function clampDate(d, min2, max2) {
		const limit = clamp(d, min2, max2);

		if (limit.getTime() !== d.getTime()) {
			d = new Date(limit.getFullYear(), limit.getMonth(), limit.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
			d = clamp(d, min2, max2);
		}

		return d;
	}

	let browseDate = value ? cloneDate(value) : cloneDate(clampDate(defaultDate, min, max));

	function setBrowseDate(value2) {
		if (browseDate.getTime() !== value2?.getTime()) {
			browseDate = value2 ? cloneDate(value2) : browseDate;
		}
	}

	let years = getYears(min, max);

	function getYears(min2, max2) {
		let years2 = [];

		for (let i = min2.getFullYear(); i <= max2.getFullYear(); i++) {
			years2.push(i);
		}

		return years2;
	}

	let locale = fallback($$props["locale"], () => ({}), true);
	let browseWithoutSelecting = fallback($$props["browseWithoutSelecting"], false);

	function dayIsInRange(calendarDay, min2, max2) {
		const date = new Date(calendarDay.year, calendarDay.month, calendarDay.number);
		const minDate = new Date(min2.getFullYear(), min2.getMonth(), min2.getDate());
		const maxDate = new Date(max2.getFullYear(), max2.getMonth(), max2.getDate());

		return date >= minDate && date <= maxDate;
	}

	if (value && value > max) {
		setValue(max);
	} else if (value && value < min) {
		setValue(min);
	}

	setBrowseDate(value);
	years = getYears(min, max);
	iLocale = getInnerLocale(locale);
	browseYear = browseDate.getFullYear();
	browseMonth = browseDate.getMonth();
	calendarDays = getCalendarDays(browseDate, iLocale.weekStartsOn);

	let $$settled = true;
	let $$inner_payload;

	function $$render_inner($$payload) {
		const each_array = ensure_array_like(iLocale.months);
		const each_array_1 = ensure_array_like(iLocale.months);
		const each_array_2 = ensure_array_like(years);
		const each_array_3 = ensure_array_like(years);
		const each_array_4 = ensure_array_like(Array(7));
		const each_array_5 = ensure_array_like(Array(6));

		$$payload.out += `<div class="date-time-picker svelte-w239uu" tabindex="0"><div class="tab-container svelte-w239uu" tabindex="-1"><div class="top svelte-w239uu"><button type="button" aria-label="Previous month" class="page-button svelte-w239uu" tabindex="-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="svelte-w239uu"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" transform="rotate(180, 12, 12)"></path></svg></button> <div class="dropdown month svelte-w239uu"><select class="svelte-w239uu"><!--[-->`;

		for (let i = 0, $$length = each_array.length; i < $$length; i++) {
			let monthName = each_array[i];

			$$payload.out += `<option${attr("disabled", new Date(browseYear, i, getMonthLength(browseYear, i), 23, 59, 59, 999) < min || new Date(browseYear, i) > max, true)}${attr("value", i)}>${escape_html(monthName)}</option>`;
		}

		$$payload.out += `<!--]--></select> <select class="dummy-select svelte-w239uu" tabindex="-1"><!--[-->`;

		for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
			let monthName = each_array_1[i];

			$$payload.out += `<option${attr("value", i)}${attr("selected", i === browseMonth, true)}>${escape_html(monthName)}</option>`;
		}

		$$payload.out += `<!--]--></select> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="svelte-w239uu"><path d="M6 0l12 12-12 12z" transform="rotate(90, 12, 12)"></path></svg></div> <div class="dropdown year svelte-w239uu"><select class="svelte-w239uu"><!--[-->`;

		for (let $$index_2 = 0,
			$$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
			let v = each_array_2[$$index_2];

			$$payload.out += `<option${attr("value", v)}>${escape_html(v)}</option>`;
		}

		$$payload.out += `<!--]--></select> <select class="dummy-select svelte-w239uu" tabindex="-1"><!--[-->`;

		for (let $$index_3 = 0,
			$$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
			let v = each_array_3[$$index_3];

			$$payload.out += `<option${attr("value", v)}${attr("selected", v === browseDate.getFullYear(), true)}>${escape_html(v)}</option>`;
		}

		$$payload.out += `<!--]--></select> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="svelte-w239uu"><path d="M6 0l12 12-12 12z" transform="rotate(90, 12, 12)"></path></svg></div> <button type="button" aria-label="Next month" class="page-button svelte-w239uu" tabindex="-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="svelte-w239uu"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"></path></svg></button></div> <div class="header svelte-w239uu"><!--[-->`;

		for (let i = 0, $$length = each_array_4.length; i < $$length; i++) {
			each_array_4[i];

			if (i + iLocale.weekStartsOn < 7) {
				$$payload.out += "<!--[-->";
				$$payload.out += `<div class="header-cell svelte-w239uu">${escape_html(iLocale.weekdays[iLocale.weekStartsOn + i])}</div>`;
			} else {
				$$payload.out += "<!--[!-->";
				$$payload.out += `<div class="header-cell svelte-w239uu">${escape_html(iLocale.weekdays[iLocale.weekStartsOn + i - 7])}</div>`;
			}

			$$payload.out += `<!--]-->`;
		}

		$$payload.out += `<!--]--></div> <!--[-->`;

		for (let weekIndex = 0,
			$$length = each_array_5.length; weekIndex < $$length; weekIndex++) {
			each_array_5[weekIndex];
			const each_array_6 = ensure_array_like(calendarDays.slice(weekIndex * 7, weekIndex * 7 + 7));

			$$payload.out += `<div class="week svelte-w239uu"><!--[-->`;

			for (let $$index_5 = 0,
				$$length = each_array_6.length; $$index_5 < $$length; $$index_5++) {
				let calendarDay = each_array_6[$$index_5];

				$$payload.out += `<div${attr("class", `cell svelte-w239uu ${stringify([
					!dayIsInRange(calendarDay, min, max) ? "disabled" : "",
					value && calendarDay.year === value.getFullYear() && calendarDay.month === value.getMonth() && calendarDay.number === value.getDate() ? "selected" : "",
					calendarDay.year === todayDate.getFullYear() && calendarDay.month === todayDate.getMonth() && calendarDay.number === todayDate.getDate() ? "today" : "",
					calendarDay.month !== browseMonth ? "other-month" : ""
				].filter(Boolean).join(" "))}`)}><span class="svelte-w239uu">${escape_html(calendarDay.number)}</span></div>`;
			}

			$$payload.out += `<!--]--></div>`;
		}

		$$payload.out += `<!--]--> `;

		TimePicker($$payload, {
			timePrecision,
			get browseDate() {
				return browseDate;
			},
			set browseDate($$value) {
				browseDate = $$value;
				$$settled = false;
			},
			setTime
		});

		$$payload.out += `<!----> <!---->`;
		slot($$payload, $$props, "default", {});
		$$payload.out += `<!----></div></div>`;
	}
	do {
		$$settled = true;
		$$inner_payload = copy_payload($$payload);
		$$render_inner($$inner_payload);
	} while (!$$settled);

	assign_payload($$payload, $$inner_payload);

	bind_props($$props, {
		value,
		timePrecision,
		min,
		max,
		locale,
		browseWithoutSelecting
	});

	pop();
}

export { DatePicker as D, getMonthLength as a, getInnerLocale as g, localeFromDateFnsLocale as l, toText as t };
