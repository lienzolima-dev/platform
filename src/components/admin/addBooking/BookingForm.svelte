<script lang="ts">
  import BookingData from "./BookingData.svelte";
  import TimesData from "./TimesData.svelte";
  import UserData from "./UserData.svelte";
  import type { SelectOption } from "../../global/form/types";

  import type {
    extras as extrasTable,
    services as servicesTable,
  } from "../../../db/schema";
  import { actions, isInputError } from "astro:actions";
  import { openDialog, type DialogEvent } from "../../global/dialog/utils";
  import type { paymentStatuses } from "../../../db/schemas/bookings";

  type Props = {
    manicuristsOptions: SelectOption[];
    services: (typeof servicesTable.$inferSelect)[];
    extras: (typeof extrasTable.$inferSelect)[];
  };

  const { manicuristsOptions, services, extras }: Props = $props();

  const servicesOptions = services.map((service) => ({
    value: service.id,
    label: service.name,
  }));

  const extrasOptions = extras.map((extra) => ({
    value: extra.id,
    label: extra.name,
  }));

  let name: string = $state("");
  let email: string = $state("");
  let phone: string = $state("");

  let selectedManicurist = $state("");
  let selectedPayingState: (typeof paymentStatuses)[number] | "" = $state("");
  let selectedServices: string[] = $state([""]);
  let selectedExtras: string[] = $state([""]);
  let totalPrice: number | null = $state(null);
  let advanceAmount: number | null = $state(null);

  let date = $state(new Date());
  let startTime = $state("");
  let endTime = $state("");

  let errorMessage: string = $state("");

  function validateTimeInputs() {
    // In some browses the input string could be 12:00:00 instead of 12:00
    // So we need to remove the seconds
    startTime = startTime.slice(0, 5);
    endTime = endTime.slice(0, 5);
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();
    if (!totalPrice) {
      errorMessage = "Ingrese un precio total";
      return;
    }

    if (!advanceAmount) {
      advanceAmount = 0;
    }

    if (selectedPayingState === "") {
      errorMessage = "Seleccione un estado de pago";
      return;
    }

    validateTimeInputs();

    const dataToSend = {
      name,
      email,
      phone,
      manicuristId: selectedManicurist,
      paymentStatus: selectedPayingState,
      services: selectedServices,
      extras: selectedExtras,
      totalPrice,
      advanceAmount,
      date: date.toISOString(),
      startTime,
      endTime,
    };

    const { error } = await actions.db.bookings.add({ ...dataToSend });

    errorMessage = "";
    if (error) {
      if (isInputError(error)) {
        errorMessage = error.issues[0].message;
        return;
      }

      errorMessage = error.message;
      return;
    }

    openDialog("successful-booking-popup");
  }

  $effect(() => {
    // Reload page after successful booking
    document.addEventListener("dialog-close", (event: DialogEvent) => {
      if (event.detail.id === "successful-booking-popup") {
        location.reload();
      }
    });
  });
</script>

<div class="booking-form-container">
  <form onsubmit={handleSubmit}>
    <UserData bind:name bind:email bind:phone />
    <BookingData
      bind:selectedManicurist
      bind:selectedPayingState
      bind:selectedServices
      bind:selectedExtras
      bind:totalPrice
      bind:advanceAmount
      {manicuristsOptions}
      {servicesOptions}
      {extrasOptions}
    />
    <TimesData bind:date bind:startTime bind:endTime />
    {#if errorMessage !== ""}
      <div class="error-content">Ha ocurrido un error: {errorMessage}</div>
    {/if}
    <button type="submit">Reservar</button>
  </form>
</div>

<style>
  form {
    width: 100%;
    max-width: none;
  }

  .booking-form-container {
    color: #1f1f1f;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #1f1f1f;
    color: white;
    border: none;
    border-radius: 100px;
    cursor: pointer;
  }

  button:hover {
    background-color: #333;
  }

  .error-content {
    padding: 1rem;
    width: 100%;
    background-color: rgb(255, 183, 183);
    border-radius: 0.5rem;
    text-align: center;
  }
</style>
