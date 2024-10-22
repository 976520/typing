<script lang="ts">
  let text = "The quick brown fox jumps over the lazy dog.";
  let userInput = "";
  let startTime: Date;
  let endTime: Date;
  let isStarted = false;
  let isFinished = false;
  let wpm = 0;
  let cpm = 0;
  let accuracy = 0;

  function startTyping() {
    if (!isStarted) {
      isStarted = true;
      startTime = new Date();
    }
  }

  function finishTyping() {
    if (userInput === text) {
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
  }

  function calculateMetrics() {
    if (!isStarted) return;

    const currentTime = isFinished ? endTime : new Date();
    const timeTakenMinutes = (currentTime.getTime() - startTime.getTime()) / 1000 / 60;
    const wordsTyped = userInput.split(" ").length;
    const charactersTyped = userInput.length;
    const correctCharacters = [...userInput].filter((char, index) => char === text[index]).length;

    wpm = wordsTyped / timeTakenMinutes;
    cpm = charactersTyped / timeTakenMinutes;
    accuracy = (correctCharacters / text.length) * 100;
  }

  $: if (isStarted && !isFinished) {
    calculateMetrics();
  }

  $: if (userInput === text) {
    finishTyping();
  }
</script>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: Consolas, Arial, sans-serif;
    background-color: #f5f5f5;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  textarea {
    width: 60%;
    height: 100px;
    font-size: 1.25rem;
    padding: 10px;
    margin-bottom: 1rem;
    border: 2px solid #ccc;
    border-radius: 5px;
    resize: none;
  }

  .metrics {
    display: flex;
    justify-content: space-around;
    width: 60%;
    margin-bottom: 1rem;
  }

  .metrics p {
    margin: 0;
  }

  button {
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
</style>

<main>
  <h1>{text}</h1>
  <textarea
    bind:value={userInput}
    on:input={() => { startTyping(); calculateMetrics(); }}
    placeholder="Type here..."
    disabled={isFinished}
  ></textarea>
  <div class="metrics">
    <p>WPM: {wpm.toFixed(2)}</p>
    <p>CPM: {cpm.toFixed(2)}</p>
    <p>Accuracy: {accuracy.toFixed(2)}%</p>
  </div>
  {#if isFinished}
    <p>You finished typing in {(endTime.getTime() - startTime.getTime()) / 1000} seconds.</p>
    <button on:click={resetTyping}>Re?</button>
  {/if}
</main>
