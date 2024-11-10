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

export default router;
