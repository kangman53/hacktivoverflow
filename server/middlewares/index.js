const { jwt } = require('../helpers');
const { User } = require('../models');

module.exports = {
  isLogin: (req, res, next) => {
    let payload = jwt.jwtVerify(req.headers.token)
    if (payload) {
      User.findById(payload.id)
      .populate('tags')
        .then(user => {
          if (user) {
            req.user = {
              id: user._id,
              email: user.email,
              fullname: user.fullname,
              token: req.headers.token,
              tags: user.tags
            }
            next();
          } else {
            res.status(401).json({
              error: 'USER NOT FOUND',
              message: 'User has been deleted, please register again'
            })
          }
        })
    } else {
      res.status(401).json({
        error: 'INVALID TOKEN',
        message: 'Please send a valid token'
      })
    }
  }
}