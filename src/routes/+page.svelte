<script lang="ts">
  function getSource(index: number) {
    const sources = [
      "Jay-Z - Moment of Clarity",
      "Jay-Z - Moment of Clarity",
      "Jay-Z - Moment of Clarity",
      "Damian Marley - Road To Zion (feat. Nas)",
      "Damian Marley - Road To Zion (feat. Nas)",
      "Damian Marley - Road To Zion (feat. Nas)",
      "Nas - Memory Lane",
      "Lupe Fiasco - The Cool",
      "Lupe Fiasco - The Cool",
      "Lil' Wayne - Mr. Carter",
      "Lil' Wayne - Mr. Carter",
      "Snoop Dogg - Boss Life (feat. Akon, Nate Dogg)",
      "Snoop Dogg - Boss Life (feat. Akon, Nate Dogg)",
      "The Game - Where I'm From (feat. Nate Dogg)",
      "LOGIC - 1-800-273-8255",
      "LOGIC - 1-800-273-8255",
      "Lil Tjay - Ruthless",
      "Lil Tjay - Ruthless",
      "Joey Bada$$ - Devastated",
      "Joey Bada$$ - Devastated",
      "Kanye West - Stronger",
      "Kanye West - Stronger",
      "The Weeknd - In Your Eyes",
      "The Weeknd - In Your Eyes",
      "NF - When I Grow Up"
    ];
    return sources[index];
  }
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  let wordList = [
    "If skills sold, truth be told, I'd probably be lyrically, Talib Kweli.",
    "Truthfully I wanna rhyme like Common Sense.",
    "But I did five mill' - I ain't been rhymin like Common since.",
    "Sometimes I can't help but feel helpless.",
    "I'm having daymares in daytime. Wide awake try to relate.",
    "This can't be happenin like I'm in a dream while I'm walkin'.",
    "Here's my basis, my razor embraces, many faces.",
    "He begged for some change, to get him on the train.",
    "Damn that nigga stank, is what they complained.",
    "Man, I got Summer hatin' on me 'cause I'm hotter than the Sun.",
    "I'm being hated by the seasons. So fuck y'all who hatin' for no reason.",
    "But I would never bother breakin' out Tha Doggfather.",
    "'Less I knew that she was 'bout him havin' diamonds on his collar.",
    "I painted the Rover black. The West Coast is back, I can smoke to that.",
    "I know where you been, where you are, where you goin'.",
    "I know you're the reason I believe in life.",
    "As a youngin I just wanted to be famous.",
    "Hopped in the booth 'til we scream that we made it.",
    "I used to feel so devastated.",
    "At times I thought we'd never make it.",
    "Now that don't kill me can only make me stronger.",
    "I need you to hurry up now. Cause I can't wait much longer.",
    "In your eyes, I see there's something burning inside you.",
    "You always try to hide the pain.",
    "I been workin' on 'em, I'll be good eventually.",
    "I understand you gotta crawl before you get to your feet."
  ];
  let inputText = "";
  let currentWordIndex = 0;
  let timeLeft = writable(60);
  let timer: ReturnType<typeof setInterval>;
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
    if (timer) clearInterval(timer);
  }

  function checkInput() {
    totalTyped++;
    if (inputText.trim() === wordList[currentWordIndex]) {
      correctTyped++;
      currentWordIndex = (currentWordIndex + 1) % wordList.length;
      inputText = "";
    }
    if (totalTyped > 0) {
      accuracy.set(Math.round((correctTyped / totalTyped) * 100));
      wpm.set(Math.round((correctTyped / (60 - $timeLeft)) * 60));
    }
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
    position: relative; margin: 0 auto; display: flex; justify-content: center; align-items: center; height: auto;
    display: inline-block;
    font-family: 'Consolas', monospace;
  }
  .word {
    font-size: 24px; font-weight: bold; width: 90%; max-width: 800px; word-wrap: break-word; white-space: pre-wrap; overflow-wrap: break-word; text-align: center;
    color: #ff6347;
    padding: 10px 0;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    position: relative; display: flex; justify-content: center; align-items: center; width: 100%; 
    pointer-events: none;
    z-index: 1;
    font-family: 'Consolas', monospace;
  }
  .input-overlay {
    font-size: 24px;
    padding: 15px;
    width: 100%; max-width: 800px; height: auto;
    border: none;
    text-align: left;
    background: transparent;
    outline: none;
    position: relative;
    z-index: 2;
    font-family: 'Consolas', monospace;
  }
  .stats {
    margin-top: 20px;
    font-size: 28px;
    color: #333;
  }
  .reset-button {
    margin-top: 30px;
    padding: 20px 40px;
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
    text-align: center;
    width: 60%;
    margin: 20px auto;
    font-family: 'Consolas', monospace;
  }
</style>

<div class="container">
  <div class="word-input-container">
    <div class="word">{wordList[currentWordIndex]}</div>
    
    <input
      class="input-overlay" style="white-space: pre-wrap; overflow-wrap: break-word;"
      type="text"
      bind:value={inputText}
      on:input={checkInput}
      on:focus={startGame}
      autofocus
    />
    <p style="font-size: 14px; color: #888;">{getSource(currentWordIndex)}</p>
  </div>
  <div class="stats">
    <p>Time Left: {$timeLeft} seconds</p>
    <p>Accuracy: {$accuracy}%</p>
    <p>WPM: {$wpm}</p>
  </div>
    <button class="reset-button" on:click={resetGame}>Reset Game</button>
</div>
