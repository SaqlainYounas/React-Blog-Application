import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './_components/notFound'
import Posts from './pages/Posts'
import StoreProvider from './redux/redux'
import Post from './pages/Post'

const router = createBrowserRouter([
  { path: '/dashboard', Component: Home, errorElement: <NotFound /> },
  { path: '/', Component: Home, errorElement: <NotFound /> },
  { path: '/posts', Component: Posts },
  { path: '/post/:postId', Component: Post },
])

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <RouterProvider router={router}></RouterProvider>
    </StoreProvider>
  </React.StrictMode>
)
