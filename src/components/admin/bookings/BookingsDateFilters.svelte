<script lang="ts">
  import { DateInput, localeFromDateFnsLocale } from "date-picker-svelte";
  import { updateRoute } from "../../../utils/filter";
  import { es } from "date-fns/locale";

  type Props = {
    date: Date | null;
  };

  let { date }: Props = $props();

  let locale = localeFromDateFnsLocale(es);

  function handleAllBookings() {
    const url = new URL(window.location.href);
    const newUrl = updateRoute(url, {
      date: "",
      page: "1",
    });

    window.location.href = newUrl;
  }

  function handleApply() {
    if (!date) return;

    const url = new URL(window.location.href);
    const newUrl = updateRoute(url, {
      date: date.toISOString().split("T")[0],
      page: "1",
    });

    window.location.href = newUrl;
  }
</script>

<div>
  <div class="date-input">
    <DateInput bind:value={date} format={"dd-MM-yyyy"} {locale} />
    <button onclick={handleApply}>Aplicar</button>
  </div>
  <button class="reset-button" onclick={handleAllBookings}>
    Limpiar Filtros
  </button>
</div>

<style>
  button {
    background-color: #47a04c;
    color: white;
    font-weight: 700;
    font-size: 1rem;
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
  }

  div {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .reset-button {
    margin-left: auto;
    text-wrap: nowrap;
  }
</style>
