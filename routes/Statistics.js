const router = require('express').Router();
let Statistic = require('../models/Statistic.model');

  router.route('/').get((req, res) => {
    Statistic.find()
      .then(statistics => res.json(statistics))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/:id').get((req, res) => {
    Statistic.findOne({name: req.params.id})
      .then(statistics => res.json(statistics))
      .catch(err => res.status(400).json('Error: ' + err));
  });



  router.route('/add').post((req, res) => {
    const name = req.body.name;
    const value = req.body.value;
  
    const newStat = new Statistic({name, value});
  
    newStat.save()
      .then(() => res.json('new stat added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/update').post((req, res) => {
    Statistic.findOneAndUpdate( {name: req.body.name})
      .then(stat=> {
          stat.value = req.body.newValue;
  
        stat.save()
          .then(() => res.json('stat updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/delete/:id').delete((req, res) => {
    Statistic.findOneAndDelete( {name: req.params.id})
          .then(() => res.json('stat updated!'))
          .catch(err => res.status(400).json('Error: ' + err));

  });
  
  module.exports = router;