<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<div class="menu">
	<button on:click={() => goto('/long')}>Long</button>
	<button on:click={() => goto('/short')}>Short</button>
</div>

<style>
	:global(body) {
		background-color: #282c34;
		color: #abb2bf;
	}

	.menu {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin: 2rem 0;
	}

	button {
		background: #61afef;
		color: #282c34;
		border: none;
		padding: 0.8rem 1.5rem;
		font-size: 1rem;
		border-radius: 4px;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	button:hover {
		background: #56b6c2;
	}
</style>
