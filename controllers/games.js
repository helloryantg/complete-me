const Game = require('../models/game');

module.exports = {
    createGame,
}

function createGame(req, res) {
    Game.create(req.body)
    .then(game => {
        res.json(game);
    })
    .catch(err => {
        res.json({error: err});
    });
}   

// function getAllGames(req, res, next) {
//     Game.find({})
//         .then(games => {res.json(games)});
// }