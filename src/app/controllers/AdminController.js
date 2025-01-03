const User = require('../models/User');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class AdminController {
    showDashboard(req, res, next) {
        const userRole = req.user.role;

        if (userRole === 'student') {
            return res.render('student/');
        } else if (userRole === 'teacher') {
            return res.render('teacher/');
        } else {
            return res.render('admin/');
        }
    }

    // Hiển thị danh sách tài khoản
    show(req, res, next) {
        User.find({})
            .then((users) => {
                res.render('admin/users/show', {
                    users: mutipleMongooseToObject(users),
                });
            })
            .catch(next);
    }

    // Tạo tài khoản mới
    create(req, res) {
        res.render('admin/users/create');
        
    }

    // Lưu thông tin người dùng vào cơ sở dữ liệu
    store(req, res, next) {
        const user = new User(req.body);
        user.save()
            .then(() => {
                // Sau khi lưu thành công, lấy danh sách người dùng
                return User.find({});
            })
            .then((users) => {
                // Hiển thị lại danh sách người dùng cùng thông báo thành công
                res.render('admin/users/show', {
                    users: mutipleMongooseToObject(users), // Chuyển đổi dữ liệu
                    successMessage: 'Tạo tài khoản thành công!',
                    errorMessage: null,
                });
            })
            .catch(next);
    }

    // Chỉnh sửa thông tin tài khoản
    edit(req, res, next) {
        User.findById(req.params.id)
            .then((user) =>
                res.render('admin/users/edit', {
                    user: mongooseToObject(user),
                }),
            )
            .catch(next);
    }

    // Cập nhật thông tin người dùng
    update(req, res, next) {
        User.updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                return User.find({});
            })
            .then((users) => {
                res.render('admin/users/show', {
                    users: mutipleMongooseToObject(users), // Chuyển đổi dữ liệu
                    successMessage: 'Cập nhật thông tin tài khoản thành công!',
                    errorMessage: null,
                });
            })
            .catch(next);
    }

    // Xóa tài khoản người dùng
    destroy(req, res, next) {
    User.deleteOne({ _id: req.params.id })
        .then(() => {
            return User.find({});
        })
        .then((users) => {
            res.render('admin/users/show', {
                users: mutipleMongooseToObject(users),
                successMessage: 'Xóa tài khoản thành công!',
                errorMessage: null,
            });
        })
        .catch(next);
    }

    // Xóa vĩnh viễn tài khoản
    forceDestroy(req, res, next) {
        User.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // Khôi phục tài khoản
    restore(req, res, next) {
        User.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new AdminController();
