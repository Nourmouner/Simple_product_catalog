const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'An option must have a name'],
    unique: true,
  },
  values: [{
    type: String,
    required: [true, 'An option must have at least one value'],
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Option = mongoose.model('Option', optionSchema);
module.exports = Option;