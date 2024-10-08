const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');

// Hiển thị trang đăng ký
router.get('/register', (req, res) => {
    res.render('auth/register', { layout: 'auth', title: 'Đăng ký' });
});

// Xử lý đăng ký
router.post('/register', authController.register);


//Đăng nhập
router.get('/login', (req, res) => {
    res.render('auth/login', { layout: 'auth', title: 'Đăng nhập' });
});


router.post('/login', authController.login);

router.get('/logout', authController.logout);

module.exports = router;