const Facultie = require('../../models/Facultie');
const { mutipleMongooseToObject } = require('../../../util/mongoose');
const { mongooseToObject } = require('../../../util/mongoose');

class adminFacultieController {

    // Hiển thị danh sách
    show(req, res, next) {
        Facultie.find({})
            .populate('instituteId', 'name') // Sử dụng populate
            .then((faculties) => {
                res.render('admin/faculties/show', {
                    faculties: mutipleMongooseToObject(faculties),
                });
            })
            .catch(next);
    }

    // Tạo mới
    create(req, res) {
        res.render('admin/faculties/create');
        
    }

    store(req, res, next) {
        const facultie = new Facultie(req.body);
        facultie.save()
            .then(() => {
                return Facultie.find({});
            })
            .then((faculties) => {
                res.render('admin/faculties/show', {
                    faculties: mutipleMongooseToObject(faculties), 
                    successMessage: 'Thêm thông tin khoa & viện thành công!',
                    errorMessage: null,
                });
            })
            .catch(next);
    }

    edit(req, res, next) {
        Facultie.findById(req.params.id)
            .then((facultie) =>
                res.render('admin/faculties/edit', {
                    facultie: mongooseToObject(facultie),
                }),
            )
            .catch(next);
    }

    update(req, res, next) {
        Facultie.updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                return Facultie.find({});
            })
            .then((faculties) => {
                res.render('admin/faculties/show', {
                    faculties: mutipleMongooseToObject(faculties),
                    successMessage: 'Cập nhật thông tin thành công!',
                    errorMessage: null,
                });
            })
            .catch(next);
    }

    destroy(req, res, next) {
        Facultie.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new adminFacultieController();
