<script lang="ts">
  import SimpleSelect from "./SimpleSelect.svelte";

  type Props = {
    options: { value: string; text: string }[];
    noOptionText?: string;
    values?: string[];
    required?: boolean;
  };

  let {
    options,
    noOptionText,
    values = $bindable([""]),
    required,
  }: Props = $props();

  function addSelect(e: Event) {
    e.preventDefault();
    values = [...values, ""];
  }

  function removeSelect(index: number) {
    if (values.length === 1) {
      values = [""];
      return;
    }
    values = values.filter((_, i) => i !== index);
  }
</script>

<div class="select-stack-container">
  <div class="select-stack">
    {#each values as _value, index}
      <div class="select">
        <SimpleSelect
          {options}
          {noOptionText}
          {required}
          bind:value={values[index]}
        />
        <button
          onclick={(e: Event) => {
            e.preventDefault();
            removeSelect(index);
          }}>-</button
        >
      </div>
    {/each}
  </div>
  <button onclick={addSelect}>+</button>
</div>

<style>
  .select {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .select-stack {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .select-stack-container {
    display: flex;
    gap: 0.5rem;
    align-items: start;
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
