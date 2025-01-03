const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' },
    deadline: { type: Date, required: true },
    completedAt: { type: Date },
});

const Project = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    topic: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
    student_group: { type: Schema.Types.ObjectId, ref: 'student_Group', required: true },
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
    tasks: [TaskSchema],
    status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' },
    startDate: { type: Date, required: true },
    deadline: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', Project);
