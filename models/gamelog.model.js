const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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

const Gamelog = mongoose.model('Gamelog', gamelogSchema);

module.exports = Gamelog;