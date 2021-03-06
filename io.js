const Game = require('./models/game');
const rp = require('request-promise-native');

const API_URL = 'https://api.datamuse.com/words?'

let io;
let games = {};
let dogs;
let ghosts;

// Fetch categories from the api url
(async function() {
  dogs = await fetchObjects('dogs');
  ghosts = await fetchObjects('ghosts');
})();

function fetchObjects(category) {
  let options = {
    uri: `${API_URL}rel_trg=${category}`,
    headers: { 'User-Agent': 'Request-Promise' },
    json: true
  }
  return rp(options)
    .then(items => items)
    .catch(err => console.log(err));
}

// List of challenges. Only two are chosen at random per game
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
    text: 'Words that are 3 letters long',
    multiplier: 5,
    color: 'DA5700',
    code: 'TLL'
  },
  {
    text: 'DO NOT Use Words that are 4 letters long',
    multiplier: -2,
    color: 'DA5700',
    code: 'NEG'
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

      // Find active game using userId
      socket.on('getActiveGame', function(userId) {
        let game = Object.values(games).find(g => g.players.some(p => p.id === userId));
        if (game) {
          socket.gameId = game._id;
          socket.join(game._id);
        }
        io.emit('gameData', game);
      });
      
      // Create a new game and push the user to the game object
      socket.on('createGame', async function(user) {
        let game = new Game();
        game.players.push({
          name: user.name,
          id: user._id,
        });
        let randomLetter = generateRandomLetter();
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
      
      // Find current active game with the gameCode and push new user to the game object
      socket.on('joinGame', function(user, gameCode) {
        let game = games[gameCode];
        game.players.push({
          name: user.name,
          id: user._id
        });
        socket.join(gameCode);
        socket.gameId = game.id;
        io.to(game.id).emit('gameData', game);
        game.save();
      });

      socket.on('characterPressed', function(character) {
        let game = games[socket.gameId];
        if (!game) return;
        game.currentWord += character;
        io.to(game.id).emit('gameData', game);
      });
      
      socket.on('onBackspace', function() {
        let game = games[socket.gameId];
        if (!game) return;
        if (game.currentWord.length < 2) return;
        let removedLast = game.currentWord.substring(0, game.currentWord.length - 1);
        game.currentWord = removedLast;
        io.to(game.id).emit('gameData', game);
        game.save();
      });

      socket.on('countDown', function() {
        let game = games[socket.gameId];
        if (!game) return;
        if (game.players[game.turnIdx].time > 0) game.players[game.turnIdx].time--;
        io.to(game.id).emit('gameData', game);
        if (!game.players[0] && !game.players[1]) {
        delete games[socket.gameId];
        }
      });
      
      socket.on('cancelGame', function(user) {
        delete games[socket.gameId];
        io.to(socket.gameId).emit('gameData', null);
      });

      socket.on('onEnter', async function() {
        let game = games[socket.gameId];
        
        let mergedList = [];
        game.players[0].wordList.forEach(function(wordObj, idx) {
            mergedList.push(wordObj.word);
            if (game.players[1].wordList[idx]) mergedList.push(game.players[1].wordList[idx].word);
        });

        if (mergedList.find(word => word === game.currentWord)) {
          game.currentWord = game.currentWord[0];
          io.to(game.id).emit('gameData', game);
          game.save();
        } else {
          let options = {
            uri: `${API_URL}sp=${game.currentWord}`,
            headers: { 'User-Agent': 'Request-Promise'},
            json: true 
          };
          let words = await rp(options).then(items => items);
  
          if (words[0].word === game.currentWord.toLowerCase()) {
            checkChallenges(game);
          } else {
            game.currentWord = game.currentWord[0];
            io.to(game.id).emit('gameData', game);
            game.save();
          }
        }
      });

    });
  },
  getIo: function() {return io}
};

generateRandomLetter = () => {
  let letter;
  let characters = "aaabbccddeeeffgghhiiijjkkkllmmnnooppqrrssttuuvvwwxyz"
  let randomNumber = Math.floor(Math.random() * characters.length);
  letter = characters[randomNumber];
  return letter.toUpperCase();
}

// Fisher-Yates shuffle
shuffleChallenges = (challenges) => {
  let currentIdx = challenges.length;
  let tempValue;
  let randomIdx;
  
  while (currentIdx !== 0) {
    randomIdx = Math.floor(Math.random() * currentIdx);
    currentIdx -= 1;
    tempValue = challenges[currentIdx];
    challenges[currentIdx] = challenges[randomIdx];
    challenges[randomIdx] = tempValue;
  }
}

function checkChallenges(game) {
  let word = game.currentWord;
  let baseScore = game.currentWord.length - 2;
  let wordStruct = {
    word: game.currentWord,
    score: baseScore,
    challenges: []
  };
  game.challenges.forEach(challenge => {
    switch (challenge.code) {
      case 'SLT':
      if (word[0] === word[word.length - 1]) {
            wordStruct.score += baseScore * challenge.multiplier - baseScore,
            wordStruct.challenges.push(challenge)
        } 
        break;

      case 'SLL':
        if (word.length === 7) {
            wordStruct.score += baseScore * challenge.multiplier - baseScore,
            wordStruct.challenges.push(challenge)
        }
        break;
        
        case 'TLL':
          if (word.length === 3) {
            wordStruct.score += baseScore * challenge.multiplier - baseScore,
            wordStruct.challenges.push(challenge)
          }
          break;

        case 'NEG':
          if (word.length === 4) {
            wordStruct.score += baseScore * challenge.multiplier - baseScore,
            wordStruct.challenges.push(challenge)
          }
          break;
          
      case 'WAD':
        let dog = dogs.find(d => d.word.toUpperCase() === word);
        if (!dog) return;
          wordStruct.score += baseScore * challenge.multiplier - baseScore,
          wordStruct.challenges.push(challenge)
        break;
      
      case 'WDG':
        let ghost = ghosts.find(g => g.word.toUpperCase() === word);
        if (!ghost) return;
          wordStruct.score += baseScore * challenge.multiplier - baseScore,
          wordStruct.challenges.push(challenge)        
        break;
    }
    
  });
  let wordList = game.turnIdx ? game.players[1].wordList : game.players[0].wordList;
  wordList.push(wordStruct);
  game.currentWord = game.currentWord[game.currentWord.length - 1];
  if (game.players[game.turnIdx].time > 0) game.turnIdx = game.turnIdx ? 0 : 1;
  if (!game.players[0].time) game.turnIdx = 1;
  if (!game.players[1].time) game.turnIdx = 0;
  io.to(game.id).emit('gameData', game);
  game.save();
}