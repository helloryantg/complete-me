const Game = require('./models/game');

let io;
var games = {};

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
        // check if the user attempts to start a new game

        // When a user sends a new game messege on the server - werite a routine that goes through and checks
        // to see if there is any game in the games object with the id 
        var game = new Game();
        game.players.push({
          name: user.name,
          id: user._id,
        });
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
        game.players[0].wordList.push({
          word: game.currentWord
        });
        game.currentWord = '';
        io.to(game.id).emit('gameData', game);
        game.save();
      })
      
      socket.on('backspace', function() {
        var game = games[socket.gameId];
        var removedLast = game.currentWord.substring(0, game.currentWord.length - 1);
        game.currentWord = removedLast;
        io.to(game.id).emit('gameData', game);
        game.save();
      })


    });
  },
  
  getIo: function() {return io}

};

// game.save