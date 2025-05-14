import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type Tab = 'Dashboard' | 'Post'

export type Post = {
  id: string
  author: string
  content: string
  publishDate: string
  subTitle: string
  title: string
  image: string
}

export type User = {
  id: string
  firstName: string
  lastName: string
  image: string
  occupation: string
  email: string
  age: string
  PostPosts: Post
}

export interface InitialStateTypes {
  selectedTab: Tab
  user: UserWithoutPosts | null
  Posts: Post | null
}

const initialState: InitialStateTypes = {
  selectedTab: 'Dashboard',
  user: null,
  Posts: null,
}

export type UserWithoutPosts = Omit<User, 'PostPosts'>

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setSelectedTab: (state, action: PayloadAction<Tab>) => {
      state.selectedTab = action.payload
    },
    setUser: (state, action: PayloadAction<UserWithoutPosts>) => {
      state.user = action.payload
    },
    setPosts: (state, action: PayloadAction<Post>) => {
      state.Posts = action.payload
    },
  },
})

export const { setSelectedTab, setUser } = globalSlice.actions
export default globalSlice.reducer
