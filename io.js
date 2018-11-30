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
        var game = new Game();
        game.players.push({
          name: user.name,
          id: user._id,
        });
        game.save(function(err) {
          socket.gameId = game.id;
          socket.join(game.id);
          io.to(game.id).emit('gameData', game);
        });
      });

      socket.on('joinGame', function(userId, gameCode) {
        var game = Object.values(games).find(g => g._id.some(p => p.id === userId));
        if (game) {
          socket.join(game._id);
        }
        io.emit('gameData', game);
      })

    })
  },
  
  getIo: function() {return io}

};

// game.save

//   socket.on('register-player', function(initials) {
//     players[socket.id] = initials;
//     io.emit(
//         'update-player-list',
//         Object.values(players) 
//     );       
// });

// socket.on('disconnect', function() {
//     delete players[socket.id];
//     io.emit(
//         'update-player-list',
//         Object.values(players) 
//     );       
// });