const Game = require('./models/game');

const API_URL = 'http://api.datamuse.com/words?'
// https://api.datamuse.com/words?sp=x??????e

const challengesList = [
  {
    text: 'Words strongly associated with dogs',
    multiplier: 3,
    color: 'red'
  },
  {
    text: 'Words that start and end with the same letter',
    multiplier: 2,
    color: 'red'
  }
];

// countQuestionMarks = (lettersInBetweenCount) => {
//   var questionMarkCount = '';
//   for (var i = 0; i < lettersInBetweenCount; i++) {
//     questionMarkCount += '?';
//   }
//   return questionMarkCount;
// }

let io;
var games = {};

generateRandomLetter = () => {
  var letter;
  var characters = "abcdefghijklmnopqrstuvwxyz"
  var randomNumber = Math.floor(Math.random() * characters.length);
  letter = characters[randomNumber];
  return letter.toUpperCase();
}

countWordScore = (word) => {
  // refactor this to add the challenges multiplier
  var baseScore = word.length - 2;
  return baseScore;
}


module.exports = {
  
  init: function(httpServer) {
    io = require('socket.io')(httpServer);
    io.on('connection', function(socket) {

      socket.on('getActiveGame', function(userId) {
        var game = Object.values(games).find(g => g.players.some(p => p.id === userId));
        if (game) {
          socket.gameId = game._id;
          socket.join(game._id);
        }
        io.emit('gameData', game);
      });
      
      socket.on('createGame', function(user) {
        var game = new Game();
        game.players.push({
          name: user.name,
          id: user._id,
        });
        var randomLetter = generateRandomLetter();
        game.currentWord += randomLetter;
        game.save(function(err) {
          socket.gameId = game.id;
          socket.join(game.id);
          io.to(game.id).emit('gameData', game);
          games[game._id] = game;
        });
      });
      
      socket.on('joinGame', function(user, gameCode) {
        var game = games[gameCode];
        game.players.push({
          name: user.name,
          id: user.id
        });
        socket.join(gameCode);
        socket.gameId = game.id;
        io.to(game.id).emit('gameData', game);
        game.save();
      });

      socket.on('characterPressed', function(character) {
        var game = games[socket.gameId];
        game.currentWord += character;
        io.to(game.id).emit('gameData', game);
        game.save();
      })
      
      socket.on('onEnter', function() {
        var game = games[socket.gameId];
        
        // var firstLetter = game.currentWord[0];
        // var lastLetter = game.currentWord[game.currentWord.length - 1];
        // var lettersInBetweenCount = game.currentWord.length - 2;
        // var correctSpellingAndMatch = fetch(`${API_URL}sp=${firstLetter}*${lastLetter}`)
        //   .then(res => res.json())
        //   .then(words => words.find(word => word.word === wordToCheck));
        // console.log(correctSpellingAndMatch);

        var wordList = game.turnIdx ? game.players[1].wordList : game.players[0].wordList;
        wordList.push({
            word: game.currentWord,
            score: countWordScore(game.currentWord)
        });
        game.currentWord = game.currentWord[game.currentWord.length - 1];
        game.turnIdx = game.turnIdx ? 0 : 1;
        io.to(game.id).emit('gameData', game);
        game.save();
      })
      
      socket.on('onBackspace', function() {
        var game = games[socket.gameId];
        if (game.currentWord.length < 2) return;
        var removedLast = game.currentWord.substring(0, game.currentWord.length - 1);
        game.currentWord = removedLast;
        io.to(game.id).emit('gameData', game);
        game.save();
      })
      
      

    });
  },
  
  getIo: function() {return io}

};