const Project = require('../models/Project');
const { mongooseToObject } = require('../../util/mongoose');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const student_Group = require('../models/student_Group');

class ProjectController {
    // Hiển thị danh sách đồ án
    show(req, res, next) {
        student_Group.find({})
            .populate('class_id', 'name')
            .populate('topic_id', 'name')
            .then((student_groups) => {
                res.render('projects/show', {
                    student_groups: mutipleMongooseToObject(student_groups),
                });
            })
            .catch(next);
    }
    
    
    showDetail(req, res, next) {
        const projectId = req.params.id;
    
        // Kiểm tra ID hợp lệ
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).send('Invalid project ID');
        }
    
        // Tìm dự án theo ID và populate các trường liên quan
        Project.findById(projectId)
            .populate({
                path: 'student_group',
                populate: [
                    { path: 'members', model: 'Student', select: 'name' }, // Thành viên nhóm
                    { path: 'class_id', model: 'Class', select: 'name' },  // Lớp học phần
                ],
            })
            .populate('topic', 'name') // Đề tài
            .populate('teacher', 'name') // Giáo viên hướng dẫn
            .then((project) => {
                if (!project) {
                    return res.status(404).send('Project not found');
                }
    
                res.render('projects/showDetail', {
                    project: mongooseToObject(project),
                });
            })
            .catch(next);
    }    
}

module.exports = new ProjectController();
