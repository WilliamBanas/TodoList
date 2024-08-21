<script lang='ts'>
	import { goto } from "$app/navigation";
	import Header from "$lib/components/Header.svelte";
	import { onMount } from "svelte";

  export let data;

  onMount(() => {
    goto('/tables');
  })

</script>

<div class="h-full">
  <Header nickname={data.nickname} />

</div>