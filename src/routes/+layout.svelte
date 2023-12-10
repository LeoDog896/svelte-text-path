<script lang="ts">
	import type { PageData } from './$types';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	import '@fontsource-variable/hepta-slab';
	import '../app.css';

	export let data: PageData;
	$: pathname = data.pathname;
	$: isDocs = data.isDocs;

	const duration = 300;
	const delay = duration + 100;

	const transitionIn = { easing: cubicOut, x: 10, duration, delay };
	const transitionOut = { easing: cubicIn, x: -10, duration };
</script>

<header>
	<h1>svelte-text-path</h1>
	<p>
		auto-sizing <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/textPath"
			>text-path</a
		> <a href="https://svelte.dev/">svelte</a> library
	</p>
	<p>
		<a href="https://npmjs.com/package/svelte-text-path">NPM</a> |
		<a href="https://github.com/LeoDog896/svelte-text-path">GitHub</a>
	</p>
</header>

{#key pathname}
	<div class="display" in:fly={transitionIn} out:fly={transitionOut}>
		<slot />
	</div>
{/key}

<footer>
	<nav>
		<a href="/svelte-text-path/"> home </a>
		<a href="/svelte-text-path/docs"> docs </a>
	</nav>
</footer>

<style>
	header {
		position: absolute;
		width: 100%;
		text-align: center;
		padding-top: 1rem;
		z-index: 1;
	}

	.display {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	h1 {
		font-weight: 500;
	}

	nav {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		text-align: center;
		display: flex;
	}

	nav a {
		background: black;
		color: white;
		text-decoration: none;
		padding: 1rem;
		width: 100%;
		font-size: 1.5rem;
	}
</style>
