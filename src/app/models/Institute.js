const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Institute = new Schema(
    {
        code: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        dean: { type: String },
        email: { type: String, match: /.+\@.+\..+/ },
        phone: { type: String, match: /^[0-9]{10}$/ },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

// Add plugins
mongoose.plugin(slug);
Institute.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Institute', Institute);
