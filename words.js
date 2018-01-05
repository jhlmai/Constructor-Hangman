// require letter objects
var Letter = require('./letters.js');  //to be able to view letters.js stored as var

function Word(chosenWord) {                //Constructor function
  var that = this;
  //store the string chosenWord
  this.word = chosenWord;               
  //collection of letter objects
  this.letters = [];                        
  this.wordFound = false;                   //setting wordFound to false, to later set to true 

  this.getLets = function() {
    //populate the collection above with new Letter objects
    for(var i = 0; i<that.word.length; i++){            //for loop using the chosenWord
      var newLetter = new Letter(that.word[i]);         //creating the new instance of the Letter constructor function
      this.letters.push(newLetter);                     //pushing into the letter array each letter of the newLetter
    }
  };
  };


module.exports = Word;
