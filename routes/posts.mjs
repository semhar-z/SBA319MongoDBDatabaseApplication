import express from 'express';
const router = express.Router();
import Post from '../models/post.mjs';
 

// get all posts
router.get('/', async (req, res) => {
    try {
        const post = await Post.find();
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get post by ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get post by author
router.get('/author/:authorName', async (req, res) => {
    try {
        const post = await Post.find({ author: req.params.authorName });
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new post
router.post('/', async (req, res) => {
    const { body, permalink, author, title, tags, comments, date } = req.body;

    const newPost = new Post({
        body,
        permalink,
        author,
        title,
        tags,
        comments, 
        date
    });

    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update post by ID
router.put('/:id', async (req, res) => {
    const { body, permalink, author, title, tags, comments, date } = req.body;
    
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { body, permalink, author, title, tags, comments, date },
            { new: true, runValidators: true }
        );
        
        if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
        
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete post by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



export default router;
