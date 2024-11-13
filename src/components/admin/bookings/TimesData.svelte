<script lang="ts">
  import { DateFormatter } from "@internationalized/date";
  import DatePicker from "../../global/form/DatePicker.svelte";

  type Props = {
    date: Date;
    startTime: string;
    endTime: string;
  };

  const df = new DateFormatter("es-MX", {
    dateStyle: "long",
  });

  let {
    date = $bindable(),
    startTime = $bindable(),
    endTime = $bindable(),
  }: Props = $props();
</script>

<section>
  <h2>Fecha y Hora:</h2>
  <div class="current-times-container">
    <div class="date-picker">
      <label for="date">Selecciona un día:</label>
      <DatePicker bind:date />
    </div>
    <div class="current-bookings">
      <!-- This sections shows the current bookings times that are used -->
      <h3>Horarios Usados el {df.format(date)}:</h3>
      <div class="current-bookings-list">
        <div class="table-head">
          <div>Horario Usado</div>
          <div>Manicurista</div>
          <div>Nombre</div>
          <div>Estado</div>
        </div>
        <div class="table-body">
          <div class="table-row">
            <div>
              <!-- {booking.startTime} - {booking.endTime} -->
              12:00 - 13:00
            </div>
            <div>Manicurist</div>
            <div>Pedro</div>
            <div>Estado</div>
          </div>
          <div class="table-row">
            <div>
              <!-- {booking.startTime} - {booking.endTime} -->
              12:00 - 13:00
            </div>
            <div>Manicurist</div>
            <div>Ruperta</div>
            <div>Estado</div>
          </div>
          <div class="table-row">
            <div>
              <!-- {booking.startTime} - {booking.endTime} -->
              12:00 - 13:00
            </div>
            <div>Manicurist</div>
            <div>Juana</div>
            <div>Estado</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="time-inputs">
    <div class="input-container">
      <label for="start-time">Inicio:</label>
      <input
        bind:value={startTime}
        type="time"
        id="start-time"
        name="startTime"
        required
      />
    </div>
    <div class="input-container">
      <label for="end-time">Final:</label>
      <input
        bind:value={endTime}
        type="time"
        id="end-time"
        name="endTime"
        required
      />
    </div>
  </div>
</section>

<style>
  .current-times-container {
    display: flex;
    gap: 1.5rem;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .time-inputs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .current-bookings {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .current-bookings-list {
    border-radius: 8px;
    overflow: hidden;
  }

  .table-head {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    padding: 0.5rem;
    background-color: #494949;
    color: white;
    font-weight: bold;
    border-bottom: 2px solid #ddd;
  }

  .table-head div {
    text-align: center;
  }

  .table-body {
    display: flex;
    flex-direction: column;
  }

  .table-row {
    background-color: #ffffff;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    padding: 1rem;
    border-bottom: 1px solid #eee;
    transition: background-color 0.2s;
  }

  .table-row div {
    text-align: center;
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

  h3 {
    font-size: 1.25rem;
  }

  input {
    padding: 0.5rem 1rem;
  }
</style>
