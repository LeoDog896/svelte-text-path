<script lang="ts">
    import type { PageData } from './$types';
    import { cubicIn, cubicOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

    import '../app.css'

    export let data: PageData;
    $: pathname = data.pathname
</script>

{#key pathname}
    <div class="display" in:fade={{ easing: cubicOut, duration: 100, delay: 200 }} out:fade={{ easing: cubicIn, duration: 100 }}>
        <slot />
    </div>
{/key}

<footer>
    <nav>
        <a href="/svelte-text-path/">
            home
        </a>
        <a href="/svelte-text-path/docs">
            docs
        </a>
    </nav>
</footer>

<style>

    nav {
        position: absolute;
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
    }
</style>
