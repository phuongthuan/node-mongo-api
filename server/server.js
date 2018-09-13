require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const colors = require('colors');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {Report} = require('./models/report');

const app = express();

app.use(bodyParser.json());


/*===========================================
 GET REQUEST
 ===========================================*/
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


/*===========================================
 POST REQUEST
 ===========================================*/
app.post('/reports', (req, res) => {
  console.log(req.body);
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


/*===========================================
 PATCH REQUEST
 ===========================================*/
app.patch('/users/:id', (req, res) => {
  const id = req.params.id;

  // Only allow modify 'firstName', 'lastName', 'address', 'avatar', 'phone', 'password':
  const body = _.pick(req.body, ['firstName', 'lastName', 'address', 'avatar', 'phone', 'password']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  User.findOneAndUpdate({_id: id}, {$set: body}, {new: true})
    .then(user => {
      if (!user) return res.status(404).send({error: 'user not found'});
      res.send({user});
    })
    .catch(err => res.status(400).send());
});


/*===========================================
 DELETE REQUEST
 ===========================================*/

app.delete('/users/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send({error: "id not valid"});
  }

  User.findOneAndDelete({_id: id})
    .then(user => {
      if (!user) res.status(404).send({error: 'user not found'});
      res.send({user});
    })
    .catch(e => res.status(400).send());
});



/*===========================================
 AUTH REQUEST
 ===========================================*/
app.post('/auth', (req, res) => {

  const body = _.pick(req.body, ['email', 'password']);

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















/*===========================================
 START SERVER
 ===========================================*/
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

module.exports = {
  app
};

