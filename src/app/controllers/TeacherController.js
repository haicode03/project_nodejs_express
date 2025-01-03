const Student = require('../models/Student');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class TeacherController {
    // [GET] /teacher/stored/student
    storedStudent(req, res, next) {
        Promise.all([Student.find({}), Student.countDocumentsDeleted()])
            .then(([students, deletedCount]) =>
                res.render('teacher/stored-student', {
                    deletedCount,
                    students: mutipleMongooseToObject(students),
                }),
            )
            .catch(next);
    }

    // [GET] /teacher/trash/student
    trashStudent(req, res, next) {
        Student.findDeleted({})
            .then((students) =>
                res.render('teacher/trash-student', {
                    students: mutipleMongooseToObject(students),
                }),
            )
            .catch(next);
    }
}

module.exports = new TeacherController();