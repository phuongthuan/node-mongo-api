const express = require('express');
const bodyParser = require('body-parser');
const colors = require('colors');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {Report} = require('./models/report');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/reports', (req, res) => {
  console.log(req.body);
});

app.get('/reports', (req, res) => {

});

app.get('/users', (req, res) => {
  User.find().then(users => {
    res.send({users});
  }, err => {
    res.status(400).send(err);
  })
});

app.get('/users/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send({error: "id is invalid"})
  }

  User.findById(id)
    .then(user => {
      if (!user) res.status(404).send({error: 'user not found'});
      res.send({user});
    })
    .catch(e => res.status(400).send());
});

app.post('/users', (req, res) => {
  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    avatar: req.body.avatar,
    address: req.body.address,
    phone: req.body.phone,
    division: req.body.division,
    password: req.body.password,
    role: req.body.role
  });

  user.save().then(user => {
    res.send(user);
  }, err => {
    res.status(400).send(err);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = {
  app
};

