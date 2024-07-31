// Calculate the score in a single player Boggle game
export function wordListScore(wordList: string[]): number {
  return wordList.reduce((score, word) => {
    const length = word.length;
    if (length >= 3 && length <= 4) {
      return score + 1;
    } else if (length === 5) {
      return score + 2;
    } else if (length === 6) {
      return score + 3;
    } else if (length === 7) {
      return score + 5;
    } else if (length >= 8) {
      return score + 11;
    }
    return score;
  }, 0);
}

// Calculate the score for each player in a multiplayer Boggle game
export function calculateMultiplayerBoggleScores(playersWords: Map<string, string[]>): Map<string, number> {
  // Flatten all words from all players into a single array
  const allWords: string[] = [];
  playersWords.forEach(words => allWords.push(...words));

  // Count the occurrences of each word
  const wordCount: { [word: string]: number } = {};
  allWords.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });

  // Calculate the score for each player
  const scores = new Map<string, number>();
  playersWords.forEach((words, player) => {
    // Filter out non-unique words
    const uniqueWords = words.filter(word => wordCount[word] === 1);
    scores.set(player, wordListScore(uniqueWords));
  });

  return scores;
}
