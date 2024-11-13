<script lang="ts">
  import DatePicker from "../../global/form/DatePicker.svelte";

  let date = new Date();
</script>

<p>Date: {date}</p>
<DatePicker bind:date />
