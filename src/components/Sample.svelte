<script lang="ts">
  type Props = {
    startNumber: number;
  };

  const { startNumber }: Props = $props();

  let counter = $state(startNumber);

  function handleClick() {
    counter += 1;
  }
</script>

<h1>Svelte Sample</h1>
<h2>{counter}</h2>
<button onclick={handleClick}>Click</button>
