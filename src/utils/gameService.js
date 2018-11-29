import tokenService from './tokenService';

const BASE_URL = '/api/games';

export default {
    createGame
};

function createGame(game) {
    var options = getAuthRequestOptions('POST');
    options.body = JSON.stringify(game);
    fetch(BASE_URL, options);
}

/*--- Helper Functions ---*/

function getAuthRequestOptions(method) {
    var options = {
        method,
        headers: new Headers({'Authorization': 'Bearer ' + tokenService.getToken()}) 
    };
    if (method === 'POST') options.headers.append('Content-Type', 'application/json');
    return options;
}