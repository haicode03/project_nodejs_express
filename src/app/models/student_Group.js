const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const student_Group = new Schema(
    {
        name: { type: String, required: true },
        class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
        topic_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
        description: { type: String },
    },
    {
        timestamps: true,
    },
);

// Add plugins
student_Group.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('student_Group', student_Group);
