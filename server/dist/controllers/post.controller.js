"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserBlog = exports.getBlogByBlogId = exports.getUserBlogs = void 0;
const users_data_1 = require("../data/users.data");
// GET /users/:userId/posts
const getUserBlogs = (req, res) => {
    const userId = req.params.userId;
    const user = users_data_1.users.find((u) => u.id === `${userId}`);
    if (!user)
        return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user.posts);
};
exports.getUserBlogs = getUserBlogs;
// GET /users/:userId/post/:postId
const getBlogByBlogId = (req, res) => {
    const userId = req.params.userId;
    const postId = req.params.postId;
    console.log('IDs', userId, postId);
    if (!userId || !postId) {
        return res.status(404).json({ message: 'Missing Params' });
    }
    const user = users_data_1.users.find((u) => u.id === `${userId}`);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const post = user.posts.find((post) => postId === post.id);
    if (!post) {
        return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(post);
};
exports.getBlogByBlogId = getBlogByBlogId;
// POST /users/:userId/post/:postId
const createUserBlog = (req, res) => {
    const { userId } = req.params;
    const { title, subtitle, content, publishDate } = req.body;
    const user = users_data_1.users.find((u) => u.id === `${userId}`);
    if (!user)
        return res.status(404).json({ message: 'User not found' });
    const id = `u${userId}-b${user.posts.length + 1}`;
    const newPost = {
        id,
        title,
        subtitle,
        content,
        publishDate,
        author: `${user.firstName} ${user.lastName}`,
    };
    res.status(201).json({ message: 'Post added successfully', post: newPost });
};
exports.createUserBlog = createUserBlog;
