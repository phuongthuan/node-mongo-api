const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');

const {User} = require('./../server/models/user');
const {Report} = require('./../server/models/report');

// User.deleteMany({})
//   .then((result) => console.log(result));

User.deleteOne({_id: '5b98e13b430d2d30bc496fdf'})
  .then(res => console.log(res));











