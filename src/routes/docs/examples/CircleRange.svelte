<script lang="ts">
	import { Circle } from '$lib';

	let range: [number, number] = [0, 1];
</script>

<input type="range" min="0" max={range[1]} step="0.01" bind:value={range[0]} />

<input type="range" min={range[0]} max="1" step="0.01" bind:value={range[1]} />

<Circle {range}>
	Hello world! This is text in a slot. It goes in an SVG, so you can <tspan fill="red">style</tspan>
	it.&nbsp;
</Circle>
