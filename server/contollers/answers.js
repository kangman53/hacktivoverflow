const { Answer, Question } = require('../models');

class AnswerController {
  static create (req, res) {
    Answer
      .create({
        questionId: req.params.questionId,
        answer: req.body.answer,
        userId: req.user.id
      })
      .then(answer => {
        return   Question.findOneAndUpdate({
          _id: answer.questionId
        }, {
          $push: {answers: answer._id}
        }, {
          new: true
        })      
      })
      .then(question => {
        res.status(201).json(question)
      })
      .catch(error => {
        res.status(500).json({
          error: 'INTERNAL SERVER ERROR',
          message: error.message
        })
      })
  }

  static update (req, res) {
    Answer
      .findByIdAndUpdate(
        req.params.id,
        {
          answer: req.body.answer
        },
        {
          new: true
        })
        .then(answer => {
          if (answer) {
            res.status(200).json(answer)
          } else {
            res.status(400).json({
              error: 'ANSWER NOT FOUND'
            })
          }
        })
        .catch(error => {
          res.status(500).json({
            error: 'INTERNAL SERVER ERROR',
            message: error.message
          })
        })
  }

  static delete (req, res) {
    Answer
      .findById(req.params.id)
      .then(answer => {
        if (answer) {
          answer.remove();
          res.status(200).json(answer);
        } else {
          res.status(400).json({
            error: 'ANSWER NOT FOUND'
          })
        }
      })
      .catch(error => {
        res.status(500).json({
          error: 'INTERNAL SERVER ERROR',
          message: error.message
        })
      })
  }

  static votes (req, res) {
    let status = req.body.status;
    console.log(req.body);
    
    let vote = null;
    status === 'upvote' ? vote = 1 : vote = -1;
    let answerId = req.params.answerId;    
    let userId = req.user.id
    Answer.findById(answerId)
      .then(answer => {
        if (answer) {
          let index = answer.votes.findIndex(v => {
            return v.userId.toString() === userId.toString();
          })

          if (index < 0) {
            answer.votes.push({
              userId: userId,
              status: vote
            })
          } else {
            if (answer.votes[index].status == vote) {
              answer.votes = answer.votes.filter(v => {
                return v.userId.toString() != userId.toString();
              })
            } else {
              answer.votes[index].status = vote;
            }
          }
          answer.save();
          res.status(200).json(answer)
        } else {
          res.status(400).json({
            error: 'QUESTION NOT FOUND',
            message: 'Please insert correct answer id'
          })
        }
      })
      .catch(error => {
        res.status(500).json({
          error: 'INTERNAL SERVER ERROR',
          message: error.message
        })
      })
  }
}
module.exports = AnswerController;