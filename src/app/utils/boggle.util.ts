export function wordListScore(wordList: string[]): number {
  let score: number = 0;

  for (const word of wordList) {
    const length: number = word.length;

    if (length >= 3 && length <= 4) {
      score += 1;
    } else if (length === 5) {
      score += 2;
    } else if (length === 6) {
      score += 3;
    } else if (length === 7) {
      score += 5;
    } else if (length >= 8) {
      score += 11;
    }
  }

  return score;
}

