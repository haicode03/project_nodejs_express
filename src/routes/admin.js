const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');

router.get('/users/create', adminController.create);
router.post('/users/store', adminController.store);
router.get('/users/:id/edit', adminController.edit);
router.put('/users/:id', adminController.update);
router.patch('/users/:id/restore', adminController.restore);
router.delete('/users/:id', adminController.destroy);
router.delete('/users/:id/force', adminController.forceDestroy);
router.get('/users/show', adminController.show);

module.exports = router;