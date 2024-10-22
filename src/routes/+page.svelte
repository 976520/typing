<script lang="ts">
  let text = "Leave this shit in the past, but I want it to last.";
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
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: 'Roboto', sans-serif;
    background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
    padding: 20px;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: #333;
    text-align: center;
  }

  p {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: #333;
  }

  textarea {
    width: 60%;
    height: 100px;
    font-size: 1.25rem;
    padding: 10px;
    margin-bottom: 1rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    resize: none;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    color: #333;
    backdrop-filter: blur(10px);
  }

  .metrics {
    display: flex;
    justify-content: space-around;
    width: 60%;
    margin-bottom: 1rem;
    color: #333;
  }

  .metrics p {
    margin: 0;
  }

  button {
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    border-radius: 10px;
    background-color: rgba(0, 123, 255, 0.1);
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
    backdrop-filter: blur(10px);
  }

  button:hover {
    background-color: rgba(0, 86, 179, 0.1);
  }

  .colored-text {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    white-space: pre-wrap;
    color: #333;
  }

  .correct {
    color: #4caf50;
  }

  .incorrect {
    color: #f44336;
  }
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
  </div>
  {#if isFinished}
    <p>{(endTime.getTime() - startTime.getTime()) / 1000} s</p>
    <button on:click={resetTyping}>Restart</button>
  {/if}
</main>
