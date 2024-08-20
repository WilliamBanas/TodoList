<script lang='ts'>
	import Header from "$lib/components/Header.svelte";

  export let data;

  const tables = data.tables;
</script>

<div class="h-full">
  <Header nickname={data.nickname} />

  {#each tables as table}
    <a href="/tables/{table.id}">{table.title}</a>
  {/each}
</div>
