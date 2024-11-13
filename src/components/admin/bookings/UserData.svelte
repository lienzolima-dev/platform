<script lang="ts">
  type Props = {
    name: string | null;
    email: string | null;
    phone: string | null;
  };

  let {
    name = $bindable(),
    email = $bindable(),
    phone = $bindable(),
  }: Props = $props();
</script>

<section>
  <h2>Datos del cliente:</h2>
  <div class="user-data">
    <div class="input-container">
      <label for="name">Nombre:</label>
      <input type="text" id="name" name="name" bind:value={name} required />
    </div>

    <div class="input-container">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" bind:value={email} required />
    </div>

    <div class="input-container">
      <label for="phone">Teléfono:</label>
      <input type="tel" id="phone" name="phone" bind:value={phone} required />
    </div>
  </div>
</section>

<style>
  h2 {
    font-size: 1.5rem;
  }

  section {
    border: 1px solid #e0e0e0;
    background-color: rgb(243, 243, 243);
    padding: 1rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .user-data {
    display: flex;
    gap: 1rem;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  input {
    padding: 0.5rem 1rem;
  }
</style>
