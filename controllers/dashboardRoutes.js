const router = require('express').Router();
const { Post } = require('../models');
const {withGuard} = require('../utils/authGuard');

router.get('/', withGuard, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            }
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('dashboard', {
            dashboard: true,
            posts,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/new', withGuard, async (req, res) => {
    res.render('newPost', {
        dashboard: true,
        logged_in: req.session.logged_in
    });
});

router.get('/edit/:id', withGuard, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        if (postData) {
            const post = postData.get({ plain: true });

            res.render('editPost', {
                post,
                dashboard: true,
                logged_in: req.session.logged_in
            });

        } else {
            res.status(404).end();
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;   