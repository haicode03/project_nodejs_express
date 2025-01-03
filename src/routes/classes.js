const express = require('express');
const router = express.Router();

const ClassController = require('../app/controllers/ClassController');

router.get('/create', ClassController.create);
router.post('/store', ClassController.store);
router.get('/:id/edit', ClassController.edit);
router.put('/:id', ClassController.update);
router.patch('/:id/restore', ClassController.restore);
router.delete('/:id', ClassController.destroy);
router.delete('/:id/force', ClassController.forceDestroy);
//Hiển thị danh sách sinh viên hiển thị theo lớp
router.get('/showlistStudent/:id', ClassController.showlistStudent);

module.exports = router;