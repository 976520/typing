<script>
  let textList = [];
  
  let text = textList[0];
  let input = "";
  let currentIndex = 0;
  let score = 0;
  let timeLeft = 10;
  let gameStarted = false;
  let interval;
  let totalTyped = 0; 
  let correctTyped = 0; 
  let difficulty = "short_sentence"; 
  
  function startGame() {
    resetGame();
    selectTextByDifficulty();
    gameStarted = true;
    interval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
      } else {
        endGame();
      }
    }, 1000);
  }

  function resetGame() {
    input = "";
    currentIndex = 0;
    score = 0;
    timeLeft = 60;
    totalTyped = 0;
    correctTyped = 0;
    clearInterval(interval);
  }

  function endGame() {
    gameStarted = false;
    clearInterval(interval);
  }

  function checkInput() {
    totalTyped = input.length; 
    if (input.trim() === text) {
        score += 10; 
        correctTyped += text.length; 
        selectRandomText();
        input = "";
        currentIndex = 0;
    } else if (input[currentIndex] === text[currentIndex]) {
        currentIndex++;
        correctTyped++; 
    } else {
        score--; 
    }
  }


  function selectRandomText() {
    text = textList[Math.floor(Math.random() * textList.length)];
  }

  function selectTextByDifficulty() {
    if (difficulty === "word") {
      textList = [
        "Javascript",
        "Java",
        "Python",
        "Int",
        "String"
      ];
    } else if (difficulty === "short_sentence") {
      textList = [
        "I take a look at my life and realize there's nothin' left",
        "Listening to my heart instead of my head",
        "I have these lucid dreams where I can't move a thing"
      ];
    } else if (difficulty === "long_sentence") {
      textList = [
        "Svelte is a powerful tool",
        "Svelte is a super tool"
      ];
    }
    selectRandomText();
  }

  function calculateAccuracy() {
    if (totalTyped === 0) return 0;
    return ((correctTyped / totalTyped) * 100).toFixed(2);
  }

  function calculateWPM() {
    const timeInMinutes = (60 - timeLeft) / 60;
    if (timeInMinutes > 0) {
      return ((totalTyped / 5) / timeInMinutes).toFixed(2);
    }
    return 0;
  }
</script>

<style>
  .container {
    text-align: center;
    padding: 2rem;
  }
  .text {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  .input-area {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  .score {
    font-size: 1.2rem;
    margin-top: 1rem;
  }
  .timer {
    font-size: 1.2rem;
    margin-top: 1rem;
  }
  .difficulty-selector {
    margin-bottom: 1rem;
  }
  .stats {
    font-size: 1.2rem;
    margin-top: 1rem;
  }
</style>

<div class="container">
  <div class="difficulty-selector">
    <label for="difficulty">난이도 선택: </label>
    <select id="difficulty" bind:value={difficulty}>
      <option value="word">낱말연습</option>
      <option value="short_sentence">짧은글연습</option>
      <option value="long_sentence">긴글연습</option>
    </select>
  </div>

  <div class="text">{text}</div>
  {#if gameStarted}
    <input
      class="input-area"
      bind:value={input}
      on:input={checkInput}
      placeholder="Type here..."
      autofocus
    />
  {/if}

  <div class="score">Score: {score}</div>
  <div class="timer">Time: {timeLeft}</div>
  <div class="stats">
    정확도: {calculateAccuracy()}% <br>
    {calculateWPM()} WPM
  </div>
  {#if !gameStarted}
    <button on:click={startGame}>시작</button>
  {/if}
  {#if gameStarted}
    <button on:click={endGame}>그만</button>
  {/if}
</div>
