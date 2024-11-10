import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post', // Assuming there's a Post collection in your sample training DB
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        minlength: [5, 'Content must be at least 5 characters long'],
    },
    author: {
        type: String,
        required: true,
        minlength: [3, 'Author name must be at least 3 characters'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


CommentSchema.index({ postId: 1, createdAt: -1 });  // For optimized lookups by post and date
export  default mongoose.model('Comment', CommentSchema);
