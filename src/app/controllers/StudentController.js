const Student = require('../models/Student');
const Student_Group = require('../models/student_Group');
const Class = require('../models/Class');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class StudentController {
    // Hiển thị danh sách sinh viên
    show(req, res, next) {
        Student.find({ class_id: req.params.id })
            .populate('class_id', 'name')
            .then((students) => {
                if (students.length > 0) {
                    const className = students[0].class_id.name;
                    res.render('students/show', {
                        students: mutipleMongooseToObject(students),
                        className,
                    });
                } else {
                    res.render('students/show', {
                        students: [],
                        className: 'Không tìm thấy lớp',
                    });
                }
            })
            .catch(next);
    }
    

    // Thêm sinh viên mới
    create(req, res, next) {
        Class.find({})
            .then((classes) => {
                res.render('students/create', {
                    classes: mutipleMongooseToObject(classes),
                });
            })
            .catch(next);
    }
    
    // Lưu thông tin sinh viên
    store(req, res, next) {
        const student = new Student(req.body);

        student.save()
            .then(() => {
                // Chuyển hướng về danh sách sinh viên của lớp học sau khi lưu thành công
                res.redirect(`/students/${req.body.class_id}`);
            })
            .catch(next);
    }

    // Chỉnh sửa thông tin sinh viên
    edit(req, res, next) {
        Student.findById(req.params.id)
            .then((students) =>
                res.render('students/edit', {
                    students: mongooseToObject(students),
                }),
            )
            .catch(next);
    }

    // Cập nhật thông tin sinh viên
    update(req, res, next) {
        Student.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/teacher/stored/student'))
            .catch(next);
    }

    // Cập nhật phương thức trash
    trash(req, res, next) {
        Student.findDeleted({})
            .then((students) =>
                res.render('students/trash', {
                    students: mutipleMongooseToObject(students),
                }),
            )
            .catch(next);
    }

    // Xóa sinh viên tạm thời
    destroy(req, res, next) {
        Student.delete({ _id: req.params.id }) // Sử dụng soft delete
            .then(() => res.redirect('/students/trash')) // Chuyển hướng đến view trash
            .catch(next);
    }

    // Xóa vĩnh viễn sinh viên
    forceDestroy(req, res, next) {
        Student.findByIdAndDelete(req.params.id)
            .then((student) => {
                if (!student) {
                    return res.status(404).send('Sinh viên không tồn tại!');
                }
                res.redirect('back');  // Quay lại trang trước đó
            })
            .catch(next);
    }

    // Khôi phục sinh viên
    restore(req, res, next) {
        Student.restore({ _id: req.params.id })
            .then((student) => {
                if (!student) {
                    return res.status(404).send('Sinh viên không tồn tại hoặc không thể khôi phục!');
                }
                res.redirect('back');  // Quay lại trang trước đó
            })
            .catch(next);
    }

    // Xử lý tạo nhóm
    createGroup(req, res, next) {
        let { name, class_id, members } = req.body;
    
        if (!Array.isArray(members)) {
            if (members) {
                members = [members];
            } else {
                members = [];
            }
        }
    
        console.log(members);
    
        Class.findOne({ name: class_id })
            .then(classObj => {
                if (!classObj) {
                    return res.status(404).send('Class not found');
                }
    
                const group = new Student_Group({
                    name,
                    class_id: classObj._id,
                    members: members,
                });
    
                return group.save();
            })
            .then(() => res.redirect('back'), {
                successMessage: 'Tạo nhóm thành công!',
                errorMessage: null,
            })
            .catch(next);
    }
}

module.exports = new StudentController();
