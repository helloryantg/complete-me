// import tokenService from './tokenService';
import socket from './socket';

// const BASE_URL = '/api/games';

export default {
    createGame,
    joinGame
};

function createGame(user) {
    socket.emit('createGame', user);
}

function joinGame(user, code) {
    socket.emit('joinGame', user, code);
}

/*--- Helper Functions ---*/

// function getAuthRequestOptions(method) {
//     var options = {
//         method,
//         headers: new Headers({'Authorization': 'Bearer ' + tokenService.getToken()}) 
//     };
//     console.log(options);
//     if (method === 'POST') options.headers.append('Content-Type', 'application/json');
//     return options;
// }