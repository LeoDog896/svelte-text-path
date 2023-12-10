<script lang="ts">
	import { TextPath } from '$lib';
	const path = `M 0 50 L 100 50`;
    const delayFunc = () => new Promise((resolve) => setTimeout(resolve, 400));

    let dirty = Symbol();
</script>

<div>
    {#key dirty}
        <TextPath {path} viewBox={[0, 0, 100, 100]} tickFunction={delayFunc}>
            This is some text that will autofit;
        </TextPath>
    {/key}

    <button on:click={() => dirty = Symbol()}>Re-render</button>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
    }

    button {
        display: block;
    }
</style>