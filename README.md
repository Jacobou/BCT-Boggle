# Boggle

This is a simple Boggle game implemented in Angular. The game generates a 4x4 or 6x6 board of random letters, and the player can select adjacent letters to form words. The game validates the words against a predefined word list and calculates the score based on the length of the words.

## Features

- Generates a random 4x4 or 6x6 board of letters
- Allows the player to select adjacent letters to form words
- Validates words against a predefined word list
- Calculates and displays the player's score
- Displays a timer of 3 minutes for each game
- Shows a modal dialog when the game ends or an invalid word is entered
- Supports English only.
- Support single player only.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.3.

## Installation

Follow these steps to install and run the Boggle game on your browser.

### Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Angular CLI](https://cli.angular.io/) (version 14 or higher)

### Clone the Repository

```bash
git clone https://github.com/Jacobou/BCT-Boggle.git
cd boggle-game
npm install
ng serve
