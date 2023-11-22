<script lang="ts">
    import { Curve } from "$lib";
	import { sineOut } from "svelte/easing";
	import { tweened } from "svelte/motion";

    let text = "Whereas recognition of the inherent dignity and of the equal and inalienable rights of all members of the human family is the foundation of freedom, justice and peace in the world,"

    let inputFocused: boolean;
    $: spinning = !inputFocused;

    let rotation = tweened(0, { duration: 300, easing: sineOut });
    $: desiredRotation = spinning ? $rotation + 1.2 : null;
    $: desiredRotation && rotation.set(desiredRotation)
</script>

<header class="content">
    <h1>svelte-text-path</h1>
    <p>text-path wrapper for svelte</p>
    <p><a href="https://npmjs.com/package/svelte-text-path">NPM</a> | <a href="https://github.com/LeoDog896/svelte-text-path">GitHub</a></p>
</header>

<div class="center">
    <div class="spin-container" style="transform: rotate({$rotation}deg)">
        <Curve>{text}</Curve>
    </div>
    <div class="input">
        <textarea placeholder="Enter curved text" on:focus={() => inputFocused = true} on:blur={() => inputFocused = false} bind:value={text}></textarea>
    </div>
</div>

<style>
    .center {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
        top: 0;
        left: 0;
        z-index: 0;
    }
    
    .content {
        position: relative;
        text-align: center;
        padding-top: 1rem;
        z-index: 1;
    }

    .spin-container {
        display: relative;
        width: calc(min(100vw / 2, 100vh / 2));
    }

    .input {
        display: block;
        position: relative;
        z-index: 2;
        width: calc(min(100vw / 2, 100vh / 2));
        margin-left: calc(-1 * min(100vw / 2, 100vh / 2));
        text-align: center;
    }
</style>
