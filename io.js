const Game = require('./models/game');
var rp = require('request-promise');

const API_URL = 'http://api.datamuse.com/words?'

let io;
var games = {};

const challengesList = [
  {
    text: 'Words that start and end with the same letter',
    multiplier: 2,
    color: 'DA70D6',
    code: 'SLT'
  },
  {
    text: 'Words that are 7 letters long',
    multiplier: 3,
    color: 'BA55D3',
    code: 'SLL'
  },
  {
    text: 'Words strongly associated with dogs',
    multiplier: 3,
    color: 'FF00FF',
    code: 'WAD'
  },
  {
    text: 'Words that describe ghosts',
    multiplier: 4,
    color: '9400D3',
    code: 'WDG'
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
      
      socket.on('onEnter', function() {
        var game = games[socket.gameId];
        
        rp(`${API_URL}sp=${game.currentWord}`)
          .then(res => res.json())
          .then(word => console.log(word))
          .catch(err => console.log(err));

        function checkForMatch(word) {
          var match = word.toUpperCase() === game.currentWord;
          if (match) {
              checkChallenges(word);
          } else {
            game.currentWord = game.currentWord[0];
            io.to(game.id).emit('gameData', game);
            game.save();
          }
        }

        // var wordList = game.turnIdx ? game.players[1].wordList : game.players[0].wordList;
        // wordList.push({
        //     word: game.currentWord,
        //     score: countWordScore(game.currentWord)
        // });
        // game.currentWord = game.currentWord[game.currentWord.length - 1];
        // game.turnIdx = game.turnIdx ? 0 : 1;
        // io.to(game.id).emit('gameData', game);
        // game.save();
      });
      
      socket.on('onBackspace', function() {
        var game = games[socket.gameId];
        if (game.currentWord.length < 2) return;
        var removedLast = game.currentWord.substring(0, game.currentWord.length - 1);
        game.currentWord = removedLast;
        io.to(game.id).emit('gameData', game);
        game.save();
      });

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

countWordScore = (word, multiplier) => {
  var baseScore = word.length - 2;
  return baseScore * multiplier;
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

function checkChallenges(word) {
  var game = games[socket.gameId];
  game.challenges.forEach(challenge => {
      
    switch (challenge.code) {
      case 'SLT':
        if (word[0] === word[word.length - 1]) {
          pushNewWord(word, challenge.code === 'SLT')
        } 
        break;
      case 'SLL':
        if (word.length === 7) {
          pushNewWord(word, challenge.code === 'SLL')
        }
        break;
      case 'WAD':
        var matchDogs = request(`${API_URL}rel_trg=dogs`)
          .then(res => res.json())
          .then(words => words.find(w => w.word.toUpperCase() === word));
          if (matchDogs) pushNewWord(matchDogs, challenge.code === 'WAD')
        break;

      case 'WDG':
        var matchGhosts = request(`${API_URL}rel_trg=ghosts`)
          .then(res => res.json())
          .then(words => words.find(w => w.word.toUpperCase() === game.currentWord));
          if (matchGhosts) pushNewWord(matchGhosts, challenge.code === 'WDG')
        break;
    }
  });
}

function pushNewWord(word, challenge) {
  var game = games[socket.gameId];
  var wordList = game.turnIdx ? game.players[1].wordList : game.players[0].wordList;
    wordList.push({
        word,
        score: countWordScore(word, challenge.multiplier),
        challenges: wordList.word.push(challenge)
    });
    game.currentWord = game.currentWord[game.currentWord.length - 1];
    game.turnIdx = game.turnIdx ? 0 : 1;
    io.to(game.id).emit('gameData', game);
    game.save();
}