const Facultie = require('../models/Facultie');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class FacultieController {
    // Hiển thị chi tiết khóa học
    show(req, res, next) {
        Facultie.find({})
            .then((faculties) => {
                res.render('faculties/show', {
                    faculties: mutipleMongooseToObject(faculties),
                });
            })
            .catch(next);
    }
}
module.exports = FacultieController();