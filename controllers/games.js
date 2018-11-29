const Game = require('../models/game');

module.exports = {
    createGame,
}

function createGame(req, res) {
    console.log(req.user);
    var game = new Game({
        user: req.user
    })
    game.save(function(err) {
        if (err) return handleError(err);
    })
    
    // Game.save()
    // .then(game => {
    //     res.json(game);
    // })
    // .catch(err => {
    //     res.json({error: err});
    // });
}   

// function getAllGames(req, res, next) {
//     Game.find({})
//         .then(games => {res.json(games)});
// }

// Waiting room component
// this.state.game.players.length > 1
