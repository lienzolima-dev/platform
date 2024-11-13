<script lang="ts">
  type Props = {
    options: { value: string; text: string }[];
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
    <option value={option.value}>{option.text}</option>
  {/each}
</select>

<style>
  select {
    width: 100%;
    padding: 0.5rem 1rem;
  }
</style>
