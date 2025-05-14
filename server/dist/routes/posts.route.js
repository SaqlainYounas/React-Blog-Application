"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("../controllers/post.controller");
const router = express_1.default.Router();
router.get('/user/:userId/posts', post_controller_1.getUserBlogs);
router.get('/user/:userId/post/:postId', post_controller_1.getBlogByBlogId);
router.post('/users/:userId/createpost/', post_controller_1.createUserBlog);
exports.default = router;
