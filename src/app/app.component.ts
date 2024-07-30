import {Component, OnInit} from '@angular/core';
import {wordListScore} from "./utils/boggle.util";
export interface LetterCoordinates {
  x: number;
  y: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  board: string[][] = [];
  currentWord: string = '';
  words: string[] = [];
  score: number = 0;
  letterClicked: boolean = false;
  lastLetterIndexes: LetterCoordinates = {} as LetterCoordinates;
  usedDices: LetterCoordinates[] = [];

  constructor() {}

  ngOnInit(): void {
    this.generateBoard();
  }

  // Generate a 4x4 board of random letters
  generateBoard(): void {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.board = [];
    for (let i = 0; i < 4; i++) {
      const row = [];
      for (let j = 0; j < 4; j++) {
        row.push(letters[Math.floor(Math.random() * letters.length)]);
      }
      this.board.push(row);
    }
  }

  // Select a cell on the board
  selectCell(row: number, col: number): void {
    this.currentWord += this.board[row][col];
    this.lastLetterIndexes = {x: row, y: col};
    this.usedDices.push({x: row, y: col});
    this.letterClicked = true;
  }

  // Disable buttons that are not adjacent to the last clicked letter
  disableButtons(row: number, col: number): boolean {
    const validXCoordinates: number[] = [this.lastLetterIndexes.x - 1, this.lastLetterIndexes.x, this.lastLetterIndexes.x + 1];
    const validYCoordinates: number[] = [this.lastLetterIndexes.y - 1, this.lastLetterIndexes.y, this.lastLetterIndexes.y + 1];
    const validCoordinates: boolean = validXCoordinates.includes(row) && validYCoordinates.includes(col);
    const diceUsed: boolean = this.usedDices.some(dice => dice.x === row && dice.y === col);


    return this.letterClicked && (!validCoordinates || diceUsed);
  }

  // Check if the cell is selected
  isSelected(row: number, col: number): boolean {
    return this.usedDices.some(dice => dice.x === row && dice.y === col);
  }

  // Submit the current word and calculate the score
  submitWord(): void {
    if (this.currentWord.length >= 3) {
      this.words.push(this.currentWord);
      this.score = wordListScore(this.words);
    }
    this.resetBoard();
  }

  // Reset the board
  resetBoard(): void {
    this.currentWord = '';
    this.letterClicked = false;
    this.usedDices = [];
  }
}
