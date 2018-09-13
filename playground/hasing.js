// const {SHA256} = require('crypto-js');
//
// const message = 'Welcome';
//
// const hash = SHA256(message).toString();
//
// console.log(hash);

const jwt = require('jsonwebtoken');

const data = {
  id: 1
};


const token = jwt.sign(data, 'secret');

console.log('token', token);

const decoded = jwt.verify(token, 'secret');

console.log('decoded', decoded);
