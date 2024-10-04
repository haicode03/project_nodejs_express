const express = require('express');
const router = express.Router();

const loginController = require('../app/controllers/LoginController');

router.get('/', (req, res) => {
    res.render('login', {layout: 'auth', title: 'Đăng nhập'});
});

router.post('/login', loginController.login);

router.get('/logout', loginController.logout);

module.exports = router;
