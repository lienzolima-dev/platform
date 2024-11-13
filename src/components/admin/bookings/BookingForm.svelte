<script lang="ts">
  import DatePicker from "../../global/form/DatePicker.svelte";

  let date = new Date();
</script>

<div class="booking-form-container">
  <section>
    <h2>Datos del cliente:</h2>
    <div class="user-data">
      <div class="input-container">
        <label for="name">Nombre:</label>
        <input type="text" id="name" name="name" required />
      </div>

      <div class="input-container">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required />
      </div>

      <div class="input-container">
        <label for="phone">Teléfono:</label>
        <input type="tel" id="phone" name="phone" required />
      </div>
    </div>
  </section>

  <section>
    <h2>Datos de la reserva:</h2>
    <div class="booking-data">
      <div class="input-container">
        <label for="service">Servicio:</label>
        <div class="select-stack-container">
          <div class="select-stack">
            <div class="select">
              <select name="serviceId" id="service">
                <option value="" disabled selected>
                  Selecciona un servicio
                </option>
                <option value="1">Servicio 1</option>
                <option value="2">Servicio 2</option>
                <option value="3">Servicio 3</option>
              </select>
              <button>-</button>
            </div>
            <div class="select">
              <select name="serviceId" id="service">
                <option value="" disabled selected>
                  Selecciona un servicio
                </option>
                <option value="1">Servicio 1</option>
                <option value="2">Servicio 2</option>
                <option value="3">Servicio 3</option>
              </select>
              <button>-</button>
            </div>
          </div>
          <button>+</button>
        </div>
      </div>

      <div class="input-container">
        <label for="extra">Adicional:</label>
        <div class="select-stack-container">
          <div class="select-stack">
            <div class="select">
              <select name="extraId" id="extra">
                <option value="" disabled selected>
                  Selecciona un adicional
                </option>
                <option value="1">Adicional 1</option>
                <option value="2">Adicional 2</option>
                <option value="3">Adicional 3</option>
              </select>
              <button>-</button>
            </div>
            <div class="select">
              <select name="extraId" id="extra">
                <option value="" disabled selected>
                  Selecciona un adicional
                </option>
                <option value="1">Adicional 1</option>
                <option value="2">Adicional 2</option>
                <option value="3">Adicional 3</option>
              </select>
              <button>-</button>
            </div>
          </div>
          <button>+</button>
        </div>
      </div>

      <div class="input-container">
        <label for="manicurist">Manicurista:</label>
        <select name="manicuristId" id="manicurist">
          <option value="" disabled selected>Selecciona un manicurista</option>
          <option value="1">Manicurista 1</option>
          <option value="2">Manicurista 2</option>
          <option value="3">Manicurista 3</option>
        </select>
      </div>

      <div class="input-container">
        <label for="paying-state">Estado del Pago:</label>
        <select name="payingState" id="paying-state">
          <option value="" disabled selected>Selecciona un estado</option>
          <option value="1">Completo</option>
          <option value="2">Adelanto</option>
          <option value="3">Sin Adelanto</option>
        </select>
      </div>

      <div class="input-container">
        <label for="price">Precio Total:</label>
        <input type="number" id="price" name="price" required />
      </div>
    </div>
  </section>

  <section>
    <h2>Fecha y Hora:</h2>
    <div class="available-times-container">
      <div class="date-picker">
        <label for="date">Selecciona un día:</label>
        <DatePicker bind:date />
      </div>
      <div class="available-times"></div>
    </div>

    <div class="time-inputs">
      <div class="input-container">
        <label for="time">Inicio:</label>
        <input type="time" id="time" name="time" required />
      </div>
      <div class="input-container">
        <label for="time">Final:</label>
        <input type="time" id="time" name="time" required />
      </div>
    </div>
  </section>

  <button>Reservar</button>
  <!-- <p>Date: {date}</p>
  <DatePicker bind:date /> -->
</div>

<style>
  .booking-form-container {
    color: #1f1f1f;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .user-data {
    display: flex;
    gap: 1rem;
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

  .time-inputs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
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

  h2 {
    font-size: 1.5rem;
  }

  input {
    padding: 0.5rem 1rem;
  }

  select {
    width: 100%;
    padding: 0.5rem 1rem;
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
