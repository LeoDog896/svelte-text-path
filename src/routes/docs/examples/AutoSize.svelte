<script lang="ts">
	import { TextPath } from '$lib';
	const path = `M 0 50 L 100 50`;
	const delayFunc = () => new Promise((resolve) => setTimeout(resolve, 400));

	let dirty = Symbol();

	let fontSize: number | undefined = undefined;
</script>

<div>
	{#key dirty}
		<TextPath
			{path}
			viewBox={[0, 0, 100, 100]}
			tickFunction={delayFunc}
			on:fontSize={(e) => (fontSize = e.detail)}
		>
			This is some text that will autofit;
		</TextPath>
	{/key}

	<p>
		<button on:click={() => (dirty = Symbol())}>Re-render</button> | font size:
		<code>{fontSize}</code>
	</p>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 1rem;
	}
</style>
