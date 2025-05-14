import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'

import userRoutes from './routes/users.route'
import postRoutes from './routes/posts.route'

const app = express()

/* CONFIGURATIONS */
const corsOptions = {
  origin: process.env.FRONTEND_HOST,
}

app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(cookieParser())
app.use(cors(corsOptions))

app.use('/images', express.static(path.join(__dirname, '../public/images')))
/* ROUTES */
app.use('/', userRoutes)
app.use('/', postRoutes)

// Catch-all 404 handler (MUST be after all other routes)
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: '404 Invalid Route',
  })
})

export default app
