const express = require('express');
const router = express.Router();
const gamesCtrl = require('../../controllers/games');

router.get('/', gamesCtrl.getAllGames);

module.exports = router;