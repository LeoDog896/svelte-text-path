<script lang="ts">
    import { Curve } from "$lib";

    let text = "Whereas recognition of the inherent dignity and of the equal and inalienable rights of all members of the human family is the foundation of freedom, justice and peace in the world,"
</script>

<div class="center">
    <input bind:value={text} />
</div>

<div class="center display">
    <Curve>{text}</Curve>
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

    .display {
        pointer-events: none;
    }
</style>
