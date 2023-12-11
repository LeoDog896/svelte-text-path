<script lang="ts">
	import Highlight from 'svelte-highlight';
	import xml from 'svelte-highlight/languages/xml';
	import 'svelte-highlight/styles/github.css';

	import ReactivityText from './examples/Reactivity.svelte?raw';
	import Reactivity from './examples/ReactivityStyled.svelte';

	import CircleText from './examples/Circle.svelte?raw';
	import Circle from './examples/Circle.svelte';

	import CircleRangeText from './examples/CircleRange.svelte?raw';
	import CircleRange from './examples/CircleRange.svelte';

	import TextPathText from './examples/TextPath.svelte?raw';
	import TextPath from './examples/TextPath.svelte';

	import AutoSize from './examples/AutoSize.svelte';
</script>

<main>
	<h1># Docs</h1>

	<p>
		As mentioned in the <a href="/svelte-text-path">home demo</a>, this library is a wrapper against
		the
		<a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/textPath"
			>SVG text-path element</a
		>
		to be reactive, and, most importantly, to auto-size the text to fit the path, similar to the likes
		of
		<a href="https://github.com/STRML/textFit">textFit</a>.
	</p>

	<p>
		Feel free to contribute or file issues on
		<a href="https://github.com/LeoDog896/svelte-text-path">GitHub</a>.
	</p>

	<h2>## Installation</h2>

	<p>
		<code>svelte-text-path</code> is an
		<a href="https://www.npmjs.com/package/svelte-text-path">npm</a> package.
	</p>

	<code class="block">npm install -D svelte-text-path</code>
	<code class="block">yarn add -D svelte-text-path</code>
	<code class="block">pnpm add -D svelte-text-path</code>

	<h2>## Reactivity</h2>

	<p>
		As with all Svelte components, the text-path element is reactive. The path, viewBox, and text
		are all reactive, and will update the text-path element when changed. In order to allow the text
		to be colored, the <code>TextPath</code> component uses slots, so that the text can be styled
		with
		<a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/tspan">tspan</a>.
	</p>
	<p>For example, you can bind the text to an input, as shown in the home demo.</p>

	<div class="example">
		<div class="demo">
			<Reactivity />
		</div>
		<div class="split" />
		<div class="code">
			<Highlight language={xml} code={ReactivityText.replace('$lib', 'svelte-text-path')} />
		</div>
	</div>

	<h2>## Auto-sizing</h2>

	<p>
		Auto-sizing allows the text to fit the path, without manual font-size adjustments. This uses the
		same algorithm present in <a href="https://github.com/STRML/textFit">textFit</a> - a hidden text
		element is created, and the font-size is adjusted until the length of that text is the same as
		the length of the path with a <code>O(log n)</code> binary search.
	</p>

	<p>
		If this behavior is not desired, the <code>fontSize</code> property can be set to a fixed value,
		which will be used instead of the auto-sizing algorithm.
	</p>

	<div class="example border">
		<AutoSize />
	</div>

	<div class="note">
		<p>
			<span class="note">Note: </span> if your users have JavaScript disabled, the text will not be
			auto-sized, and will instead be the default font-size. If you want to support users with
			JavaScript disabled, you should use the fixed <code>fontSize</code> property.
		</p>
	</div>

	<h2>## Components</h2>

	<h3>### TextPath</h3>

	<p>
		<code>TextPath</code> is the fundamental component of this library. It takes in the following:
	</p>

	<ul>
		<li>
			<code>path</code> - the path to follow, in SVG path syntax
		</li>
		<li>
			<code>viewBox</code> - the viewBox of the SVG, in the form of an array of four numbers, in the
			order <code>[x, y, width, height]</code>
		</li>
		<li>
			<code>fontSize</code> - the font-size of the text, in pixels - if not specified, the text will
			be auto-sized
		</li>
		<li>
			<code>padding</code> - the padding around the text, in percentage of the viewBox. Defaults to
			<code>0.1</code>, to allow text ligatures that go past the viewBox to be visible.
		</li>
	</ul>

	<div class="example">
		<div class="demo">
			<TextPath />
		</div>
		<div class="split" />
		<div class="code">
			<Highlight language={xml} code={TextPathText.replace('$lib', 'svelte-text-path')} />
		</div>
	</div>

	<h3>### Circle</h3>

	<p>
		For the simple use case of circular text, there is a <code>Circle</code> component, which takes
		in any <code>slot</code> content, and wraps it with the more versatile
		<code>TextPath</code> component.
	</p>

	<div class="example">
		<div class="demo">
			<Circle />
		</div>
		<div class="split" />
		<div class="code">
			<Highlight language={xml} code={CircleText.replace('$lib', 'svelte-text-path')} />
		</div>
	</div>

	<p>
		A circle can also take in a <code>range</code> property, which is an array of two numbers
		between <code>0</code> and <code>1</code>, which specifies the range of the circle to display.
	</p>

	<div class="example">
		<div class="demo">
			<CircleRange />
		</div>
		<div class="split" />
		<div class="code">
			<Highlight language={xml} code={CircleRangeText.replace('$lib', 'svelte-text-path')} />
		</div>
	</div>
</main>

<style>
	code.block {
		display: block;
		padding: 0.5rem;
		background: #eee;
		border-radius: 0.5rem;
		margin: 0.5rem 0;
	}

	.example {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		height: 320px;
	}

	div.note {
		border-left: 0.5rem solid #3483eb;
		padding-left: 0.5rem;
	}

	span.note {
		font-weight: bold;
		color: #3483eb;
	}

	.border {
		border-radius: 0.5rem;
		border: 1px solid #ccc;
	}

	.code {
		width: 50%;
	}

	.split {
		width: 1px;
		height: 100%;
		background: #ccc;
	}

	@media (max-width: 900px) {
		.example {
			flex-direction: column;
			height: auto;
		}

		.split {
			width: 100%;
			height: 1px;
		}
	}

	main {
		max-width: 900px;
		margin: 0 auto;
		padding: 1rem;
		margin-bottom: 9rem;
		margin-top: 10rem;
	}
</style>
