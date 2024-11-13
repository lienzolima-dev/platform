<script lang="ts">
  import SimpleSelect from "./SimpleSelect.svelte";
  import StackableSelect from "./StackableSelect.svelte";

  type Props = {
    selectedManicurist: string;
    selectedPayingState: string;
    selectedServices: string[];
    selectedExtras: string[];
    totalPrice: number | null;
  };

  let {
    selectedManicurist = $bindable(""),
    selectedPayingState = $bindable(""),
    selectedServices = $bindable([""]),
    selectedExtras = $bindable([""]),
    totalPrice = $bindable(null),
  }: Props = $props();

  let manicuristOptions = [
    { value: "1", text: "Manicurista 1" },
    { value: "2", text: "Manicurista 2" },
    { value: "3", text: "Manicurista 3" },
  ];

  let payingStates = [
    { value: "full", text: "Pago Completo" },
    { value: "advance", text: "Adelanto" },
    { value: "Partial", text: "Pago Parcial" },
    { value: "none", text: "No Pago" },
  ];

  let servicesOptions = [
    { value: "1", text: "Servicio 1" },
    { value: "2", text: "Servicio 2" },
    { value: "3", text: "Servicio 3" },
  ];

  let extrasOptions = [
    { value: "1", text: "Adicional 1" },
    { value: "2", text: "Adicional 2" },
    { value: "3", text: "Adicional 3" },
  ];
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
        required
      />
    </div>

    <div class="input-container">
      <label for="manicurist">Manicurista:</label>
      <SimpleSelect
        options={manicuristOptions}
        noOptionText="Selecciona un manicurista"
        bind:value={selectedManicurist}
        required
      />
    </div>

    <div class="input-container">
      <label for="paying-state">Estado del Pago:</label>

      <SimpleSelect
        options={payingStates}
        noOptionText="Selecciona un estado"
        bind:value={selectedPayingState}
        required
      />
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

  h2 {
    font-size: 1.5rem;
  }

  .booking-data {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
</style>
