const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Sử dụng biến môi trường để lưu các thông tin nhạy cảm như JWT_SECRET

class LoginController {
    // Phương thức đăng nhập
    async login(req, res) {
        const { username, password } = req.body;

        // Kiểm tra xem thông tin đầu vào có đầy đủ hay không
        if (!username || !password) {
            return res.status(400).send('Tên người dùng và mật khẩu là bắt buộc');
        }

        try {
            // Tìm người dùng trong cơ sở dữ liệu
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(401).send('Người dùng không tồn tại');
            }

            // So sánh mật khẩu đã mã hóa
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).send('Mật khẩu không hợp lệ');
            }

            // Tạo token JWT với thời gian hết hạn
            const token = jwt.sign(
                { id: user._id, username: user.username },
                process.env.JWT_SECRET || 'secretkey', // Sử dụng biến môi trường cho JWT_SECRET
                { expiresIn: '1h' }
            );

            // Thiết lập cookie chứa token với cờ httpOnly để bảo mật
            res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

            // Điều hướng về trang chính
            res.redirect('/');
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
            res.status(500).send('Lỗi máy chủ');
        }
    }

    // Phương thức đăng xuất
    logout(req, res) {
        res.clearCookie('token'); // Xóa cookie chứa token
        res.redirect('/login');   // Điều hướng về trang đăng nhập
    }
}

module.exports = new LoginController();
