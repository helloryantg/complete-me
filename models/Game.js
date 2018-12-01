const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new Schema({
    word: {type: String, default: ''},
    score: {type: Number, default: 0},
    challengeIndex: { type: Number, default: 0 }
})

const challengeSchema = new Schema({
    text: {type: String, default: 'Good Luck!'},
    multiplier: {type: Number, default: 1},
    color: {type: String, default: 'grey'}
})

const playerSchema = new Schema({
    id: String,
    name: String,
    time: {type: Number, default: 30},
    wordList: [wordSchema],
});

const gameSchema = new Schema({
    players: [playerSchema],
    challenges: [challengeSchema],
    turnIdx: {type: Number, default: 0},
    currentWord: {type: String, default: ''}
});

module.exports = mongoose.model('Game', gameSchema);