<script lang="ts">
	import { onMount, tick } from 'svelte';

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

	let fontSize = 12;

	onMount(() => {
		// listen to when sizerParagraph's content changes
		const observer = new MutationObserver(() => correctSize(svgPath.getTotalLength(), 0));

		observer.observe(sizerParagraph, {
			childList: true,
			characterData: true,
			subtree: true
		});

		correctSize(svgPath.getTotalLength(), 0);

		return () => observer.disconnect();
	});

	function compare(a: number, b: number, epsilon: number): -1 | 0 | 1 {
		if (Math.abs(a - b) < epsilon) return 0;
		return a > b ? 1 : -1;
	}

	function correctSize(alpha: number, beta: number) {
		if (sizerParagraph.textContent?.trim().length === 0) {
			return;
		}

		if (svgPath && sizerParagraph) {
			fontSize = (alpha + beta) / 2;
			tick().then(() => {
				const comparison = compare(
					svgPath.getTotalLength(),
					sizerParagraph.getComputedTextLength(),
					0.001
				);
				const alphaBetaComparison = compare(alpha, beta, svgPath.getTotalLength() / 1_000_000);
				if (comparison !== 0 && alphaBetaComparison !== 0) {
					correctSize(
						// path length is bigger than text length - text needs to be bigger
						comparison === 1 ? alpha : fontSize,
						// path length is smaller than text length - text needs to be smaller
						comparison === -1 ? beta : fontSize
					);
				}
			});
		}
	}

	$: fontSizeString = `${fontSize}px`;
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
