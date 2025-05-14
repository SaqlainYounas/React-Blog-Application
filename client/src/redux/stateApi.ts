import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Post, UserWithoutPosts } from './store'

export const StateApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query<ResponseType, void>({
      query: () => {
        return {
          url: '/users',
          method: 'GET',
        }
      },
    }),
    getSingleUser: builder.query<UserWithoutPosts, string>({
      query: (userId: string) => ({
        url: `/user/${userId}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getPosts: builder.query<Post[], string>({
      query: (userId: string) => ({
        url: `/user/${userId}/posts`,
        method: 'GET',
      }),
    }),
    getPostByPostId: builder.query<Post, { userId: string; postId: string }>({
      query: ({ userId, postId }) => ({
        url: `/user/${userId}/post/${postId}`,
        method: 'GET',
      }),
    }),
    createPosts: builder.mutation({
      query: (newPost) => {
        return {
          url: '/posts',
          method: 'POST',
          body: newPost,
          headers: {
            'Content-type': 'application/json',
          },
        }
      },
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostByPostIdQuery,
  useCreatePostsMutation,
  useGetUsersQuery,
  useGetSingleUserQuery,
} = StateApi
