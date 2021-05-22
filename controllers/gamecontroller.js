const router = require('express').Router();
const Game = require('../db').import('../models/game');

function errorHandle(err) {
  res.status(500).send({
    message: err.message,
  });
}

router.get('/all', (req, res) => {
  Game.findAll({ where: { owner_id: req.body.user.id } }).then((games) => {
    res.status(200).json({
      games: games,
      message: 'Data fetched.',
    });
  }, errorHandle);
});

router.get('/:id', (req, res) => {
  Game.findOne({
    where: { id: req.params.id, owner_id: req.body.user.id },
  }).then((game) => {
    res.status(200).json({
      game: game,
    });
  }, errorHandle);
});

router.post('/create', (req, res) => {
  Game.create({
    title: req.body.game.title,
    owner_id: req.body.user.id,
    studio: req.body.game.studio,
    esrb_rating: req.body.game.esrb_rating,
    user_rating: req.body.game.user_rating,
    have_played: req.body.game.have_played,
  }).then((game) => {
    res.status(200).json({
      game: game,
      message: 'Game created.',
    });
  }, errorHandle);
});

router.put('/update/:id', (req, res) => {
  Game.update(
    {
      title: req.body.game.title,
      studio: req.body.game.studio,
      esrb_rating: req.body.game.esrb_rating,
      user_rating: req.body.game.user_rating,
      have_played: req.body.game.have_played,
    },
    {
      where: {
        id: req.params.id,
        owner_id: req.body.user.id,
      },
    }
  ).then((game) => {
    res.status(200).json({
      game: game,
      message: 'Successfully updated.',
    });
  }, errorHandle);
});

router.delete('/remove/:id', (req, res) => {
  Game.destroy({
    where: {
      id: req.params.id,
      owner_id: req.body.user.id,
    },
  }).then((game) => {
    res.status(200).json({
      game: game,
      message: 'Successfully deleted',
    });
  }, errorHandle);
});

module.exports = router;
