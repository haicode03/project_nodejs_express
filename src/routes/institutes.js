const express = require('express');
const router = express.Router();

const instituteController = require('../app/controllers/InstituteController');

router.get('/create', instituteController.create);
router.post('/store', instituteController.store);
router.get('/:id/edit', instituteController.edit);
router.put('/:id', instituteController.update);
router.patch('/:id/restore', instituteController.restore);
router.delete('/:id', instituteController.destroy);
router.delete('/:id/force', instituteController.forceDestroy);
router.get('/:slug', instituteController.show);

module.exports = router;