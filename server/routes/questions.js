const express = require('express');
const router = express.Router();
const { isLogin } = require('../middlewares');

const { QuestionController } = require('../contollers');
router.get('/', QuestionController.getQuestions);
router.get('/:id', QuestionController.getQuestionDetail);
router.get('/tagged/:tagId', QuestionController.tag);

router.use(isLogin);
router.post('/', QuestionController.addQuestion);
router.put('/:id', QuestionController.update);
router.delete('/:id', QuestionController.delete);
router.put('/:questionId/votes', QuestionController.votes);

module.exports = router;