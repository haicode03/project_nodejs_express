const User = require('../models/User');
const bcrypt = require('bcrypt'); 

class RegisterController {
    async register(req, res) {
        const { username, email, password } = req.body;

        try {
            // Kiểm tra xem người dùng đã tồn tại chưa
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).send('User already exists');
            }

            // Mã hóa password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Tạo người dùng mới
            const user = new User({
                username,
                email,
                password: hashedPassword,
                role: 'student'
            });

            await user.save();
            res.redirect('/login'); 
        } catch (error) {
            res.status(500).send('Server error');
        }
    }
}

module.exports = new RegisterController();
