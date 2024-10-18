<script>
  let textList = [];
  let text = "";
  let input = "";
  let currentIndex = 0;
  let score = 0;
  let timeLeft = 60;
  let gameStarted = false;
  let interval;
  let totalTyped = 0; 
  let correctTyped = 0; 
  let difficulty = "short_sentence"; 
  
  const DIFFICULTY_TEXTS = {
    word: [
      "Javascript", "Java", "Python", "Int", "String", "Boolean", "Double", "Float", "Computer science", "Binary tree", "Class", "Object", "Module", "Stack", "Depth first search", "Breadth first search", "Backtracking"
    ],
    short_sentence: [
      "Pop another drugs different color", "Never was much of a romantic",
      "I take a look at my life and realize there's nothin' left",
      "I'm that cat by the bar toastin' to the good life",
      "You can find me in the club, bottle full of bub'",
      "I'm representing for them gangstas all across the world",
      "You been putting up with my shit just way too long",
      "So I think it's time for us to have a toast",
      "Let's have a toast for the douchebags", 
      "I've been fuckin' hoes and poppin' pillies", 
      "Man, I feel just like a rockstar", 
      "Cocaine on the table, liquor pourin'", 
      "Don't give a damn, dude, your girlfriend is a groupie"
    ],
    long_sentence: [
      "Since the last time you heard from me, I lost some friends. Well, hell, me and Snoop, we dippin' again. Kept my ear to the streets, signed Eminem. He's triple platinum, doing 50 a week.",
      "I still see your shadows in my room. Can't take back the love that I gave you. It's to the point where I love and I hate you. And I cannot change you so I must replace you."
    ]
  };

  function startGame() {
    resetGame();
    selectTextByDifficulty();
    gameStarted = true;
    interval = setInterval(updateTime, 1000);
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

  function updateTime() {
    if (timeLeft > 0) {
      timeLeft--;
    } else {
      endGame();
    }
  }

  function checkInput() {
    totalTyped = input.length; 
    if (input.trim() === text) {
      score += 10; 
      correctTyped += text.length;
      loadNewText();
    } else if (input[currentIndex] === text[currentIndex]) {
      currentIndex++;
      correctTyped++;
    } else {
      score--; 
    }
  }

  function loadNewText() {
    input = "";
    currentIndex = 0;
    selectRandomText();
  }

  function selectRandomText() {
    text = textList[Math.floor(Math.random() * textList.length)];
  }

  function selectTextByDifficulty() {
    textList = DIFFICULTY_TEXTS[difficulty] || [];
    selectRandomText();
  }

  function calculateAccuracy() {
    return totalTyped > 0 ? ((correctTyped / totalTyped) * 100).toFixed(2) : "0.00";
  }

  function calculateWPM() {
    const timeInMinutes = (60 - timeLeft) / 60;
    return timeInMinutes > 0 ? ((totalTyped / 5) / timeInMinutes).toFixed(2) : "0.00";
  }
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    padding: 2rem;
    justify-content: center;
  }
  .text, .input-area {
    font-family: Consolas;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    width: 50rem;
    justify-self: center;
  }
  .input-area {
    font-size: 1.2rem;
  }
  .score, .timer, .stats {
    font-size: 1.2rem;
    margin-top: 1rem;
  }
  .difficulty-selector {
    margin-bottom: 1rem;
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
  
  {#if !gameStarted}
    <button on:click={startGame}>시작</button>
  {/if}
  
  {#if gameStarted}
    <button on:click={endGame}>그만</button>
  {/if}
  
  <div class="score">Score: {score}</div>
  <div class="timer">Time: {timeLeft}</div>
  <div class="stats">
    정확도: {calculateAccuracy()}% <br>
    {calculateWPM()} WPM
  </div>
</div>
