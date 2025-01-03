const Topic = require('../models/Topic');
const { mongooseToObject } = require('../../util/mongoose');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class TopicController {
    // Hiển thị chi tiết khóa học
    show(req, res, next) {
        Topic.find({})
            .then((topics) => {
                res.render('topics/show', {
                    topics: mutipleMongooseToObject(topics),
                });
            })
            .catch(next);
    }

    // Tạo khóa học mới
    create(req, res) {
        res.render('topics/create');
        
    }

    // Lưu khóa học vào cơ sở dữ liệu
    store(req, res, next) {
        const topic = new Topic(req.body);
        topic.save()
            .then(() => res.redirect('/topics/show'))
            .catch(next);
    }

    // Chỉnh sửa khóa học
    edit(req, res, next) {
        Topic.findById(req.params.id)
            .then((course) =>
                res.render('topics/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    // Cập nhật khóa học
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }


    // Xóa vĩnh viễn khóa học
    destroy(req, res, next) {
        Topic.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

}

module.exports = new TopicController();
