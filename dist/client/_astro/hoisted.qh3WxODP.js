import"./CloseMenuButton.astro_astro_type_script_index_0_lang.nee8CeAz.js";import{a as o}from"./_astro_actions.B-cTUEzu.js";class a extends HTMLElement{connectedCallback(){const t=this.querySelector("button");if(!t)throw"Button not found";t.addEventListener("click",async()=>{const n=JSON.parse(this.dataset.taskId??"").taskId;await o.db.tasks.complete({id:n}),window.location.reload()})}}customElements.define("task-check-button",a);class i extends HTMLElement{connectedCallback(){const t=this.querySelector("button");if(!t)throw"Button not found";t.addEventListener("click",async()=>{const n=JSON.parse(this.dataset.taskId??"").taskId;await o.db.tasks.remove({id:n}),window.location.reload()})}}customElements.define("task-delete-button",i);class d extends HTMLElement{connectedCallback(){const t=this.querySelector("button");if(!t)throw"Button not found";t.addEventListener("click",async()=>{const n=JSON.parse(this.dataset.bookingId??"").bookingId;if(!n)throw"Booking ID not found";const{error:s}=await o.db.bookings.markAsFinished({bookingId:n});if(!s){location.reload();return}})}}customElements.define("next-bookings-finish-button",d);
