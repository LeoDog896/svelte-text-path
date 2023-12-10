<script lang="ts">
	import { TextPath } from '$lib';
	const path = `M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80`;
</script>

<TextPath {path} viewBox={[0, 0, 200, 200]}>
	Hello world! This is text in a slot. It goes in an SVG, so you can <tspan fill="red">style</tspan>
	it.&nbsp;
</TextPath>
