const express = require('express');
const router = express.Router();
const { AnswerController } = require('../contollers');
router.post('/:questionId', AnswerController.create);
router.put('/:answerId/votes', AnswerController.votes);
router.put('/:id', AnswerController.update);
router.delete('/:id', AnswerController.delete);

module.exports = router;