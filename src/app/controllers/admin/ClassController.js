const Class = require('../../models/Class');
const { mutipleMongooseToObject } = require('../../../util/mongoose');
const { mongooseToObject } = require('../../../util/mongoose');

class adminClassController {

    // Hiển thị danh sách
    show(req, res, next) {
        Class.find({})
            .then((classes) => {
                res.render('admin/classes/show', {
                    classes: mutipleMongooseToObject(classes),
                });
            })
            .catch(next);
    }

    // Tạo mới
    create(req, res) {
        res.render('admin/classes/create');
        
    }

    store(req, res, next) {
        const classes = new Facultie(req.body);
        classes.save()
            .then(() => {
                return Facultie.find({});
            })
            .then((classes) => {
                res.render('admin/classes/show', {
                    classes: mutipleMongooseToObject(classes), 
                    successMessage: 'Thêm thông tin khoa & viện thành công!',
                    errorMessage: null,
                });
            })
            .catch(next);
    }

    edit(req, res, next) {
        Class.findById(req.params.id)
            .then((classes) =>
                res.render('admin/classes/edit', {
                    classes: mongooseToObject(classes),
                }),
            )
            .catch(next);
    }

    update(req, res, next) {
        Class.updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                return Class.find({});
            })
            .then((classes) => {
                res.render('admin/classes/show', {
                    classes: mutipleMongooseToObject(classes),
                    successMessage: 'Cập nhật thông tin thành công!',
                    errorMessage: null,
                });
            })
            .catch(next);
    }

    destroy(req, res, next) {
        Class.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new adminClassController();
