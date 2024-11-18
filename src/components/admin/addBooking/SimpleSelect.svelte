<script lang="ts">
  import type { SelectOption } from "../../global/form/types";

  type Props = {
    options: SelectOption[];
    noOptionText?: string;
    value: string;
    required?: boolean;
  };

  let {
    options,
    noOptionText,
    value = $bindable(),
    required,
  }: Props = $props();
</script>

<select name="manicuristId" id="manicurist" {required} bind:value>
  {#if noOptionText}
    <option value="" disabled selected>{noOptionText}</option>
  {:else}
    <option value="" disabled selected>Selecciona una opción</option>
  {/if}

  {#each options as option}
    <option value={option.value}>{option.label}</option>
  {/each}
</select>

<style>
  select {
    width: 100%;
    padding: 0.5rem 1rem;
  }
</style>
