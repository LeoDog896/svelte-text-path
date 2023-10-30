<script lang="ts">
    export let text: string;
    export let start: number;
    export let end: number;
    export let shift: number;

    $: chars = text.split("")
</script>

<p>
    {#each chars as char}
        <pre>{char}</pre>
    {/each}
</p>