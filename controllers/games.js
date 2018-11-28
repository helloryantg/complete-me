const Game = require('../models/game');

module.exports = {
    getAllGames
}

function getAllGames(req, res, next) {
    Game.find({})
        .then(games => {res.json(games)});
}