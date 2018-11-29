module.exports = function(httpServer) {
  const io = require('socket.io')(httpServer);
  
  var games = {};

  io.on('connection', function(socket) {
    socket.on('gameData', function(game) {
      io.emit('gameData', game);
    });
  });
};

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