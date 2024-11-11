import express from 'express';
import Comment from '../models/comment.mjs';

const router = express.Router();

// Create a comment
router.post('/', async (req, res) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();
        res.status(201).json(comment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all comments for a specific post
router.get('/post/:postId', async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a comment
router.put('/:id', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!comment) return res.status(404).json({ message: 'Comment not found' });
        res.json(comment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a comment
router.delete('/:id', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });
        res.json({ message: 'Comment deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export  default router;
