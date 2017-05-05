var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/crud-app';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/users', (req, res) => {
  MongoClient.connect(url, (err, db) => {
    if (err) {
      console.log('Something went wrong: ', err)
    } else {
      console.log('Connected to DB');
      db
        .collection('users')
        .find({})
        .toArray((err, result) => {
          if (err) res.send(err)
          else if (result.length) {
            res.render('users', {
              "users": result
            });
          } else res.send('No users found');
          db.close();
        });
    }
  });
});

router.get('/adduser', (req, res) => {
  res.render('adduser', {title: 'Add new user'});
});
router.post('/newuser', (req, res) => {
  MongoClient.connect(url, (err, db) => {
    if (err) {
      console.log('Unable to connect', err)
    } else {
      console.log('Connected to server');
      var user1 = {
        user: req.body.user, 
        email: req.body.email, 
        password: req.body.password,
        avatar: req.body.avatar
      };
      db
      .collection('users')
      .insert([user1], (err, res) => {
        if (err) console.log(err)
        res.redirect("users")
      });
      db.close;
    }
  });
});

router.get('/edit:id', (req, res) => {
  res.render('edit', {title: 'Edit user', id: req.params.id});
});

router.put('/edituser:id', (req, res) => {
  MongoClient.connect(url, (err, db) => {
    if (err) {
      console.log('Unable to connect', err)
    } else {
      console.log('Connected to server');
      var user1 = {
        id: req.params.id,
        user: req.body.user, 
        email: req.body.email, 
        password: req.body.password,
        avatar: req.body.avatar
      };
      db
      .collection('users')
      .findOne({id});
      db
      .collection('users')
      .update([user1], (err, res) => {
        if (err) console.log(err)
        res.redirect("users")
      });
      db.close;
    }
  });
});

module.exports = router;
