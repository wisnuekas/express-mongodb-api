const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

//INDEX POST RETRIEVE ALL POST
router.get('/', async (req, res) => {
    try {
        const post = await Post.find();
        
        res.status(200).json({
            data: post
        });
    } catch (error) {
        res.status(400).json({message: error});
    }
})

//SEARCH POST
router.post('/search', async (req, res) => {
    try {
        const post = await Post.find({ $text: {
            $search: req.body.title,
            $caseSensitive: false
        }});
        res.status(200).json({
            data: post
        });
    } catch (error) {
        res.status(400).json({message: error});
    }
})


//CREATE A POST
router.post('/', async (req,res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });

    try {
        const savedPost = await post.save();
        res.status(200).json({
            message: 'post created',
            data: savedPost
        });
    } catch (error) {
        res.status(400).json({message: error});
    }
});

//RETRIEVE A SPESIFIC POST
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json({
            data: post
        });
    } catch (error) {
        res.status(400).json({message: error});
    }
})

//DELETE A SPESIFIC POST
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'post deleted',
            data: post
        });
    } catch (error) {
        res.status(400).json({message: error});
    }
})

//UPDATE A SPESIFIC POST
router.patch('/:id', async (req,res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id, 
            req.body,
            {new: true}
        );
        res.status(200).json({
            message: 'post updated',
            data: updatedPost
        });
    } catch (error) {
        res.status(400).json({message: error});
    }
});

module.exports = router;