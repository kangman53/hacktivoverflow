const express = require('express');
const router = express.Router();
const userRouter = require('./users');
const questionRouter = require('./questions');
const answerRouter = require('./answers');
const tagRouter = require('./tags');
const { isLogin } = require('../middlewares');

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome, check documentation to use end points'
  })
})
router.use('/', userRouter);
router.use('/questions', questionRouter);
router.use('/tags', tagRouter)
router.use(isLogin);
router.use('/answers', answerRouter)

module.exports = router;