<script lang="ts">
  import type { DateValue } from "@internationalized/date";
  import DatePicker from "../../global/form/DatePicker.svelte";
  import Input from "../../../components/ui/input/input.svelte";
  import Label from "../../../components/ui/label/label.svelte";
  import Select from "../../../components/global/form/Select.svelte";
  import Button from "../../../components/ui/button/button.svelte";
  import type { Selected } from "bits-ui";

  // This should be taken from the dab
  const mockSystems = [
    { value: "system1", label: "system1" },
    { value: "system2", label: "system2" },
  ];

  // This should be taken from the dab
  const mockExtras = [
    { value: "extra1", label: "extra1" },
    { value: "extra2", label: "extra2" },
  ];

  // This should be taken from the dab
  const mockManicurits = [
    { value: "manicurist1", label: "manicurist1" },
    { value: "manicurist2", label: "manicurist2" },
  ];

  // This should be taken from the dab
  const paymentsTypes = [
    { value: "advance", label: "Adelanto" },
    { value: "full", label: "Pago completo" },
    { value: "partial", label: "Pago Parcial" },
    { value: "none", label: "Sin Adelanto" },
  ];

  let date: DateValue | undefined = $state(undefined);
  let selectedSystem: Selected<unknown> | undefined = $state(undefined);
  let selectedExtra: Selected<unknown> | undefined = $state(undefined);
  let selectedManicurist: Selected<unknown> | undefined = $state(undefined);
  let selectedPayment: Selected<unknown> | undefined = $state(undefined);
</script>

<form>
  <div class="left">
    <div class="input-container">
      <Label for="email">Email</Label>
      <Input type="email" id="email" required />
    </div>
    <div class="input-container">
      <Label>Sistema</Label>
      <Select selectableValues={mockSystems} bind:selected={selectedSystem} />
    </div>
    <div class="input-container">
      <Label>Adicional</Label>
      <Select selectableValues={mockExtras} bind:selected={selectedExtra} />
    </div>
  </div>
  <div class="right">
    <div class="input-container">
      <Label for="price">Costo Total</Label>
      <Input type="number" id="price" />
    </div>
    <div class="input-container">
      <Label for="manicurist">Manicurista</Label>
      <Select
        selectableValues={mockManicurits}
        bind:selected={selectedManicurist}
      />
    </div>
    <div class="time-input">
      <Label style="text-wrap: nowrap;">Hora Inicio</Label>
      <div class="input-container">
        <Input type="number" max="24" min="0" required />
      </div>
      <span> : </span>
      <div class="input-container">
        <Input type="number" max="60" min="0" required />
      </div>
    </div>
    <div class="time-input">
      <Label style="text-wrap: nowrap;">Hora Final</Label>
      <div class="input-container">
        <Input type="number" max="24" min="0" required />
      </div>
      <span> : </span>
      <div class="input-container">
        <Input type="number" max="60" min="0" required />
      </div>
    </div>
    <div class="input-container">
      <Label>Día</Label>
      <DatePicker bind:date />
    </div>
    <div class="input-container">
      <Label for="payment">Pago</Label>
      <div class="payment-inputs">
        <Select
          selectableValues={paymentsTypes}
          bind:selected={selectedPayment}
        />
        <Input type="number" id="payment" required />
      </div>
    </div>
    <Button type="submit">Guardar</Button>
  </div>
</form>

<!-- <h1>
  {JSON.stringify({
    date,
    selectedSystem,
    selectedExtra,
    selectedManicurist,
    selectedPayment,
  })}
</h1> -->

<style>
  form {
    max-width: unset;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 2rem;
  }

  .left {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .right {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .time-input {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .payment-inputs {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }
</style>
