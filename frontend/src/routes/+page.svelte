<script lang="ts">
	import type { PageData } from "./$types";
	import { _fetchHelloWorld } from "./+page";

  // `data` is the response from the `load()` function in +page.ts 
  // In this case, it is used to pre-load the result of _fetchHelloWorld, so users don't have 
  // to wait for it when loading the page
  // https://kit.svelte.dev/docs/load
  export let data: PageData;

  // This variable gets bound to the value of the input field below. It will change whenever the value changes.
  let name: string;

  // `$:` marks a statement or code block as reactive, it reevaluates when something it depends on changes
  // https://svelte.dev/docs#component-format-script-3-$-marks-a-statement-as-reactive
  $: {
    // When `input.value` changes, query the API for the new text data, and replace it.
    _fetchHelloWorld(name).then((newData) => data = newData);
  } 
</script>

<div>
  {#if data}
    <h1>{data.text}</h1>
  {/if}

  <input type="text" bind:value={name}/>
</div>