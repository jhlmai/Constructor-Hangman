//require inquirer
var inquirer = require('inquirer');
var Letters = require("./letters.js");
//require objects/exports
var Words = require("./words.js");
var Game = require("./game.js");

var hangman = {                                             //creating a reset point 
  wordBank: Game.game.wordBank,                             //key referring to the array of words in the wordBank in game.js
  guessesRemaining: 10,                                     //key to show integer of how many guesses to start with
  //empty array to hold letters guessed by user. And checks if the user guessed the letter already
  guessedLetters: [],
  //index to display graphic
  display: 0,
  correctWord: null,                                        //key placeholder to show the correct word

  //if they want to play starts new game.
  newGame: function() {                                         //function of the new game
    if(this.guessesRemaining === 10) {                          
      //generates random number based on the wordBank
      var randNum = Math.floor(Math.random()*this.wordBank.length);
      this.correctWord = new Word(this.wordBank[randNum]);              //using constructors to add a new instance of Word 
      this.correctWord.getLets();                                       //letsGet function in words.js
      this.keepPromptingUser();                                         
    } else{                                 
      this.resetGuessesRemaining();         
      this.newGame();                       //restart the newGame function again after the reset of the guesses remaining
    }                                       
  },                                        
  resetGuessesRemaining: function() {       //Reset the number of guesses remaining
    this.guessesRemaining = 10;
  },
  keepPromptingUser : function(){           //prompt user to pick another letter
    var that = this;
    //asks player for a letter
    inquirer.prompt([{
      name: "chooseLetter",
      type: "input",
      message: "Choose a letter:",
      validate: function(value) {
        if(isLetter(value)){
          return true;
        } else{
          return false;
        }
      }
    }]).then(function(letter) {
      var letterReturned = (letter.chooseLetter).toLowerCase();         //toLowerCase because words in word bank are all lower case      
      var guessedAlready = false;                                    //adds to the guessedLetters array if it isn't already there
        for(var i = 0; i<that.guessedLetters.length; i++){
          if(letterReturned === that.guessedLetters[i]){
            guessedAlready = true;
          }
        }
        //if the letter wasn't guessed already run through entire function, else reprompt user
        if(guessedAlready === false){
          that.guessedLetters.push(letterReturned);

          var found = that.correctWord.checkIfLetterFound(letterReturned);
          //if none were found tell user they were wrong
          if(found === 0){
            console.log('Nope');
            that.guessesRemaining--;
            that.display++;
            console.log('Guesses remaining: ' + that.guessesRemaining);
            console.log(hangManDisplay[(that.display)-1]);
            console.log(that.correctWord.wordRender());
            console.log("Letters guessed: " + that.guessedLetters);
          } else{
            console.log('Correct');
              //checks to see if user won
              if(that.correctWord.didWeFindTheWord() === true){
                console.log(that.correctWord.wordRender());
                console.log('Congratulations! You won the game!!!');
                // that.startGame();
              } else{
                // display the user how many guesses remaining
                console.log('Guesses remaining: ' + that.guessesRemaining);
                console.log(that.correctWord.wordRender());
                console.log("Letters guessed: " + that.guessedLetters);
              }
            }
        }
    });
  }
}

hangman.newGame();