const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    overview: {
        required: true,
        type: String
    },
    blogImage: {
        required: true,
        type: String
    },
    userId: {
        required: true,
        type: String
    }
});

const blogs = mongoose.model("blogs", blogSchema);

module.exports = blogs;
