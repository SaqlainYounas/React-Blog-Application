import express from 'express'
import { getAllUsers, getUserById } from '../controllers/user.controller'

const router = express.Router()

router.get('/users', getAllUsers)
router.get('/user/:id', getUserById)
export default router
