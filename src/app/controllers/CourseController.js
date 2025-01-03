const Course = require('../models/Course');
const Major = require('../models/Major');
const { mongooseToObject } = require('../../util/mongoose');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class CourseController {
    // Hiển thị chi tiết khóa học
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) =>
                res.render('courses/show', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    // Thêm học phần mới
    create(req, res, next) {
        Major.find({})
            .then((majors) => {
                res.render('courses/create', {
                    majors: mutipleMongooseToObject(majors),
                });
            })
            .catch(next);
    }
    
    // Lưu thông tin học phần
    store(req, res, next) {
        const courses = new Course(req.body);
        courses.save()
            .then(() => res.redirect('/majors/showCourse'))
            .catch(next);
    }

    // Chỉnh sửa học phần
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    // Cập nhật học phần
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // Xóa học phần tạm thời
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // Xóa vĩnh viễn học phần
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

module.exports = new CourseController();
