const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  state: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
    required: false,
  },
  students: {
    type: Number,
    default: 0,
  },
  calification: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Course', CourseSchema);
