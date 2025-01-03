const express = require('express');
const router = express.Router();

const topicController = require('../app/controllers/TopicController');

router.get('/create', topicController.create);
router.post('/store', topicController.store);
router.get('/:id/edit', topicController.edit);
router.put('/:id', topicController.update);
router.delete('/:id', topicController.destroy);
router.get('/:id', topicController.show);

module.exports = router;