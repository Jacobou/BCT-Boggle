import { Component, OnInit } from '@angular/core';
import { wordListScore } from './utils/boggle.util';
import { WordListService } from './services/word-list.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {interval, Subscription} from "rxjs";
import {TimeUpModalComponent} from "./components/time-up-modal/time-up-modal.component";

export interface LetterCoordinates {
  x: number;
  y: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  board: string[][] = [];
  currentWord: string = '';
  words: string[] = [];
  score: number = 0;
  letterClicked: boolean = false;
  lastLetterIndexes: LetterCoordinates = {} as LetterCoordinates;
  usedDices: LetterCoordinates[] = [];
  wordListLoaded: boolean = false;
  errorMessage: string = '';
  boardSize: number = 0;
  // Timer variables
  timer: number = 180; // 3 minutes in seconds
  gameActive: boolean = true; // To track if the game is active
  timerSubscription: Subscription = new Subscription();
  defaultTimer: number = 180;

  constructor(private wordListService: WordListService, private modalService: NgbModal) {
    this.wordListService.loadWordList().subscribe(() => {
      this.wordListLoaded = true;
    });
  }

  ngOnInit(): void {
    this.generateBoard();
    this.startTimer();
  }

  // Generate a 4x4 board of random letters by default or a board of size x size
  generateBoard(size: number = 4): void {
    this.boardSize = size;
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.board = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(letters[Math.floor(Math.random() * letters.length)]);
      }
      this.board.push(row);
    }
    this.startTimer();
    this.timerSubscription.unsubscribe();
  }

  // Start the timer
  startTimer(): void {
    this.timer = this.defaultTimer;
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.timerSubscription.unsubscribe();
        this.gameActive = false;
        this.showTimeUpModal();
      }
    });
  }

  // Show time-up modal
  showTimeUpModal(): void {
    const modalRef = this.modalService.open(TimeUpModalComponent, {
      backdrop: 'static', // Prevent clicking outside the modal
      keyboard: false // Prevent closing with the escape key
    });
    modalRef.componentInstance.message = 'Time is up! Your game has ended.';
    modalRef.result.then(
      (result) => {
        this.generateBoard(this.boardSize);
        this.startTimer();
      }
    );
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
  submitWord(content: any): void {
    if (this.currentWord.length >= 3) {
      if (this.wordListService.isValidWord(this.currentWord)) {
        this.words.push(this.currentWord);
        this.score = wordListScore(this.words);
      } else {
        this.errorMessage = 'Invalid word. Please try again.';
        this.modalService.open(content);
      }
    } else {
      this.errorMessage = 'Word must be at least 3 letters long.';
      this.modalService.open(content);
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
