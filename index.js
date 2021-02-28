const express = require("express");
const cors = require("cors"); 
const mongoose = require('mongoose');

require('dotenv').config();

//create express app
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const gamelogRouter = require('./routes/gamelog');
const playerRouter = require('./routes/player')

app.use('/gamelog', gamelogRouter);
app.use('/player', playerRouter);

//...other imports
const path = require("path")

//...other app.use middleware
app.use(express.static(path.join(__dirname, "client/build")))

//right before your app.listen(), add this:
app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname+"/client/build/index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});