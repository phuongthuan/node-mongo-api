const mongoose = require('mongoose');

const User = mongoose.model('Users', {
  email: {
    type: String,
    required: true,
    trim: true,
    minLength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: 1
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minLength: 1
  },
  avatar: {
    type: String,
    trim: true,
    minLength: 1
  },
  address: {
    type: String,
    required: true,
    trim: true,
    minLength: 1
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    minLength: 10
  },
  division: {
    type: String,
    required: true,
    trim: true,
    minLength: 1
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  role: {
    type: String,
    minLength: 1,
    enum: ['member', 'team_leader', 'group_leader'],
    default: 'member'
  }
});

module.exports = {User};