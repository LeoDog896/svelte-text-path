<script lang="ts">
	import { Circle } from '$lib';
	import { placeholder } from '../placeholder';
	let text = placeholder;
</script>

<input type="text" bind:value={text} />

<Circle>{@html text}</Circle>
