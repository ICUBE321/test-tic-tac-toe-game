const router = require('express').Router();
let Gamelog = require('../models/gamelog.model');

router.route('/').get((req, res) => {
    Gamelog.find()
        .then(gamelogs => res.json(gamelogs))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const playtime = req.body.playtime;
    const winner = req.body.winner;
    const loser = req.body.loser;
    const date = Date.parse(req.body.date);
    const playerX = req.body.playerX;
    const playerO = req.body.playerO;

    const newGamelog = new Gamelog({
        playtime,
        winner,
        loser,
        date,
        playerX,
        playerO,
    });

    newGamelog.save()
    .then(() => res.json('Gamelog added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

