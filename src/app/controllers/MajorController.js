const Major = require('../models/Major');
const Class = require('../models/Class');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class MajorController {
    // Hiển thị danh sách chuyên ngành
    show(req, res, next) {
        Major.find({})
            .then((majors) => {
                res.render('majors/show', {
                    majors: mutipleMongooseToObject(majors),
                });
            })
            .catch(next);
    }

    // Tạo chuyên ngành mới
    create(req, res) {
        res.render('majors/create');
        
    }

    // Lưu chuyên ngành
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(req.body);
        course.save()
            .then(() => res.redirect('/me/stored/majors'))
            .catch(next);
    }

    // Chỉnh sửa chuyên ngành
    edit(req, res, next) {
        Major.findById(req.params.id)
            .then((major) =>
                res.render('major/edit', {
                    major: mongooseToObject(major),
                }),
            )
            .catch(next);
    }

    // Cập nhật chuyên ngành
    update(req, res, next) {
        Major.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/major'))
            .catch(next);
    }

    // Xóa chuyên ngành tạm thời
    destroy(req, res, next) {
        Major.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // Xóa vĩnh viễn chuyên ngành
    forceDestroy(req, res, next) {
        Major.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // Khôi phục chuyên ngành
    restore(req, res, next) {
        Major.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //Hiển thị danh sách lớp biên chế
    showClass(req, res, next) {
        Class.find({})
            .then((classes) => {
                res.render('majors/showClass', {
                    classes: mutipleMongooseToObject(classes),
                });
            })
            .catch(next);
    }
}

module.exports = new MajorController();
