let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let wordSchema = new Schema({

});

module.exports = mongoose.model('Word', wordSchema);