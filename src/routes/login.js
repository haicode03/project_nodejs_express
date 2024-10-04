const express = require('express');
const router = express.Router();

const loginController = require('../app/controllers/LoginController');

// Hiển thị trang đăng nhập
router.get('/login', (req, res) => {
    res.render('login'); // Chỉnh sửa cho đúng template của trang đăng nhập
});

// Xử lý đăng nhập
router.post('/login', loginController.login);

// Đăng xuất
router.get('/logout', loginController.logout);

module.exports = router;
