const Institute = require('../../models/Institute');
const { mutipleMongooseToObject } = require('../../../util/mongoose');
const { mongooseToObject } = require('../../../util/mongoose');

class adminInstituteController {

    // Hiển thị danh sách
    show(req, res, next) {
        Institute.find({})
            .then((institutes) => {
                res.render('admin/institutes/show', {
                    institutes: mutipleMongooseToObject(institutes),
                });
            })
            .catch(next);
    }

    // Tạo mới
    create(req, res) {
        res.render('admin/institutes/create');
        
    }

    store(req, res, next) {
        const institute = new Institute(req.body);
        institute.save()
            .then(() => {
                return Institute.find({});
            })
            .then((institutes) => {
                res.render('admin/institutes/show', {
                    institutes: mutipleMongooseToObject(institutes), 
                    successMessage: 'Thêm thông tin khoa & viện thành công!',
                    errorMessage: null,
                });
            })
            .catch(next);
    }

    edit(req, res, next) {
        Institute.findById(req.params.id)
            .then((institute) =>
                res.render('admin/institutes/edit', {
                    institute: mongooseToObject(institute),
                }),
            )
            .catch(next);
    }

    update(req, res, next) {
        Institute.updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                return Institute.find({});
            })
            .then((institutes) => {
                res.render('admin/institutes/show', {
                    institutes: mutipleMongooseToObject(institutes),
                    successMessage: 'Cập nhật thông tin thành công!',
                    errorMessage: null,
                });
            })
            .catch(next);
    }

    destroy(req, res, next) {
        Institute.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new adminInstituteController();
