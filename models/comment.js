const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment:{
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true
    },
    picture_id:{
        type: String,
        required: true
    }
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;