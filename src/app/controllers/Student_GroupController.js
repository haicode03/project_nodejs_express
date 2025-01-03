const student_Group = require('../models/student_Group')
const Topic = require('../models/Topic')
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class Student_GroupController {
    // Hiển thị danh sách sinh viên
    show(req, res, next) {
        Promise.all([
            student_Group.find({})
                .populate('class_id', 'name')
                .populate('topic_id', 'name')
                .populate('members', 'name'),
            Topic.find({}), // Lấy danh sách đề tài
        ])
            .then(([student_groups, topics]) =>
                res.render('student_groups/show', {
                    student_groups: mutipleMongooseToObject(student_groups),
                    topics: mutipleMongooseToObject(topics),
                })
            )
            .catch(next);
    }

    addTopic(req, res, next) {
        const groupId = req.params.id;
        const { topic_id, new_topic } = req.body;
    
        let topicPromise;
    
        if (new_topic) {
            // Nếu nhập đề tài mới, lưu vào model Topic
            topicPromise = new Topic({ name: new_topic }).save();
        } else if (topic_id) {
            // Nếu chọn từ danh sách, sử dụng topic_id có sẵn
            topicPromise = Topic.findById(topic_id);
        } else {
            return res.status(400).json({ success: false, message: 'Vui lòng chọn hoặc nhập đề tài!' });
        }
    
        topicPromise
            .then((topic) => {
                if (!topic) {
                    throw new Error('Không tìm thấy đề tài!');
                }
    
                return student_Group.findById(groupId)
                    .then((group) => {
                        if (!group) {
                            throw new Error('Nhóm không tồn tại!');
                        }
    
                        group.topic_id = topic._id;
                        return group.save();
                    });
            })
            .then(() => res.json({ success: true, message: 'Thêm đề tài thành công!' }))
            .catch((err) => res.status(500).json({ success: false, message: err.message }));
    }

    edit(req, res, next) {
        const groupId = req.params.id;
    
        Promise.all([
            student_Group.findById(groupId)
                .populate('class_id', 'name')
                .populate('members', 'name')
                .populate('topic_id', 'name'),
            Topic.find({}), // Lấy danh sách đề tài
        ])
            .then(([group, topics]) => {
                if (!group) {
                    throw new Error('Nhóm sinh viên không tồn tại!');
                }
                res.render('student_groups/edit', {
                    group: mongooseToObject(group),
                    topics: mutipleMongooseToObject(topics),
                });
            })
            .catch(next);
    }

    update(req, res, next) {
        const groupId = req.params.id;
        const { name, topic_id, new_topic } = req.body;
    
        let topicPromise;
    
        if (new_topic) {
            // Nếu nhập đề tài mới, lưu vào model Topic
            topicPromise = new Topic({ name: new_topic }).save();
        } else if (topic_id) {
            // Nếu chọn từ danh sách, sử dụng topic_id có sẵn
            topicPromise = Topic.findById(topic_id);
        } else {
            topicPromise = Promise.resolve(null); // Không thay đổi đề tài
        }
    
        topicPromise
            .then((topic) => {
                return student_Group.findById(groupId);
            })
            .then((group) => {
                if (!group) {
                    throw new Error('Nhóm sinh viên không tồn tại!');
                }
    
                // Cập nhật thông tin nhóm
                group.name = name;
                if (topic_id || new_topic) {
                    group.topic_id = topic_id || topic._id;
                }
                return group.save();
            })
            .then(() => res.redirect('/student_groups/show'))
            .catch(next);
    }
    
}

module.exports = new Student_GroupController();
