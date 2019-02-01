const { User } = require('../models');
const { bcrypt, jwt } = require('../helpers');
const kue = require('kue');
const queue = kue.createQueue();
const TagController = require('./tags');

class UserController {
  static register (req, res) {
    User.create({
      fullname: req.body.fullname,
      email: req.body.email,
      password: req.body.password
    })
      .then(user => {
        const emailJob = queue.create('sendEmail', {
          title: 'Congratulations !!! Welcome to HacktivOverflow',
          email: user.email,
          message: `<h1> Welcome ${user.email}, Thanks for Register to our website!</h1>`
        })
          // .removeOnComplete(true)
          .save()
        emailJob.on('failed', (errorMessage) => {
          console.log(JSON.parse(errorMessage));
        })
        res.status(201).json(user)
      })
      .catch(error => {
        if (error.name == 'ValidationError') {
          res.status(400).json({
            error: 'VALIDATOR ERROR',
            message: error.errors
          })
        } else {
          res.status(500).json({
            error: 'INTERNAL SERVER ERROR',
            message: error.message
          })
        }
      })
  }

  static login (req, res) {
    User.findOne({
      email: req.body.email
    })
      .populate('tags')
      .then(user => {
        if (user && bcrypt.comparePassword(req.body.password, user.password)) {
          let token = jwt.jwtSign({
            id: user._id
          })
          res.status(200).json({
            id: user._id,
            token: token,
            fullname: user.fullname,
            email: user.email,
            tags: user.tags
          })
        } else {
          res.status(400).json({
            error: 'LOGIN FAILED',
            message: 'Wrong Username / Password'
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

  static checkToken (req, res) {
    return res.status(200).json(req.user)
  }

  static addTag (req, res) {
    TagController.generator(req.body.tags)
      .then(results => {
        let tags = results.map(r => {
          return r._id
        })
        return User.findByIdAndUpdate(req.user.id, {
          $set: { tags: tags }
        }, {
            new: true
          })
          .populate('tags')
      })
      .then(user => {
        
        res.status(200).json(user)
      })
      .catch(error => {
        res.status(500).json({
          error: 'INTERNAL SERVER ERROR',
          message: error.message
        })
      })
  }
}

module.exports = UserController;