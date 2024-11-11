import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    postId: {
        type: Number,
        required: true, 
        min: 1
    },
    content: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 500
    },
    author: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// index by postId and createdAt
CommentSchema.index({ postId: 1, createdAt: -1 }); 

const Comment = mongoose.model('Comment', CommentSchema);

export  default Comment;