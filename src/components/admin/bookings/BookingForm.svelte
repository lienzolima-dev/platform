<script lang="ts">
  import type { DateValue } from "@internationalized/date";
  import DatePicker from "../../global/form/DatePicker.svelte";
  import Input from "../../../components/ui/input/input.svelte";
  import Label from "../../../components/ui/label/label.svelte";
  import Select from "../../../components/global/form/Select.svelte";
  import type { Selected } from "bits-ui";

  const mockSelectValues = [
    { value: "system1", label: "system1" },
    { value: "system2", label: "system2" },
  ];

  let date: DateValue | undefined = $state(undefined);
  let selectedSystem: Selected<unknown> | undefined = $state(undefined);
</script>

<form>
  <div class="input-container">
    <Label for="email">Email</Label>
    <Input type="email" id="email" required />
  </div>
  <div class="input-container">
    <Label>Sistema</Label>
    <Select
      selectableValues={mockSelectValues}
      bind:selected={selectedSystem}
    />
  </div>
  <div class="input-container">
    <Label>Adicional</Label>
    <Select
      selectableValues={mockSelectValues}
      bind:selected={selectedSystem}
    />
  </div>
  <div class="input-container">
    <Label for="price">Costo</Label>
    <Input type="number" id="price" required />
  </div>
  <div class="input-container">
    <Label for="manicurist">Manicurista</Label>
    <Select
      selectableValues={mockSelectValues}
      bind:selected={selectedSystem}
    />
  </div>
  <div class="time-input">
    <Label>Hora</Label>
    <div class="input-container">
      <Input type="number" required />
    </div>
    <span> : </span>
    <div class="input-container">
      <Input type="number" required />
    </div>
  </div>
  <div class="input-container">
    <Label>Día</Label>
    <DatePicker bind:date />
  </div>
  <div class="input-container">
    <Label for="payment">Pago</Label>
    <Select
      selectableValues={mockSelectValues}
      bind:selected={selectedSystem}
    />
  </div>
</form>

<h2>{date}</h2>
<h2>{selectedSystem?.value}</h2>
