var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  let names = [
    {
        id: 1,
        name: 'John Doe'
    },
    {
        id: 2,
        name: 'Rico Maglayon'
    },
    {
        id: 3,
        name: 'Angelo Alimboyao'
    }
  ]
  res.render('index', {
    title: 'Names',
    names: names
  });
});

/* GET add page. */
router.get('/add', function(req, res) {
  res.render('add', {
    title: 'Add Name'
  });
});

module.exports = router;
