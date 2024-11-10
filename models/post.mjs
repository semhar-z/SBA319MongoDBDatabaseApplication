import mongoose from 'mongoose';


const CommentSchema = new mongoose.Schema({
    body: String,
    email: String,
    author: String,
});

const PostSchema = new mongoose.Schema({
    body: String,
    permalink: String,
    author: String,
    title: String,
    tags: [String],
    comments: [CommentSchema], 
    date: Date,
});

 const Post = mongoose.model('Post', PostSchema);

 export  default Post;
