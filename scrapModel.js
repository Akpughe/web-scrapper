const mongoose = require('mongoose');

const JobsSchema = new mongoose.Schema({
  company: {
    type: String,
  },
  position: {
    type: String,
  },
  tag: {
    type: String,
  },
  link: {
    type: String,
  },
  //   data:[]
});

module.exports = Jobs = mongoose.model('jobs', JobsSchema);
