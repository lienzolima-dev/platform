<script lang="ts">
  import * as Select from "$lib/components/ui/select/index.js";
  import type { Selected } from "bits-ui";

  type Props = {
    selected: Selected<unknown> | undefined;
    selectableValues: { value: string; label: string }[];
    placeholder?: string;
    required?: boolean;
  };

  let {
    selected = $bindable(),
    selectableValues,
    placeholder = "Selecciona una opción",
    required,
  }: Props = $props();
</script>

<Select.Root {required} portal={null} bind:selected>
  <Select.Trigger class="w-[100%] border divide-slate-900  border-solid">
    <Select.Value {placeholder} />
  </Select.Trigger>
  <Select.Content>
    <Select.Group>
      {#each selectableValues as selectableValue}
        <Select.Item
          value={selectableValue.value}
          label={selectableValue.label}
        >
          {selectableValue.label}
        </Select.Item>
      {/each}
    </Select.Group>
  </Select.Content>
  <Select.Input name="favoriteFruit" />
</Select.Root>
