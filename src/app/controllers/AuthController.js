const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthController {
    // Đăng ký
    async register(req, res) {
        const { username, email, password, confirmPassword, role } = req.body;

        if (!username || !email || !password || !confirmPassword || !role) {
            return res.render('auth/register', { layout: 'auth', errorMessage: 'Tất cả các trường là bắt buộc!' });
        }

        if (password !== confirmPassword) {
            return res.render('auth/register', { layout: 'auth', errorMessage: 'Mật khẩu và mật khẩu xác nhận không khớp!' });
        }

        try {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.render('auth/register', { layout: 'auth', errorMessage: 'Tên người dùng đã tồn tại!' });
            }

            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return res.render('auth/register', { layout: 'auth', errorMessage: 'Email đã được sử dụng!' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User({
                username,
                email,
                password: hashedPassword,
                role
            });

            await user.save();

            res.render('auth/login', { layout: 'auth', successMessage: 'Đăng ký tài khoản thành công! Mời bạn đăng nhập.' });
        } catch (error) {
            console.error('Lỗi đăng ký:', error);
            res.status(500).render('auth/register', { layout: 'auth', errorMessage: 'Lỗi máy chủ, vui lòng thử lại sau.' });
        }
    }

    // Đăng nhập
    async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render('auth/login', { layout: 'auth', errorMessage: 'Tên người dùng và mật khẩu là bắt buộc' });
        }

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).render('auth/login', { layout: 'auth', errorMessage: 'Email không tồn tại' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).render('auth/login', { layout: 'auth', errorMessage: 'Mật khẩu không hợp lệ' });
            }

            const token = jwt.sign(
                { id: user._id, email: user.email, role: user.role },
                process.env.JWT_SECRET || 'secretkey',
                { expiresIn: '1h' }
            );

            res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

            res.redirect('/');
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
            res.status(500).render('auth/login', { layout: 'auth', errorMessage: 'Lỗi máy chủ' });
        }
    }

    // Đăng xuất
    logout(req, res) {
        res.clearCookie('token');
        res.redirect('/auth/login');
    }
}

module.exports = new AuthController();
