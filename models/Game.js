const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new Schema({
    word: String,
    score: Number,
    time: Number,
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
    wordList: [wordSchema],
});

const gameSchema = new Schema({
    players: [playerSchema],
    challenges: [challengeSchema],
    turnIdx: {type: Number, default: 0}
});

module.exports = mongoose.model('Game', gameSchema);