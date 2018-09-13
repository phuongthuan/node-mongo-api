const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {User} = require('./../server/models/user');

const id = '5b98c2cb340a2e24688ca34a';

if (!ObjectID.isValid(id)) {
  console.log('Id not valid');
}

User.find({
  _id: id
}).then(res => {
  console.log('find', res)
});

User.findOne({
  _id: id
}).then(res => {
  console.log('findOne', res)
});

User.findById(id)
  .then(user => {
    if (!user) {
      console.log('Id not found');
    } else {
      console.log('findById', user)
    }
  })
  .catch(err => console.log(err));









