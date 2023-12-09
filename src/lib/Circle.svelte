<script lang="ts">
	import TextPath from './TextPath.svelte';
</script>

<TextPath
	path="M 0.5 0.5 m -0.5, 0 a 0.5,0.5 0 1,0 1,0 a 0.5,0.5 0 1,0 -1,0"
	viewBox={[0, 0, 1, 1]}
>
	<slot />
</TextPath>
