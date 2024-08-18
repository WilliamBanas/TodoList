<script lang="ts">
  import { AppBar, Drawer} from '@skeletonlabs/skeleton';
  import type { DrawerSettings, DrawerStore } from '@skeletonlabs/skeleton';
  import { enhance } from "$app/forms";

  export let nickname: string;

  function openDrawer() {
    
  }
</script>

<AppBar class="border-b-2 border-surface-600" >
  <h1 class="h1" slot="lead">Kanban</h1>

  <form action="/?/logout" method="POST" use:enhance slot="trail" class="flex items-center gap-6">
    <button on:click={openDrawer} >Hello {nickname} !</button>
    
    <button class="btn variant-filled">
      Se deconnecter
    </button>
  </form>
</AppBar>