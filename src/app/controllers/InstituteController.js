const Institute = require('../models/Institute');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class InstituteController {
    // Hiển thị chi tiết Khoa & Viện
    show(req, res, next) {
        Institute.find({})
            .then((institutes) => {
                res.render('institutes/show', {
                    institutes: mutipleMongooseToObject(institutes),
                });
            })
            .catch(next);
    }

    // Tạo khóa học mới
    create(req, res) {
        res.render('courses/create');
        
    }

    // Lưu khóa học vào cơ sở dữ liệu
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(req.body);
        course.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // Chỉnh sửa khóa học
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    // Cập nhật khóa học
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // Xóa khóa học tạm thời
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // Xóa vĩnh viễn khóa học
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // Khôi phục khóa học
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new InstituteController();
