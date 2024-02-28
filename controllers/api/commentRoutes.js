const router = require('express').Router();
import { Comment } from '../../models';
import { apiGuard } from '../../utils/authGuard';

router.post('/', apiGuard, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;