<script lang="ts">
	import { onMount } from 'svelte';

	let words: string[] = [];
	let currentInput: string = '';
	let currentWordIndex: number = 0;
	let startTime: number | null = null;
	let isFinished: boolean = false;
	let wpm: number = 0;
	let cpm: number = 0;
	let accuracy: number = 0;
	let mistakes: number = 0;
	let totalTyped: number = 0;
	let incorrectChars: { [key: number]: Set<number> } = {};

	const wordList: string[] = [
		'I still see your shadows in my room. Can\'t take back the love that I gave you. It\'s to the point where I love and I hate you. And I cannot change you, so I must replace you.', 'var is gay'
	];

	function generateWords() {
		words = Array(1).fill('').map(() => wordList[Math.floor(Math.random() * wordList.length)]);
	}

	function handleInput(event: KeyboardEvent) {
		if (!startTime) startTime = Date.now();
		
		const input = (event.target as HTMLInputElement).value;
		currentInput = input;

		if (event.key === 'Enter') {
			const typedWord = currentInput.trim();
			const correctWord = words[currentWordIndex];
			
			if (typedWord === correctWord) {
				totalTyped += typedWord.length;
			} else {
				mistakes++;
				incorrectChars[currentWordIndex] = new Set();
				for (let i = 0; i < correctWord.length; i++) {
					if (typedWord[i] !== correctWord[i]) {
						incorrectChars[currentWordIndex].add(i);
					}
				}
			}

			currentWordIndex++;
			currentInput = '';
			
			if (currentWordIndex >= words.length) {
				finishTest();
			}
		}
	}

	function finishTest() {
		const timeElapsed: number = (Date.now() - startTime!) / 1000 / 60; 
		wpm = Math.round((totalTyped / 5) / timeElapsed);
		cpm = Math.round(totalTyped / timeElapsed);
		accuracy = Math.round(((currentWordIndex - mistakes) / currentWordIndex) * 100);
		isFinished = true;
	}

	function restart() {
		generateWords();
		currentInput = '';
		currentWordIndex = 0;
		startTime = null;
		isFinished = false;
		wpm = 0;
		cpm = 0;
		accuracy = 0;
		mistakes = 0;
		totalTyped = 0;
		incorrectChars = {};
	}

	onMount(() => {
		generateWords();
	});
</script>

<svelte:head>
	<title>Typing </title>
</svelte:head>

<div class="container">
	{#if isFinished}
		<div class="results">
			<div class="stats">
				<div class="stat">
					<span class="value">{wpm}</span>
					<span class="label">WPM</span>
				</div>
				<div class="stat">
					<span class="value">{cpm}</span>
					<span class="label">CPM</span>
				</div>
				<div class="stat">
					<span class="value">{accuracy}%</span>
					<span class="label">Accuracy</span>
				</div>
			</div>
			<button on:click={restart}>Restart</button>
		</div>
	{:else}
		<div class="typing-area">
			<div class="words">
				{#each words as word, wordIndex}
					<div class="word {wordIndex === currentWordIndex ? 'current' : ''} 
						{wordIndex < currentWordIndex ? 'completed' : ''}">
						{#each word.split(' ') as part, partIndex}
							<span class="part">{part}</span>
							{#if partIndex < word.split(' ').length - 1}
								<span class="space"> </span>
							{/if}
						{/each}
						{#if wordIndex === currentWordIndex}
							<div class="word-input">
								{#each currentInput.split(' ') as part, partIndex}
									<div>
										{#each part.split('') as char, charIndex}
											<span class="char-input {char === word.split(' ')[partIndex]?.split('')[charIndex] ? 'correct' : 'incorrect'}">{char}</span>
										{/each}
									</div>
									{#if partIndex < currentInput.split(' ').length - 1}
										<span class="space-input"> </span>
									{/if}
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			</div>
			<input
				type="text"
				bind:value={currentInput}
				on:keydown={handleInput}
				class="input"
				autocomplete="off"
				autocapitalize="off"
				spellcheck="false"
			/>
		</div>
	{/if}
</div>

<style>
	:global(body) {
		background-color: #282c34;
		color: #abb2bf;
	}

	.container {
		max-width: 800px;
		margin: 2rem auto;
		padding: 2rem;
		background: #21252b;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.typing-area {
		position: relative;
		margin-bottom: 2rem;
		min-height: 200px;
	}

	.words {
		font-family: 'consolas', monospace;
		font-size: 1.5rem;
		line-height: 2;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.word {
		position: relative;
		color: #abb2bf;
		display: flex;
		flex-wrap: wrap;
	}

	.word.current {
		color: #e06c75;
	}

	.word.completed {
		color: #98c379;
	}

	.part {
		position: relative;
		z-index: 1;
	}

	.space {
		margin: 0 0.2em;
	}

	.word-input {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 2;
		display: flex;
		flex-wrap: wrap;
	}

	.char-input {
		color: #61afef;
	}

	.char-input.incorrect {
		color: #e06c75;
		background: rgba(224, 108, 117, 0.1);
	}

	.space-input {
		margin: 0 0.2em;
	}

	.input {
		width: 100%;
		padding: 0.5rem;
		font-size: 1rem;
		background: #282c34;
		color: #abb2bf;
		border: 1px solid #abb2bf;
		border-radius: 4px;
	}

	.results {
		text-align: center;
	}

	.stats {
		display: flex;
		justify-content: center;
		gap: 2rem;
		margin: 2rem 0;
	}

	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.value {
		font-size: 2.5rem;
		font-weight: bold;
		color: #61afef;
	}

	.label {
		font-size: 0.9rem;
		color: #abb2bf;
		text-transform: uppercase;
		letter-spacing: 0.1em;
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