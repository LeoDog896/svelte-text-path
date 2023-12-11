<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	export let path: string;
	export let viewBox: [number, number, number, number];
	export let padding = 0.1;

	$: viewBoxWidth = viewBox[2] - viewBox[0];
	$: viewBoxHeight = viewBox[3] - viewBox[1];

	$: calculatedViewBox = [
		viewBox[0] - padding * viewBoxWidth,
		viewBox[1] - padding * viewBoxHeight,
		viewBox[2] + padding * viewBoxWidth * 2,
		viewBox[3] + padding * viewBoxHeight * 2
	];

	const uuid = crypto.randomUUID();

	let sizerParagraph: SVGTextElement;
	let svgPath: SVGPathElement;

	export let fontSize: number | undefined = undefined;
	export let tickFunction: () => Promise<unknown> = tick;

	let calculatedFontSize = 12;

	const dispatch = createEventDispatcher<{
		fontSize: number;
	}>();

	$: dispatch('fontSize', calculatedFontSize);

	onMount(() => {
		// listen to when sizerParagraph's content changes
		const observer = new MutationObserver(() => (bounds = [svgPath.getTotalLength(), 0]));

		observer.observe(sizerParagraph, {
			childList: true,
			characterData: true,
			subtree: true
		});

		bounds = [svgPath.getTotalLength(), 0];

		return () => observer.disconnect();
	});

	function compare(a: number, b: number, epsilon: number): -1 | 0 | 1 {
		if (Math.abs(a - b) < epsilon) return 0;
		return a > b ? 1 : -1;
	}

	let bounds: [alpha: number, beta: number] | undefined = undefined;

	$: if (path && svgPath) {
		tick().then(() => (bounds = [svgPath.getTotalLength(), 0]));
	}
	$: if (bounds !== undefined && sizerParagraph.textContent?.trim().length !== 0) {
		if (fontSize) {
			calculatedFontSize = fontSize;
		} else if (svgPath && sizerParagraph) {
			calculatedFontSize = (bounds[0] + bounds[1]) / 2;
			const tempBounds = structuredClone(bounds);

			tickFunction().then(() => {
				if (bounds === undefined) return;
				if (tempBounds[0] !== bounds[0] || tempBounds[1] !== bounds[1]) return;

				const comparison = compare(
					svgPath.getTotalLength(),
					sizerParagraph.getComputedTextLength(),
					0.001
				);
				const alphaBetaComparison = compare(
					bounds[0],
					bounds[1],
					svgPath.getTotalLength() / 1_000_000
				);
				if (comparison !== 0 && alphaBetaComparison !== 0) {
					bounds = [
						// path length is bigger than text length - text needs to be bigger
						comparison === 1 ? bounds[0] : calculatedFontSize,
						// path length is smaller than text length - text needs to be smaller
						comparison === -1 ? bounds[1] : calculatedFontSize
					];
				}
			});
		}
	}

	$: fontSizeString = `${calculatedFontSize}px`;
</script>

<div class="container">
	<svg viewBox={calculatedViewBox.join(' ')} xmlns="http://www.w3.org/2000/svg">
		<defs>
			<path bind:this={svgPath} d={path} fill="none" id="svelteCurve-{uuid}" />
			<text font-size={fontSizeString} bind:this={sizerParagraph}>
				<slot />
			</text>
		</defs>
		<text font-size={fontSizeString}>
			<textPath lengthAdjust="spacingAndGlyphs" method="stretch" href="#svelteCurve-{uuid}">
				<slot />
			</textPath>
		</text>
	</svg>
</div>

<style>
	svg {
		width: 100%;
		height: 100%;
	}

	path {
		user-select: none;
	}
</style>
