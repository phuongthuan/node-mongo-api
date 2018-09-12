const mongoose = require('mongoose');

const Report = mongoose.model('Reports', {
  userId: {
    type: String,
    required: true
  },
  emotion: {
    type: Object
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 1
  },
  achievement: {
    type: String,
    required: true,
    trim: true,
    minLength: 1
  },
  plan: {
    type: String,
    required: true,
    trim: true,
    minLength: 1
  },
  issues: {
    type: String,
    trim: true,
    minLength: 1
  },
  description: {
    type: String,
    trim: true,
    minLength: 1
  },
  comment: {
    type: String,
    trim: true,
    minLength: 1
  }
});

module.exports = {
  Report
};
