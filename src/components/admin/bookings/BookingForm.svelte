<script lang="ts">
  import BookingData from "./BookingData.svelte";
  import TimesData from "./TimesData.svelte";
  import UserData from "./UserData.svelte";
  import type { SelectOption } from "../../global/form/types";

  import type {
    extras as extrasTable,
    services as servicesTable,
  } from "../../../db/schema";

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

  let name: string | null = $state("");
  let email: string | null = $state("");
  let phone: string | null = $state("");

  let selectedManicurist = $state("");
  let selectedPayingState = $state("");
  let selectedServices: string[] = $state([""]);
  let selectedExtras: string[] = $state([""]);
  let totalPrice: number | null = $state(null);

  let date = $state(new Date());
  let startTime = $state("");
  let endTime = $state("");
</script>

<!-- <pre>{JSON.stringify(
    {
      name,
      email,
      phone,
      selectedManicurist,
      selectedPayingState,
      totalPrice,
      selectedServices,
      selectedExtras,
      date,
      startTime,
      endTime,
    },
    null,
    2
  )}</pre> -->
<div class="booking-form-container">
  <form>
    <UserData bind:name bind:email bind:phone />
    <BookingData
      bind:selectedManicurist
      bind:selectedPayingState
      bind:selectedServices
      bind:selectedExtras
      bind:totalPrice
      {manicuristsOptions}
      {servicesOptions}
      {extrasOptions}
    />
    <TimesData bind:date bind:startTime bind:endTime />
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
</style>
