var express = require('express');
var path = require('path');
var mysql = require('mysql');
var bodyParser = require('body-parser');

// database connection
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'expressjs'
});

// log to see if it is successful
connection.connect(function(err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
  }
  else {
    console.log('Successful connection to the database');
  }
});

// init app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// home route
app.get('/', function(req, res) {
  var row = [];
  connection.query('SELECT * FROM profile', function(err, rows, fields) {
    if (err) {
      throw err;
    }
    else {
      res.render('index', {
        title: 'Names',
        names: rows
      });
    }
  });
});

// get add page
app.get('/add', function(req, res) {
  id = req.query.id;

  if (id) {
    connection.query('SELECT * FROM profile WHERE profile_id = ' + id, function(err, rows, fields) {
      if (err) {
        throw err;
      }
      else {
        res.render('add', {
          title: 'Update Name',
          id: rows[0].profile_id,
          name: rows[0].profile_name
        });
      }
    });
  }
  else {
    res.render('add', {
      title: 'Add Name'
    });
  }
});

// post add page
app.post('/add', function(req, res) {
  var id = req.body.id;
  var name = req.body.name;

  if (id) {
    connection.query('UPDATE profile SET profile_name = \'' + name + '\' WHERE profile_id = ' + id, function(err) {
      if (err) {
        throw err;
      }
      else {
        console.log('Successfully updated!');
      }
    });
  }
  else {
    connection.query('INSERT INTO profile (profile_name) VALUES (\'' + name + '\')', function(err) {
      if (err) {
        console.log(err.sql);
        throw err;
      }
      else {
        console.log('Successfully inserted!');
      }
    });
  }

  res.redirect('/');
});

// post update page
app.post('/update', function(req, res) {
  var id = req.body.id;
  res.redirect('/add?id=' + id);
});

// post delete page
app.post('/delete', function(req, res) {
  var id = req.body.id;

  connection.query('DELETE FROM profile WHERE profile_id = ' + id, function(err) {
    if (err) {
      throw err;
    }
    else {
      console.log('Successfully deleted!');
    }
  });

  res.redirect('/');
});

app.listen(3000, function () {
  console.log('Listening at port 3000');
});

module.exports = app;
