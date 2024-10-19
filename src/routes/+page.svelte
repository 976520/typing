<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  let wordList = [
    "apple", "banana", "orange", "grape", "cherry", "strawberry", "watermelon", "pineapple", "blueberry", "mango"
  ];
  let inputText = "";
  let currentWordIndex = 0;
  let timeLeft = writable(60);
  let timer;
  let isGameActive = false;
  let accuracy = writable(100);
  let totalTyped = 0;
  let correctTyped = 0;
    let wpm = writable(0);

  onMount(() => {
    resetGame();
  });

  function startGame() {
    if (!isGameActive) {
      isGameActive = true;
      timer = setInterval(() => {
        timeLeft.update(n => {
          if (n > 1) {
            return n - 1;
          } else {
            clearInterval(timer);
            endGame();
            return 0;
          }
        });
      }, 1000);
    }
  }

  function resetGame() {
    inputText = "";
    currentWordIndex = 0;
    timeLeft.set(60);
    accuracy.set(100);
    totalTyped = 0;
    correctTyped = 0;
    wpm.set(0);
        isGameActive = false;
    clearInterval(timer);
  }

  function checkInput() {
    totalTyped++;
    if (inputText.trim() === wordList[currentWordIndex]) {
      correctTyped++;
      currentWordIndex = (currentWordIndex + 1) % wordList.length;
      inputText = "";
    }
    accuracy.set(Math.round((correctTyped / totalTyped) * 100));
    wpm.set(Math.round((correctTyped / (60 - $timeLeft)) * 60));
  }

  function endGame() {
    isGameActive = false;
    alert(`Game Over!\nAccuracy: ${$accuracy}%\nWPM: ${$wpm}`);
  }
</script>

<style>
  body {
    background-color: #f0f0f0;
  }
  .container {
    text-align: center;
    margin-top: 50px;
    
  }
  .word-input-container {
    position: relative;
    display: inline-block;
    font-family: 'Consolas', monospace;
  }
  .word {
    font-size: 36px;
    font-weight: bold;
    color: #ff6347;
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 1;
    font-family: 'Consolas', monospace;
    font-family: 'Consolas', monospace;
  }
  .input-overlay {
    font-size: 36px;
    padding: 10px;
    width: 300px;
    border: none;
    text-align: center;
    background: transparent;
    outline: none;
    position: relative;
    z-index: 2;
    font-family: 'Consolas', monospace;
  }
  .stats {
    margin-top: 20px;
    font-size: 20px;
    color: #333;
  }
  .reset-button {
    margin-top: 30px;
    padding: 12px 25px;
    font-size: 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
  .reset-button:hover {
    background-color: #0056b3;
  }
  .typing-history {
    margin-top: 20px;
    font-size: 18px;
    max-height: 150px;
    overflow-y: auto;
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    text-align: left;
    width: 60%;
    margin: 20px auto;
    font-family: 'Consolas', monospace;
  }
</style>

<div class="container">
  <h1>Typing Works</h1>
  <div class="word-input-container">
    <div class="word">{wordList[currentWordIndex]}</div>
    <input
      class="input-overlay"
      type="text"
      bind:value={inputText}
      on:input={checkInput}
      on:focus={startGame}
      autofocus
    />
  </div>
  <div class="stats">
    <p>Time Left: {$timeLeft} seconds</p>
    <p>Accuracy: {$accuracy}%</p>
    <p>WPM: {$wpm}</p>
  </div>
    <button class="reset-button" on:click={resetGame}>Reset Game</button>
</div>
