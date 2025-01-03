const express = require('express');
const router = express.Router();
const projectController = require('../app/controllers/ProjectController');

router.get('/:id/showDetail', projectController.showDetail);
router.get('/:id', projectController.show);

module.exports = router;