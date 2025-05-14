"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("../controllers/blog.controller");
const router = express_1.default.Router();
router.get('/user/:userId/blogs', blog_controller_1.getUserBlogs);
router.get('/user/:userId/blog/:blogId', blog_controller_1.getBlogByBlogId);
router.post('/users/:userId/createpost/', blog_controller_1.createUserBlog);
exports.default = router;
