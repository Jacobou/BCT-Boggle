import {wordListScore} from "./boggle.util";

describe('wordListScore', () => {
  it('should calculate the correct score for a given word list', () => {
    const wordList: string[] = ['cat', 'dog', 'elephant', 'giraffe'];

    expect(wordListScore(wordList)).toBe(18);
  });

  it('should return 0 for an empty word list', () => {
    expect(wordListScore([])).toBe(0);
  });

  it('should handle words shorter than 3 letters', () => {
    const wordList: string[] = ['at', 'in', 'it'];

    expect(wordListScore(wordList)).toBe(0);
  });

  it('should handle words with different lengths', () => {
    const wordList: string[] = ['cat', 'dog', 'elephant', 'giraffe', 'hippopotamus'];

    expect(wordListScore(wordList)).toBe(29);
  });
});
