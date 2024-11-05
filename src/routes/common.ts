export interface TypingTest {
  words: string[];
  currentInput: string;
  currentWordIndex: number;
  startTime: number | null;
  isFinished: boolean;
  wpm: number;
  cpm: number;
  accuracy: number;
  mistakes: number;
  totalTyped: number;
  incorrectChars: { [key: number]: Set<number> };
}

export function initializeTest(wordList: string[]): TypingTest {
  return {
    words: generateWords(wordList),
    currentInput: "",
    currentWordIndex: 0,
    startTime: null,
    isFinished: false,
    wpm: 0,
    cpm: 0,
    accuracy: 0,
    mistakes: 0,
    totalTyped: 0,
    incorrectChars: {},
  };
}

function generateWords(wordList: string[]): string[] {
  return Array(40)
    .fill("")
    .map(() => wordList[Math.floor(Math.random() * wordList.length)]);
}

export function finishTest(test: TypingTest): void {
  const timeElapsed: number = (Date.now() - test.startTime!) / 1000 / 60;
  test.wpm = Math.round(test.totalTyped / 5 / timeElapsed);
  test.cpm = Math.round(test.totalTyped / timeElapsed);
  test.accuracy = Math.round(((test.currentWordIndex - test.mistakes) / test.currentWordIndex) * 100);
  test.isFinished = true;
}
