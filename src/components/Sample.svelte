<script lang="ts">
  import type { DateValue } from "@internationalized/date";
  import DatePicker from "./global/form/DatePicker.svelte";

  let date: DateValue | undefined = $state(undefined);
</script>

<DatePicker bind:date />

<h2>{date}</h2>
