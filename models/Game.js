const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new Schema({
    word: String,
    score: Number,
    challengeIndex: { type: Number, default: 0 }
})

const challengeSchema = new Schema({
    text: String,
    multiplier: Number
})

const gameSchema = new Schema({
    playerOne: [wordSchema],
    playerTwo: [wordSchema],
    challenges: [challengeSchema],
    playerOneTurn: Boolean
});

module.exports = mongoose.model('Game', gameSchema);