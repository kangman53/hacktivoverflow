const { Question } = require('../models');
const TagController = require('./tags');

class QuestionController {
  static getQuestions (req, res) {
    Question.find({})
      .populate('tags')
      .populate({ path: 'userId', select:'fullname' })
      .sort({_id: 'descending'})
      .exec()
      .then(questions => {
          res.status(200).json(questions);
        })
      .catch(error => {
        res.status(500).json({
          error: 'INTERNAL SERVER ERROR',
          message: error.message
        });
      })
  }

  static getQuestionDetail (req, res) {
    Question.findById(req.params.id)
      .populate('tags')
      .populate('userId')
      .populate(
        {
          path: 'answers', 
          populate: {
            path: 'userId',
            select: 'fullname'
          },
          options: {
            sort: {
              createdAt: 'descending'
            }
          }
        })
      .then(question => {
        res.status(200).json(question)
      })
      .catch(error => {
        res.status(500).json({
          error: 'INTERNAL SERVER ERROR',
          message: error.message
        })
      })
  }

  static tag (req, res) {
    Question.find({
      tags: req.params.tagId
    })
    .populate('tags')
    .populate({ path: 'userId', select:'fullname' })
    .sort({_id: 'descending'})
    .exec()
      .then(questions => {
        res.status(200).json(questions)
      })
      .catch(error => {
        res.status(500).json({
          error: 'INTERNAL SERVER ERROR',
          message: error.message
        })
      })
  }

  static addQuestion (req, res) {
    TagController.generator(req.body.tags)
      .then(results => {
        let tags = results.map( r => {
          return r._id
        })
        return Question.create({
          userId: req.user.id,
          title: req.body.title,
          description: req.body.description,
          tags: tags
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
    let updateQuestion = req.body
    Question.findByIdAndUpdate(req.params.id, {
      title: updateQuestion.title,
      description: updateQuestion.description
    }, {
      new: true
    })
      .then(question => {
        if (question) {
          res.status(200).json(question)
        } else {
          res.status(400).json({
            error: 'QUESTION NOT FOUND'
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
    Question.findByIdAndDelete(req.params.id)
    .then(question => {
      if (question) {
        res.status(200).json(question)
      } else {
        res.status(400).json({
          error: 'QUESTION NOT FOUND'
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
    let vote = null;
    status === 'upvote' ? vote = 1 : vote = -1;
    let questionId = req.params.questionId;
    let userId = req.user.id
    Question.findById(questionId)
      .then(question => {
        if (question) {
          let index = question.votes.findIndex(v => {
            return v.userId.toString() === userId.toString();
          })
          if (index < 0) {
            question.votes.push({
              userId: userId,
              status: vote
            })
          } else {
            if (question.votes[index].status == vote) {
              question.votes = question.votes.filter(v => {
                return v.userId.toString() != userId.toString();
              })
            } else {
              question.votes[index].status = vote;
            }
          }
          question.save();
          res.status(200).json(question)
        } else {
          res.status(400).json({
            error: 'QUESTION NOT FOUND',
            message: 'Please insert correct question id'
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

module.exports = QuestionController;