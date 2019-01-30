const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  userId: {
    type: 'ObjectId',
    ref: 'User'
  },
  title: String,
  description: String,
  tags: [],
  answers: [{
    type: 'ObjectId',
    ref: 'Answer'
  }],
  votes: [
    {
      userId: {
        type: 'ObjectId',
        ref: 'User'
      },
      status: Number
    }
  ],
  tags: [
    {
      type: 'ObjectId',
      ref: 'Tag'
    }
  ]
}, {
  timestamps: {}
})

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;