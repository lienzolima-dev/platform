<script lang="ts">
  import { DateFormatter } from "@internationalized/date";
  import DatePicker from "../../global/form/DatePicker.svelte";
  import { actions } from "astro:actions";

  type Props = {
    date: Date;
    startTime: string;
    endTime: string;
  };

  const df = new DateFormatter("es-PE", {
    dateStyle: "long",
  });

  let {
    date = $bindable(),
    startTime = $bindable(),
    endTime = $bindable(),
  }: Props = $props();

  type CurrentBooking = {
    startTime: string;
    endTime: string;
    manicurist: string;
    name: string;
    state: string;
  };

  let currentBookings: CurrentBooking[] | null = $state(null);

  function formatTimeFromDate(date: Date) {
    const timeString = date.toLocaleTimeString("es-PE", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return timeString;
  }

  function getStateFromPaymentStatus(status: string) {
    if (status === "advance") return "Adelantado";
    if (status === "full") return "Pago completo";
    if (status === "partial") return "Pago parcial";
    if (status === "none") return "Sin pagar";
  }

  $effect(() => {
    const currentDate = date;

    async function updateCurrentBookings() {
      const { data } = await actions.db.bookings.get({
        date: currentDate.toISOString(),
      });

      if (data) {
        currentBookings = data.map((booking) => ({
          startTime: formatTimeFromDate(new Date(booking.startTime)),
          endTime: formatTimeFromDate(new Date(booking.endTime)),
          manicurist: booking.manicurist,
          name: booking.name,
          state: booking.paymentStatus,
        }));
      }
    }

    updateCurrentBookings();
  });
</script>

<section>
  <h2>Fecha y Hora:</h2>
  <div class="current-times-container">
    <div class="date-picker">
      <label for="date">Selecciona un día:</label>
      <DatePicker bind:date />
    </div>
    <div class="current-bookings">
      <h3>Horarios usados el <em>{df.format(date)}</em>:</h3>
      <div class="current-bookings-list">
        <div class="table-head">
          <div>Horario Usado</div>
          <div>Manicurista</div>
          <div>Cliente</div>
          <div>Estado</div>
        </div>
        <div class="table-body">
          {#if currentBookings && currentBookings.length > 0}
            {#each currentBookings as booking}
              <div class="table-row">
                <div>
                  {booking.startTime} - {booking.endTime}
                </div>
                <div>{booking.manicurist}</div>
                <div>{booking.name}</div>
                <div>{getStateFromPaymentStatus(booking.state)}</div>
              </div>
            {/each}
          {:else}
            <div class="void-table-row">No hay horarios usados</div>
          {/if}
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
        step="60"
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
        step="60"
        required
      />
    </div>
  </div>
</section>

<style>
  .current-times-container {
    display: flex;
    flex-wrap: wrap;
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
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .current-bookings-list {
    width: 100%;
    background-color: #ffffff;
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
    text-wrap: nowrap;
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

  .void-table-row {
    padding: 1rem;
    text-align: center;
    background-color: #ffffff;
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

  @media only screen and (max-width: 768px) {
    .current-bookings-list {
      width: 80vw;
      max-width: 100%;
      margin: 0 auto;
      overflow-x: scroll;
    }
  }

  @media only screen and (max-width: 495px) {
    .table-head {
      width: min-content;
    }

    .table-body {
      width: min-content;
    }

    .void-table-row {
      width: 100%;
    }

    .table-row {
      width: 100%;
    }
  }
</style>
