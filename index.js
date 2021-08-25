//Setting up the backend using Express

const express = require("express");
const cors = require("cors"); 
const mongoose = require('mongoose');//use mongoose for easy use of MongoDB 

require('dotenv').config();//to add environmental variables

//create express app
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;//database connection string

//connect to the database
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
}) 

//use established routes
const gamelogRouter = require('./routes/gamelog');
const playerRouter = require('./routes/player')

//use routes to get frontend requests and process them
app.use('/api/gamelog', gamelogRouter);
app.use('/api/player', playerRouter);

//...other imports
const path = require("path")

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

//server listens on port
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});