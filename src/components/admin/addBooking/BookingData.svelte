<script lang="ts">
  import SimpleSelect from "./SimpleSelect.svelte";
  import StackableSelect from "./StackableSelect.svelte";
  import type { SelectOption } from "../../global/form/types";
  import type { paymentStatuses } from "../../../db/schemas/bookings";

  type Props = {
    selectedManicurist: string;
    selectedPayingState: (typeof paymentStatuses)[number] | "";
    selectedServices: string[];
    selectedExtras: string[];
    totalPrice: number | null;
    advanceAmount: number | null;
    manicuristsOptions: SelectOption[];
    servicesOptions: SelectOption[];
    extrasOptions: SelectOption[];
  };

  let {
    selectedManicurist = $bindable(""),
    selectedPayingState = $bindable(""),
    selectedServices = $bindable([""]),
    selectedExtras = $bindable([""]),
    totalPrice = $bindable(null),
    advanceAmount = $bindable(null),
    manicuristsOptions,
    servicesOptions,
    extrasOptions,
  }: Props = $props();

  let payingStates: {
    value: (typeof paymentStatuses)[number];
    label: string;
  }[] = [
    { value: "full", label: "Pago Completo" },
    { value: "advance", label: "Adelanto" },
    { value: "partial", label: "Pago Parcial" },
    { value: "none", label: "No Pago" },
  ];

  function isPartialPayment() {
    return (
      selectedPayingState === "partial" || selectedPayingState === "advance"
    );
  }
</script>

<section>
  <h2>Datos de la reserva:</h2>
  <div class="booking-data">
    <div class="input-container">
      <label for="service">Servicio:</label>
      <StackableSelect
        options={servicesOptions}
        noOptionText="Seleccion un servicio"
        bind:values={selectedServices}
        required
      />
    </div>

    <div class="input-container">
      <label for="extra">Adicional:</label>
      <StackableSelect
        options={extrasOptions}
        noOptionText="Selecciona un adicional"
        bind:values={selectedExtras}
      />
    </div>

    <div class="input-container">
      <label for="manicurist">Manicurista:</label>
      <SimpleSelect
        options={manicuristsOptions}
        noOptionText="Selecciona un manicurista"
        bind:value={selectedManicurist}
        required
      />
    </div>

    <div class="input-container">
      <label for="paying-state">Estado del Pago:</label>

      <div class="flex">
        <SimpleSelect
          options={payingStates}
          noOptionText="Selecciona un estado"
          bind:value={selectedPayingState}
          required
        />
        <input
          type="number"
          required={isPartialPayment()}
          disabled={!isPartialPayment()}
          bind:value={advanceAmount}
          placeholder="Ingrese el monto"
        />
      </div>
    </div>

    <div class="input-container">
      <label for="price">Precio Total:</label>
      <input
        type="number"
        id="price"
        name="price"
        bind:value={totalPrice}
        placeholder="Ingrese el precio total"
        required
      />
    </div>
  </div>
</section>

<style>
  section {
    border: 1px solid #e0e0e0;
    background-color: rgb(243, 243, 243);
    padding: 1rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  input {
    min-width: auto;
    width: 100%;
  }

  h2 {
    font-size: 1.5rem;
  }

  .booking-data {
    display: grid;
    grid-template-columns: repeat(2, minmax(100px, 1fr));
    gap: 1rem;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .flex {
    display: flex;
    gap: 0.5rem;
  }

  @media only screen and (max-width: 768px) {
    .booking-data {
      grid-template-columns: 1fr;
    }
  }
</style>
