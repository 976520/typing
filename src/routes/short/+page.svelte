<script lang="ts">
  
  let sentences = [
    "Leave this shit in the past, but I want it to last.",
    "You left me falling and landing inside my grave.",
    "I know that you want me dead.",
    "I take prescriptions to make me feel a-okay.",
    "I know it's all in my head.",
    "I have these lucid dreams where I can't move a thing.",
    "I was tangled up in your drastic ways.",
    "Who knew evil girls have the prettiest face?",
    "You gave me a heart that was full of mistakes.",
    "I gave you my heart and you made heart break.",
  ];

  let text = sentences[Math.floor(Math.random() * sentences.length)];
  let userInput = "";
  let startTime: Date;
  let endTime: Date;
  let isStarted = false;
  let isFinished = false;
  let wpm = 0;
  let cpm = 0;
  let accuracy = 0;
  let correct = 0;
  let incorrect = 0;

  function startTyping() {
    if (!isStarted) {
      isStarted = true;
      startTime = new Date();
    }
  }

  function finishTyping() {
    if (userInput.trim() === text.trim()) {
      endTime = new Date();
      isFinished = true;
      calculateMetrics();
    }
  }

  function resetTyping() {  
    userInput = "";
    isStarted = false;
    isFinished = false;
    wpm = 0;
    cpm = 0;
    accuracy = 0;
    correct = 0;
    incorrect = 0;
  }

  function calculateMetrics() {
    if (!isStarted) return;

    const currentTime = isFinished ? endTime : new Date();
    const timeTakenMilliseconds = currentTime.getTime() - startTime.getTime();
    const timeTakenSeconds = timeTakenMilliseconds / 1000;
    const timeTakenMinutes = timeTakenSeconds / 60;
    const wordsTyped = userInput.split(" ").length;
    const charactersTyped = userInput.length;
    const correctCharacters = [...userInput].filter((char, index) => char === text[index]).length;

    wpm = wordsTyped / timeTakenMinutes;
    cpm = charactersTyped / timeTakenMinutes;
    accuracy = (correctCharacters / text.length) * 100;
    correct = correctCharacters;
    incorrect = charactersTyped - correctCharacters;
  }

  $: if (isStarted && !isFinished) {
    calculateMetrics();
  }

  $: if (userInput.trim() === text.trim()) {
    finishTyping();
  }

  function getColoredText() {
    const coloredText = [...text].map((char, index) => {
      if (index < userInput.length) {
        if (char === userInput[index]) {
          return `<span class="correct">${char}</span>`;
        } else {
          return `<span class="incorrect">${char}</span>`;
        }
      } else {
        return `<span>${char}</span>`;
      }
    }).join('');
    return coloredText;
  }

  function preventPaste(event: ClipboardEvent) {
    event.preventDefault();
  }
</script>


<style>
  @import '../../lib/style/style.css';
</style>

<main>
  <h1 class="colored-text">{@html getColoredText()}</h1>
  <textarea
    bind:value={userInput}
    on:input={() => { startTyping(); calculateMetrics(); }}
    on:paste={preventPaste}
    placeholder="Type here..."
    disabled={isFinished}
  ></textarea>
  
  <div class="metrics">
    <p>WPM: {wpm.toFixed(2)}</p>
    <p>CPM: {cpm.toFixed(2)}</p>
    <p>Accuracy: {accuracy.toFixed(2)}%</p>
    <p>Correct: {correct}</p>
    <p>Incorrect: {incorrect}</p>
  </div>
  {#if isFinished}
    <p>{(endTime.getTime() - startTime.getTime()) / 1000} s</p>
    <button on:click={resetTyping}>Restart</button>
  {/if}
</main>
