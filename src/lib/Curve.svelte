<script lang="ts">
	import { Bezier, type BBox } from 'bezier-js';

	type Point = { x: number; y: number };
	const point = (x: number, y: number): Point => ({ x, y });
	const mul =
		(factor: number) =>
		(point: Point): Point => ({ x: point.x * factor, y: point.y * factor });

	// https://stackoverflow.com/a/27863181/7589775 - cubic bezier approximation of a circle
	const k = (4 * (Math.sqrt(2) - 1)) / 3;

	// by default, circle
	export let points: [a: Point, b: Point, c: Point, d?: Point][] = [
		[point(0, 1), point(k, 1), point(1, k), point(1, 0)],
		[point(1, 0), point(1, -k), point(k, -1), point(0, -1)],
		[point(0, -1), point(-k, -1), point(-1, -k), point(-1, 0)],
		[point(-1, 0), point(-1, k), point(-k, 1), point(0, 1)]
	];

	export let scale: number | 'auto' = 'auto';

	// TODO: calculate scale based on text length
	$: desiredScale = scale === 'auto' ? 100 : scale;

	const uuid = crypto.randomUUID();

	function isDefined<T>(argument: T | undefined): argument is T {
		return argument !== undefined;
	}

	function bboxMax(...bboxList: BBox[]): BBox {
		return {
			x: {
				min: Math.min(...bboxList.map((bbox) => bbox.x.min)),
				max: Math.max(...bboxList.map((bbox) => bbox.x.max))
			},
			y: {
				min: Math.min(...bboxList.map((bbox) => bbox.y.min)),
				max: Math.max(...bboxList.map((bbox) => bbox.y.max))
			}
		};
	}

	function padBBox(bbox: BBox, padding: number): BBox {
		return {
			x: {
				min: bbox.x.min - padding,
				max: bbox.x.max + padding
			},
			y: {
				min: bbox.y.min - padding,
				max: bbox.y.max + padding
			}
		};
	}

	$: bezierCurves = points.map(
		(pointSet) => new Bezier(...pointSet.filter(isDefined).map(mul(desiredScale)))
	);
	$: extrema = padBBox(bboxMax(...bezierCurves.map((bezier) => bezier.bbox())), 0.1 * desiredScale);
</script>

<div class="container">
	<svg
		viewBox="{extrema.x.min} {extrema.y.min} {extrema.x.max - extrema.x.min} {extrema.y.max -
			extrema.y.min}"
		xmlns="http://www.w3.org/2000/svg"
	>
		<defs>
			<path
				d={bezierCurves.map((bezier) => bezier.toSVG()).join(' ')}
				fill="none"
				id="svelteCurve-{uuid}"
				stroke="black"
				stroke-width="0.01"
			/>
		</defs>
		<text textLength={scale === 'auto' ? 'auto' : `${Math.PI * desiredScale * 2}px`}>
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
