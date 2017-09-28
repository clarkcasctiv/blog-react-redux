const express = require('express');
const router = express.Router();
const chalk = require('chalk');

const apiRouter = require('./api');

const {Post} = require('../models');

router.use('/api', apiRouter);

router.get('/', (req,res) => {
    Post.findAll({
        order: [['id', 'ASC']], 
        // attributes: ['title', 'intro_paragraph', 'content', 'slug']
    })
    .then((posts) => {
        res.render('pages/posts', { posts: posts });
    })
    .catch((err) => {
        console.error(err);
    })
});

router.get('/admin*', (req,res) => {
    res.render('admin');
});

router.get('/:postSlug', (req, res) => {
    Post.findOne({
        where: {
            slug: req.params.postSlug
        }, 
        // attributes: ['title', 'markedContent']
    })
    .then((post) => {
        if (post) {
            console.log(post.get('markedContent'));
            // post.markedContent = post.get('markedContent');
            res.render('pages/post', { post: post});
        } else {
            res.send('where da post at!?');
        }
    })
    .catch((err) => {
        console.error(err);
    });
});

module.exports = router;