<script lang="ts">
    import { Bezier } from "bezier-js";

    type Point = { x: number, y: number };
    const point = (x: number, y: number): Point => ({ x, y });

    // https://stackoverflow.com/a/27863181/7589775 - cubic bezier approximation of a circle
    const k = 4 * (Math.sqrt(2) - 1) / 3;

    // by default, circle
    export let points: [a: Point, b: Point, c: Point, d?: Point][] = [
        [
            point(0, 1),
            point(k, 1),
            point(1, k),
            point(1, 0)
        ],
        [
            point(1, 0),
            point(1, -k),
            point(k, -1),
            point(0, -1)
        ],
        [
            point(0, -1),
            point(-k, -1),
            point(-1, -k),
            point(-1, 0)
        ],
        [
            point(-1, 0),
            point(-1, k),
            point(-k, 1),
            point(0, 1)
        ]
    ]

    export let text: string;
    export let scale = 200;

    $: chars = text.split("")
    $: beziers = points.map(pointSet => new Bezier(...pointSet));

    function charIndexToData(i: number, _: unknown): [Point, number] {
        const t = (i / chars.length) * beziers.length;
        const bezier = beziers[Math.floor(t)];
        return [bezier.get(t % 1), Math.atan2(bezier.derivative(t % 1).y, bezier.derivative(t % 1).x)];
    }
</script>

<!-- TODO: accessibility -->
<div class="container">
    {#each chars as char, i}
        <!-- we pass in char as a side effect -->
        {@const [point, rot] = charIndexToData(i, [char])}
        <div class="char-container">
            <p style="
                left: {point.x * scale}px;
                top: {point.y * scale}px;
                transform: rotate({rot}rad);
            ">{char}</p>
        </div>
    {/each}
</div>

<style>
    .char-container {
        position: relative;
        display: inline-block;
    }

    p {
        position: absolute;
        margin: 0;
    }
</style>