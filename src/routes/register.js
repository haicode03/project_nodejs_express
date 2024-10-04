const express = require('express');
const router = express.Router();
const registerController = require('../app/controllers/RegisterController');

// Hiển thị trang đăng ký
router.get('/', (req, res) => {
    res.render('register', {layout: 'auth', title: 'Đăng ký'}); 
});

// Xử lý đăng ký
router.post('/', registerController.register);

module.exports = router;
