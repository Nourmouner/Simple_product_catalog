const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A category must have a name'],
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Middleware for setting new category via admin (extend the categories)
categorySchema.pre('save', function (next) {
  // Make sure that new categories can be added later
  if (!['furniture', 'electrical'].includes(this.name.toLowerCase())) {
    console.log(`Custom category "${this.name}" added!`);
  }
  next();
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
