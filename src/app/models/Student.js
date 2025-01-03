const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Student = new Schema(
    {
        class_id: { type: Schema.Types.ObjectId, ref: 'Class' },
        student_code: { type: String, required: true },
        name: { type: String },
        email: { type: String },
        phone: { type: String },
        dob: { type: Date },
        address: { type: String },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

// Add plugins
mongoose.plugin(slug);
Student.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Student', Student);