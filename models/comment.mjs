import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    postId: {
        // type: mongoose.Schema.Types.ObjectId,
        type: Number,
        required: true,
        // ref: 'Post', //Post collection
    },
    content: {
        type: String,
        required: true,
        minlength: 5,
    },
    author: {
        type: String,
        required: true,
        minlength: 3,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


CommentSchema.index({ postId: 1, createdAt: -1 });  // For optimized lookups by post and date

export  default mongoose.model('Comment', CommentSchema);
