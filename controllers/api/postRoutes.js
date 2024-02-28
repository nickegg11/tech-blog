const router = require('express').Router();
import { Post } from '../../models';
import { apiGuard } from '../../utils/authGuard';

router.get('/', apiGuard, async (req, res) => {
    const body = req.body;
    try {
        const newPost = await Post.create({ ...body, user_id: req.session.user_id });
        res.json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
 });

 router.put('/:id', apiGuard, async (req, res) => {
    try {
        const [affectedRows] = await Post.update(req.body, {
            where: {
                id: req.params.id
            },
        });
        if (affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(404).json({ message: 'No post found with this id' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
 });

 router.delete('/:id', apiGuard, async (req, res) => {
    try {
        const [affectedRows] = await Post.destroy({
            where: {
                id: req.params.id
            },
        });
        if (affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(404).json({ message: 'No post found with this id' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
 });

export default router;