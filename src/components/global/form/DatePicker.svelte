<script lang="ts">
  import CalendarIcon from "lucide-svelte/icons/calendar";
  import {
    DateFormatter,
    type DateValue,
    getLocalTimeZone,
  } from "@internationalized/date";
  import { cn } from "$lib/utils.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Calendar } from "$lib/components/ui/calendar/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";

  const df = new DateFormatter("es-MX", {
    dateStyle: "long",
  });

  // This is the svelte 5 syntax
  // ----------------------------
  // type Props = {
  //   date: DateValue | undefined;
  // };
  // let { date = $bindable() }: Props = $props();
  // ----------------------------

  // Use svelte 4 syntax because bits-ui throws warnings with svetle 5
  export let date: DateValue | undefined = undefined;
</script>

<Popover.Root>
  <Popover.Trigger asChild let:builder>
    <Button
      variant="outline"
      class={cn(
        "w-[280px] justify-start text-left font-normal border divide-slate-900  border-solid",
        !date && "text-muted-foreground"
      )}
      builders={[builder]}
    >
      <CalendarIcon class="mr-2 h-4 w-4" />
      {date
        ? df.format(date.toDate(getLocalTimeZone()))
        : "Selecciona una fecha"}
    </Button>
  </Popover.Trigger>
  <Popover.Content class="w-auto p-0">
    <Calendar bind:value={date} initialFocus />
  </Popover.Content>
</Popover.Root>
