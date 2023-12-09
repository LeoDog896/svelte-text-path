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
	const x = () => 10 * (isDocs ? -1 : 1);

	const transitionIn = { easing: cubicOut, x: x(), duration, delay };
	const transitionOut = { easing: cubicIn, x: -x(), duration };
</script>

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
