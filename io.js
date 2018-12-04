const Game = require('./models/game');
var rp = require('request-promise-native');

const API_URL = 'http://api.datamuse.com/words?'

let io;
var games = {};
var dogs;
var ghosts;

(async function() {
  dogs = await fetchObjects('dogs');
  ghosts = await fetchObjects('ghosts');
})();

function fetchObjects(category) {
  var options = {
    uri: `${API_URL}rel_trg=${category}`,
    headers: { 'User-Agent': 'Request-Promise'},
    json: true
    // resolveWithFullResponse: true
  }
  return rp(options)
    .then(items => items)
    .catch(err => console.log(err));
}

const challengesList = [
  {
    text: 'Words that start and end with the same letter',
    multiplier: 2,
    color: 'DA5700',
    code: 'SLT'
  },
  {
    text: 'Words that are 7 letters long',
    multiplier: 3,
    color: '56A7FF',
    code: 'SLL'
  },
  {
    text: 'Words strongly associated with dogs',
    multiplier: 3,
    color: '56A7FF',
    code: 'WAD'
  },
  {
    text: 'Words that describe ghosts',
    multiplier: 4,
    color: '008E7D',
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
      
      socket.on('createGame', async function(user) {
        var game = new Game();
        game.players.push({
          name: user.name,
          id: user._id,
        });
        var randomLetter = generateRandomLetter();
        game.currentWord += randomLetter;
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
      });
      
      socket.on('onEnter', async function() {
        var game = games[socket.gameId];
        
        var options = {
          uri: `${API_URL}sp=${game.currentWord}`,
          headers: { 'User-Agent': 'Request-Promise'},
          json: true 
        };
        var words = await rp(options).then(items => items);
        checkForMatch(words);

        // Since we are getting an array of words spelled similarly to the word in question,
        // find a word that is spelled exactly as the currentWord
        // if there is a match - check the 4 current challenges for a match
        // if not, return the rendered letter - which was the last letter of the previous word
        function checkForMatch(words) {
          console.log(words[0].word);
          console.log(game.currentWord.toLowerCase());
          if (words[0].word === game.currentWord.toLowerCase()) {
            checkChallenges(game)
          } else {
            game.currentWord = game.currentWord[game.currentWord.length - 1];
            io.to(game.id).emit('gameData', game);
            game.save();
          }
        }

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
      })
      
      socket.on('cancelGame', function(user) {
        var game = games[socket.gameId];
        delete game;
        io.emit('gameData');
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

function checkChallenges(game) {
  let wordStruct = {
    word: game.currentWord,
    score: 0,
    challenges: []
  };
  game.challenges.forEach(challenge => {
    switch (challenge.code) {
      case 'SLT':
        console.log('SLT');
        if (word[0] === word[word.length - 1]) {
          wordStruct = {
            word: game.currentWord,
            score: countWordScore(game, 'SLT'), // add countwordscore to the previous score
            challenges: game.challenges.push(challenge)
          };
        } 
        break;

      case 'SLL':
        if (word.length === 7) {
          console.log('SLL');
          wordStruct = {
            word: game.currentWord,
            score: countWordScore(game, 'SLL'),
            challenges: game.challenges.push(challenge)
          }
        }
        break;

      case 'WAD':
        // dogs
        console.log('WAD');
        var dog = dogs.find(d => d.word === word);
        if (!dog) return;
        wordStruct = {
          word: game.currentWord,
          score: countWordScore(game, 'SLT'),
          challenges: game.challenges.push(challenge)
        }
        break;
      
      case 'WDG':
        // ghosts
        console.log('WDG');
        var ghost = ghosts.find(g => g.word === word);
        if (!ghost) return;
        wordStruct = {
          word: game.currentWord,
          score: countWordScore(game, 'WDG'),
          challenges: game.challenges.push(challenge)
        }   
        break;

      default:
        wordStruct = {
          word: game.currentWord,
          score: game.currentWord.length - 2,
          challenges: []
        };
    }
  });
}

countWordScore = (game, code) => {
  var word = game.currentWord;
  var baseScore = word.length - 2;
  var multiplier = game.challenges.find(c => c.code === code).multiplier; 
  var multiplyBy = !multiplier ? 1 : multiplier;
  return baseScore * multiplyBy;
}



// function pushNewWord(word, challenge) {
//   var game = games[socket.gameId];
//   var wordList = game.turnIdx ? game.players[1].wordList : game.players[0].wordList;
//   wordList.push({
//     word,
//     score: countWordScore(word, challenge.multiplier),
//     challenges: game.wordList.word.push(challenge)
//   });
//   game.currentWord = game.currentWord[game.currentWord.length - 1];
//   game.turnIdx = game.turnIdx ? 0 : 1;
//   io.to(game.id).emit('gameData', game);
//   game.save();
// }
