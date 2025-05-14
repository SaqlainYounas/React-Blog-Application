import express from 'express'
import {
  getUserBlogs,
  getBlogByBlogId,
  createUserBlog,
} from '../controllers/post.controller'

const router = express.Router()

router.get('/user/:userId/posts', getUserBlogs)
router.get('/user/:userId/post/:postId', getBlogByBlogId)
router.post('/users/:userId/createpost/', createUserBlog)

export default router
