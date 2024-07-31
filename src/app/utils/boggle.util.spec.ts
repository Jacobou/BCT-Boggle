import {calculateMultiplayerBoggleScores, wordListScore} from "./boggle.util";

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

describe('calculateMultiplayerBoggleScores', () => {
  it('calculates scores correctly for multiple players', () => {
    const playersWords: Map<string, string[]> = new Map<string, string[]>([
      ["Alice", ["catty", "am", "bumfuzzle"]],
      ["Bob", ["gardyloo", "taradiddle", "loo", "snickersnee"]],
      ["Charlie", ["widdershins", "teabag", "collywobbles", "gubbins"]]
    ]);

    const expectedScores: Map<string, number> = new Map<string, number>([
      ["Alice", 13],
      ["Bob", 34],
      ["Charlie", 30]
    ]);

    expect(calculateMultiplayerBoggleScores(playersWords)).toEqual(expectedScores);
  });

  it('handles empty word lists', () => {
    const playersWords: Map<string, string[]> = new Map<string, string[]>([
      ["Alice", []],
      ["Bob", []],
      ["Charlie", []]
    ]);

    const expectedScores: Map<string, number> = new Map<string, number>([
      ["Alice", 0],
      ["Bob", 0],
      ["Charlie", 0]
    ]);

    expect(calculateMultiplayerBoggleScores(playersWords)).toEqual(expectedScores);
  });

  it('handles single player', () => {
    const playersWords: Map<string, string[]> = new Map<string, string[]>([
      ["Alice", ["catty", "wampus", "am", "bumfuzzle"]]
    ]);

    const expectedScores: Map<string, number> = new Map<string, number>([
      ["Alice", 16]
    ]);

    expect(calculateMultiplayerBoggleScores(playersWords)).toEqual(expectedScores);
  });

  it('handles duplicate words among players', () => {
    const playersWords: Map<string, string[]> = new Map<string, string[]>([
      ["Alice", ["catty", "wampus", "am", "bumfuzzle"]],
      ["Bob", ["gardyloo", "taradiddle", "loo", "catty"]],
      ["Charlie", ["widdershins", "collywobbles", "gubbins", "wampus"]]
    ]);

    const expectedScores: Map<string, number> = new Map<string, number>([
      ["Alice", 11], // "wampus" and "catty" are duplicated
      ["Bob", 23], // "catty" is duplicated
      ["Charlie", 27] // "wampus" is duplicated
    ]);

    expect(calculateMultiplayerBoggleScores(playersWords)).toEqual(expectedScores);
  });
});
