//require Mongoose
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create new Player schema/document for the database
const playerSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
}, {
  timestamps: true,
});

//export Player model
const Player = mongoose.model('Player', playerSchema);

module.exports = Player;