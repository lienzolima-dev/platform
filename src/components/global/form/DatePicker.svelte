<script lang="ts">
  import { DatePicker, localeFromDateFnsLocale } from "date-picker-svelte";
  import { es } from "date-fns/locale";

  type Props = {
    date: Date;
  };

  let { date = $bindable() }: Props = $props();

  date = new Date();

  let nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);

  let locale = localeFromDateFnsLocale(es);
</script>

<div class="date-picker">
  <DatePicker bind:value={date} max={nextYear} {locale} />
</div>

<style>
  .date-picker :global(.date-time-picker) {
    --date-picker-width: 20rem;
    --date-picker-height: 20rem;
    --date-picker-font-size: 1rem;

    width: var(--date-picker-width);
    height: var(--date-picker-height);
    font-size: var(--date-picker-font-size);
  }

  .date-picker :global(.tab-container) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .date-picker :global(.tab-container > div) {
    height: 100%;
  }

  @media only screen and (max-width: 768px) {
    .date-picker :global(.date-time-picker) {
      --date-picker-width: 16rem;
      --date-picker-height: 16rem;
      --date-picker-font-size: 1rem;

      width: var(--date-picker-width);
      height: var(--date-picker-height);
      font-size: var(--date-picker-font-size);
    }
  }
</style>
