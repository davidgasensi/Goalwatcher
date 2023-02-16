<script>
	import { onMount } from 'svelte';
	let characterName;

    onMount(async () => {
        const response = await fetch('https://goalwatcher.davidasensi.workers.dev/leaderboard');
        const character = await response.json();
        console.log(character);
        characterName = character.points;
    });
</script>

<main>
    {#if characterName === undefined}
        Loading Character Name...
    {:else}
        {characterName}
    {/if}
</main>