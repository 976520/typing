<script>
  // @ts-ignore
  let textList = [];
  let text = "";
  let input = "";
  let currentIndex = 0;
  let timeLeft = 60;
  let gameStarted = false;

  let interval;
  let totalTyped = 0; 
  let correctTyped = 0; 
  let difficulty = "short_sentence"; 
  
  const DIFFICULTY_TEXTS = {
    word: [
      "Javascript", "Java", "Python", "Int", "String", "Boolean", "Double", "Float", "Computer science", "Binary tree", "Class", "Object", "Module", "Stack", "Depth first search", "Breadth first search", "Back"
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

    if (input === text.substring(0, input.length)) {
      correctTyped = input.length;
    }
    
    if (input.trim() === text.trim()) {
      loadNewText();
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
    const wordsTyped = totalTyped / 5;
    return timeInMinutes > 0 ? (wordsTyped / timeInMinutes).toFixed(2) : "0.00";
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
    background-color: #f0f0f5;
    border-radius: 15px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    width: 70%;
    margin: 2rem auto;
  }

  .text {
    font-family: 'Consolas', monospace;
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
    width: 100%;
    padding: 1rem;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    color: #333;
  }

  .input-area {
    font-family: 'Consolas', monospace;
    font-size: 1.4rem;
    padding: 0.8rem;
    border: 2px solid #3498db;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    width: 100%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    transition: border-color 0.3s ease-in-out;
  }

  .input-area:focus {
    border-color: #2980b9;
    outline: none;
  }

  button {
    font-size: 1.2rem;
    padding: 0.8rem 1.5rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out, transform 0.2s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  button:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }

  button:active {
    background-color: #1d6fa5;
    transform: translateY(0);
  }

  .timer, .stats {
    cursor: default;
    font-size: 1.3rem;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    background: linear-gradient(45deg, #4a6faf, #0974b5);
    color: white;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
  }

  .timer:hover, .stats:hover {
    transform: translateY(-2px);
  }

  .difficulty-selector {
    margin-bottom: 1rem;
  }

  select {
    padding: 0.5rem;
    font-size: 1.1rem;
    border: 2px solid #3498db;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    transition: border-color 0.3s ease-in-out;
  }

  select:focus {
    border-color: #2980b9;
    outline: none;
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
  
  <div class="timer">Time: {timeLeft}</div>
  <div class="stats">
    정확도: {calculateAccuracy()}% <br>
    {calculateWPM()} WPM
  </div>
</div>
