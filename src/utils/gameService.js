import tokenService from './tokenService';

const BASE_URL = 'api/games';

export default {
    createGame
};

function createGame() {
    return fetch(BASE_URL, getAuthRequestOptions('POST'))
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Authorization Required');
    })
    .then(game => game);
}

/*--- Helper Functions ---*/

function getAuthRequestOptions(method) {
    return {
        method,
        headers: new Headers({'Authorization': 'Bearer ' + tokenService.getToken()}) 
    };
}