const router = require('express').Router();
let Statistic = require('../models/Statistic.model');

router.route('/').get((req, res) => {
    Statistic.find()
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

  router.route('/update/:id').post((req, res) => {
    Statistic.findOneAndUpdate( {'name': req.params.id})
      .then(stat=> {
          stat.value = req.body.newValue;
  
        stat.save()
          .then(() => res.json('stat updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  module.exports = router;