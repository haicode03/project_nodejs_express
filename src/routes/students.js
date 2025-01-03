const express = require('express');
const router = express.Router();

const StudentController = require('../app/controllers/StudentController');

// Route cho chức năng quản lý sinh viên
router.get('/create', StudentController.create); // Hiển thị form thêm mới sinh viên
router.post('/store', StudentController.store); // Lưu sinh viên mới
router.get('/:id/edit', StudentController.edit); // Hiển thị form chỉnh sửa sinh viên
router.put('/:id', StudentController.update); // Cập nhật thông tin sinh viên
router.patch('/:id/restore', StudentController.restore); // Khôi phục sinh viên đã xóa tạm thời
router.delete('/:id', StudentController.destroy); // Xóa tạm thời sinh viên
router.delete('/:id/force', StudentController.forceDestroy); // Xóa vĩnh viễn sinh viên
router.get('/trash', StudentController.trash); // Hiển thị danh sách sinh viên bị xóa tạm thời
router.get('/:id', StudentController.show); // Hiển thị thông tin chi tiết sinh viên

// Route cho chức năng quản lý nhóm
router.post('/groups', StudentController.createGroup); // Tạo nhóm sinh viên

module.exports = router;
