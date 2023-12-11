<script lang="ts">
	import TextPath from './TextPath.svelte';

	function polarToCartesian(centerX: number, centerY: number, radius: number, angle: number) {
		return [
			centerX + radius * Math.cos(angle === 0 ? 0.00001 : angle),
			centerY + radius * Math.sin(angle === 0 ? 0.00001 : angle)
		];
	}

	function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
		const start = polarToCartesian(x, y, radius, endAngle);
		const end = polarToCartesian(x, y, radius, startAngle);

		const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1;

		return ['M', ...start, 'A', radius, radius, 0, largeArcFlag, 0, ...end].join(' ');
	}

	export let range: [number, number] = [0, 1];

	$: path = describeArc(100, 100, 100, range[0] * Math.PI * 2, range[1] * Math.PI * 2);
</script>

<TextPath {path} viewBox={[0, 0, 200, 200]}>
	<slot />
</TextPath>
