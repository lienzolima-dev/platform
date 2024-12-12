import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as addAttribute, d as renderComponent } from '../chunks/astro/server_JOKs7Agn.mjs';
import { $ as $$Navbar, a as $$Footer, b as $$BaseLayout } from '../chunks/Footer_CUvcjclc.mjs';
import 'clsx';
import { s as serviceOptions, a as complaintOptions } from '../chunks/complaints_DeMGL233.mjs';
/* empty css                                             */
import { $ as $$Dialog } from '../chunks/Dialog_B82jr3Av.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_BpdHmnqV.mjs';

const $$ComplaintsBook = createComponent(async ($$result, $$props, $$slots) => {
  const complaintOptionsMap = {
    claim: "Reclamo",
    complaint: "Queja"
  };
  return renderTemplate`${maybeRenderHead()}<section class="container" data-astro-cid-llq7ydrh> <h2 class="title" data-astro-cid-llq7ydrh>Libro de Reclamos</h2> <form id="complaint-form" data-astro-cid-llq7ydrh> <div class="form-grid" data-astro-cid-llq7ydrh> <div class="form-group" data-astro-cid-llq7ydrh> <input type="date" id="date" name="date" required data-astro-cid-llq7ydrh> <label for="date" data-astro-cid-llq7ydrh>Fecha de reclamo o queja</label> </div> <div class="form-group" data-astro-cid-llq7ydrh> <input type="text" id="fullName" name="fullName" required data-astro-cid-llq7ydrh> <label for="fullName" data-astro-cid-llq7ydrh>Nombres y Apellidos</label> </div> <div class="form-group" data-astro-cid-llq7ydrh> <input type="text" id="dni" name="dni" required data-astro-cid-llq7ydrh> <label for="dni" data-astro-cid-llq7ydrh>DNI</label> </div> <div class="form-group" data-astro-cid-llq7ydrh> <input type="email" id="email" name="email" required data-astro-cid-llq7ydrh> <label for="email" data-astro-cid-llq7ydrh>Correo Electrónico</label> </div> <div class="form-group" data-astro-cid-llq7ydrh> <input type="tel" id="phone" name="phone" required data-astro-cid-llq7ydrh> <label for="phone" data-astro-cid-llq7ydrh>Teléfono</label> </div> </div> <div class="form-group" data-astro-cid-llq7ydrh> <select id="service" name="service" required data-astro-cid-llq7ydrh> <option value="" selected data-astro-cid-llq7ydrh>Selecciona un servicio</option> ${serviceOptions.map((option) => renderTemplate`<option${addAttribute(option, "value")} data-astro-cid-llq7ydrh>${option}</option>`)} </select> <label class="s-label" data-astro-cid-llq7ydrh>Identificación del servicio adquirido</label> </div> <div class="form-group" data-astro-cid-llq7ydrh> <textarea id="serviceDescription" name="serviceDescription" rows="4" required data-astro-cid-llq7ydrh></textarea> <label for="serviceDescription" data-astro-cid-llq7ydrh>Descripción</label> </div> <div class="rg-group" data-astro-cid-llq7ydrh> <label class="rg-label" data-astro-cid-llq7ydrh>Detalle de reclamación</label> <div class="radio-group" data-astro-cid-llq7ydrh> ${complaintOptions.map((option) => renderTemplate`<label${addAttribute(option, "for")} data-astro-cid-llq7ydrh> <input type="radio" name="complaintOption"${addAttribute(option, "value")} required data-astro-cid-llq7ydrh> ${complaintOptionsMap[option]} </label>`)} </div> </div> <div class="form-group" data-astro-cid-llq7ydrh> <textarea id="complaintDescription" name="complaintDescription" rows="4" required data-astro-cid-llq7ydrh></textarea> <label for="complaintDescription" data-astro-cid-llq7ydrh>Detalle</label> </div> <div class="form-group" data-astro-cid-llq7ydrh> <textarea id="adicionalInfo" name="adicionalInfo" rows="4" data-astro-cid-llq7ydrh></textarea> <label for="adicionalInfo" data-astro-cid-llq7ydrh>Información Adicional</label> </div> <p id="error-content" data-astro-cid-llq7ydrh></p> <button type="submit" id="complaint-submit-btn" class="btn" data-astro-cid-llq7ydrh>Enviar</button> </form> </section>  `;
}, "/home/runner/work/platform/platform/src/components/landing/complaintsBook/ComplaintsBook.astro", void 0);

const $$SuccessfulComplaintPopup = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "successful-complaint-popup", "successful-complaint-popup", { "data-astro-cid-hjmcfs4l": true }, { "default": () => renderTemplate` ${renderComponent($$result, "Dialog", $$Dialog, { "id": "successful-complaint-popup", "data-astro-cid-hjmcfs4l": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div data-astro-cid-hjmcfs4l> <h2 data-astro-cid-hjmcfs4l>El reclamo ha sido registrado</h2> <p data-astro-cid-hjmcfs4l>
El reclamo ha sido registrado con éxito. Se ha enviado un correo de
        confirmación.
</p> <button class="accept-button" data-astro-cid-hjmcfs4l>Aceptar</button> </div> ` })} ` })}  `;
}, "/home/runner/work/platform/platform/src/components/landing/complaintsBook/SuccessfulComplaintPopup.astro", void 0);

const $$LibroDeReclamos = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Lienzo Lima" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="wrapper"> ${renderComponent($$result2, "ComplaintsBook", $$ComplaintsBook, {})} ${renderComponent($$result2, "SuccessfulComplaintPopup", $$SuccessfulComplaintPopup, {})} </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/home/runner/work/platform/platform/src/pages/libro-de-reclamos.astro", void 0);

const $$file = "/home/runner/work/platform/platform/src/pages/libro-de-reclamos.astro";
const $$url = "/libro-de-reclamos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$LibroDeReclamos,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
