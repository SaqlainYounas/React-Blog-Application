import { Request, Response } from 'express'
import users from '../data/users.data'

// Get all users
export const getAllUsers = (req: Request, res: Response) => {
  res.json(users)
}

// Get single user by ID
export const getUserById = (req: Request, res: Response) => {
  const id = req.params.id
  if (!id) {
    return res.status(404).json({ error: 'No ID' })
  }
  const user = users.find((u) => u.id === `${req.params.id}`)
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }
  const { posts, ...userWithoutPosts } = user

  res.json(userWithoutPosts)
}
