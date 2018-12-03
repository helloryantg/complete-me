const Game = require('./models/game');

const API_URL = 'http://api.datamuse.com/words?'

let io;
var games = {};

const challengesList = [
  {
    text: 'Words that start and end with the same letter',
    multiplier: 2,
    color: 'DA70D6',
    challengeCode: 0
  },
  {
    text: 'Words that are 7 letters long',
    multiplier: 3,
    color: 'BA55D3',
    challengeCode: 1
  },
  {
    text: 'Words strongly associated with dogs',
    multiplier: 3,
    color: 'FF00FF',
    challengeCode: 2
  },
  {
    text: 'Words that describe ghosts',
    multiplier: 4,
    color: '9400D3',
    challengeCode: 3
  }
];



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
        // Create new game
        var game = new Game();
        
        // Push player one into the game
        game.players.push({
          name: user.name,
          id: user._id,
        });

        // Generate random letter to begin playing
        var randomLetter = generateRandomLetter();
        game.currentWord += randomLetter;

        // Shuffle challenges list and list out two on the board
        shuffleChallenges(challengesList);
        game.challenges.push(...[challengesList[0], challengesList[1]]);

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
        if (!game) return;
        game.currentWord += character;
        io.to(game.id).emit('gameData', game);
        game.save();
      });
      
      socket.on('onEnter', function(challenge) {
        var game = games[socket.gameId];
        var wordList = game.turnIdx ? game.players[1].wordList : game.players[0].wordList;
        wordList.push({
            word: game.currentWord,
            score: countWordScore(game.currentWord, challenge)
        });
        game.currentWord = game.currentWord[game.currentWord.length - 1];
        game.turnIdx = game.turnIdx ? 0 : 1;
        io.to(game.id).emit('gameData', game);
        game.save();
      });
      
      socket.on('onBackspace', function() {
        var game = games[socket.gameId];
        if (game.currentWord.length < 2) return;
        var removedLast = game.currentWord.substring(0, game.currentWord.length - 1);
        game.currentWord = removedLast;
        io.to(game.id).emit('gameData', game);
        game.save();
      });

      socket.on('noMatch', function() {
        var game = games[socket.gameId];
        game.currentWord = game.currentWord[game.currentWord.length - 1];
        io.to(game.id).emit('gameData', game);
        game.save();
      })

      socket.on('countDown', function() {
        var game = games[socket.gameId];
        if (!game) return;
        game.players[game.turnIdx].time--;
        io.to(game.id).emit('gameData', game);
        game.save();
      })

    });
  },
  
  getIo: function() {return io}

};

generateRandomLetter = () => {
  var letter;
  var characters = "abcdefghijklmnopqrstuvwxyz"
  var randomNumber = Math.floor(Math.random() * characters.length);
  letter = characters[randomNumber];
  return letter.toUpperCase();
}

countWordScore = (word, challenge) => {
  var multiplier;
  if (challenge === 0) {
    multiplier = 2;
  } else if (challenge === 1) {
    multiplier = 3;
  } else if (challenge === 2) {
    multiplier = 3;
  } else if (challenge === 3) {
    multiplier = 4;
  } else {
    multiplier = 1;
  }
  var baseScore = word.length - 2;
  return baseScore * multiplier
}

// Fisher-Yates shuffle
shuffleChallenges = (challenges) => {
  var currentIdx = challenges.length;
  var tempValue;
  var randomIdx;

  while (currentIdx !== 0) {
    randomIdx = Math.floor(Math.random() * currentIdx);
    currentIdx -= 1;

    tempValue = challenges[currentIdx];
    challenges[currentIdx] = challenges[randomIdx];
    challenges[randomIdx] = tempValue;
  }
}