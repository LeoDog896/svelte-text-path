<script lang="ts">
    import { Curve } from "$lib";

    let text = "Whereas recognition of the inherent dignity"
</script>

<div class="center">
    <Curve {text}/>
</div>

<div class="center">
    <input bind:value={text} />
</div>

<style>
    .center {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
    }
</style>
