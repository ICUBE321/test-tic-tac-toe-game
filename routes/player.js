//require Express Router

const router = require('express').Router();

//use Player model for database document accessing
let Player = require('../models/player.model');

//processing of routes
router.route('/').get((req, res) => {
    Player.find()
        .then(players => res.json(players))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newPlayer = new Player({username});

    newPlayer.save()
        .then(() => res.json('Player added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//export Player router
module.exports = router;