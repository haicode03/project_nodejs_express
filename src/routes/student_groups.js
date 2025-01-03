const express = require('express');
const router = express.Router();

const Student_GroupController = require('../app/controllers/Student_GroupController');

router.get('/:id', Student_GroupController.show);
router.post('/:id/add-topic', Student_GroupController.addTopic);
router.get('/:id/edit', Student_GroupController.edit);
router.post('/:id/update', Student_GroupController.update);

module.exports = router;