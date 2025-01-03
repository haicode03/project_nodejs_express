const Student = require('../models/Student');
const Class = require('../models/Class');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const Course = require('../models/Course');

class ClassController {
    // Hiển thị danh sách sinh viên theo lớp học phần
    showlistStudent(req, res, next) {
        Student.find({ class_id: req.params.id })
            .populate('class_id', 'name') // Sử dụng populate
            .then((students) =>
                res.render('classes/showlistStudent', {
                    students: mutipleMongooseToObject(students),
                })
            )
            .catch(next);
    }

    // Thêm lớp học phần mới
    create(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('classes/create', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
    
    // Lưu thông tin lớp học phần
    store(req, res, next) {
        const classes = new Class(req.body);
        classes.save()
            .then(() => res.redirect('/majors/showCourse'))
            .catch(next);
    }

    // Chỉnh sửa học phần
    edit(req, res, next) {
        Class.findById(req.params.id)
            .then((classes) =>
                res.render('classes/edit', {
                    classes: mongooseToObject(classes),
                }),
            )
            .catch(next);
    }

    // Cập nhật thông tin lớp học phần
    update(req, res, next) {
        Major.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/major'))
            .catch(next);
    }

    // Xóa lớp học phần tạm thời
    destroy(req, res, next) {
        Major.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // Xóa vĩnh viễn lớp học phần
    forceDestroy(req, res, next) {
        Major.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // Khôi phục lớp học phần
    restore(req, res, next) {
        Major.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new ClassController();
