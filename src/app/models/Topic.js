const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Topic = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
    },
    {
        timestamps: true,
    },
);

// Add plugins
Topic.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Topic', Topic);