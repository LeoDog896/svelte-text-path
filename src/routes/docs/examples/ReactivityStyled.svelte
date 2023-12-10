<script lang="ts">
	import { Circle } from '$lib';
	import { placeholder } from '../placeholder';
	let text = placeholder;
</script>

<div>
	<input type="text" bind:value={text} />

	<Circle>{@html text}</Circle>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
	}
</style>
