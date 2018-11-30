const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new Schema({
    word: String,
    score: Number,
    challengeIndex: { type: Number, default: 0 }
})

const challengeSchema = new Schema({
    text: String,
    multiplier: Number,
    color: String
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
    gameList: [String]
});

module.exports = mongoose.model('Game', gameSchema);