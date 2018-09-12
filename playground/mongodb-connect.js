const mongodb = require('mongodb');

const {MongoClient, ObjectID} = mongodb;

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
  if (err) {
    console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected MongoDB Server');
  const db = client.db('TodoApp');
  db.collection('Users').find({
    _id: new ObjectID('5b7d2790e37c0c24e86d27c5')
  }).toArray().then(docs => {
    console.log('User: ', JSON.stringify(docs, undefined, 2));
  }, err => {
    console.log('Unable to fetch user', err);
  });
});