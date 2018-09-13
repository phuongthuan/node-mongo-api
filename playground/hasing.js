const jwt = require('jsonwebtoken');

const data = {
  id: 1
};

const token = jwt.sign(data, 'secret');

console.log('token', token);

const decoded = jwt.verify(token, 'secret');

console.log('decoded', decoded);
