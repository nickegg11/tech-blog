import User from './User';
import { belongsTo, hasMany } from './Post';
import Comment, { belongsTo as _belongsTo } from './Comment';

belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

_belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

export default { User, Post, Comment };