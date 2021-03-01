//require Mongoose to easily access database documents
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create new Gamelog schema/document for the database
const gamelogSchema = new Schema({
    playtime: { type: Number, required: true },
    winner: { type: String, required: true },
    loser: { type: String, required: true },
    date: { type: Date, required: true },
    playerX: { type: String, required: true },
    playerO: { type: String, required: true },
}, {
    timestamps: true,
});

//export gamelog model
const Gamelog = mongoose.model('Gamelog', gamelogSchema);

module.exports = Gamelog;