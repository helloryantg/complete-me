import socket from './socket';

export default {
    createGame,
    joinGame,
    cancelGame
};

function createGame(user) {
    socket.emit('createGame', user);
}

function joinGame(user, code) {
    socket.emit('joinGame', user, code);
}

function cancelGame(user) {
    socket.emit('cancelGame', user);
}