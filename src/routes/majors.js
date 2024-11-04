const express = require('express');
const router = express.Router();

const majorController = require('../app/controllers/MajorController');


router.get('/create', majorController.create);
router.post('/store', majorController.store);
router.get('/:id/edit', majorController.edit);
router.put('/:id', majorController.update);
router.patch('/:id/restore', majorController.restore);
router.delete('/:id', majorController.destroy);
router.delete('/:id/force', majorController.forceDestroy);
//Hiển thị danh sách lớp biên chế theo ngành
router.get('/showClass', majorController.showClass);
router.get('/:slug', majorController.show);

module.exports = router;