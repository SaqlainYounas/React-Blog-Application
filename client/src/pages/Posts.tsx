import React from 'react'
import styled from 'styled-components'
import Sidebar from '../_components/sidebar'
import Content from '../_components/container'
import { useGetPostsQuery } from '../redux/stateApi'
import { useAppSelector } from '../redux/redux'
import { Link } from 'react-router-dom'
import type { Post } from '../redux/store'
import {
  FAILED_TO_LOAD,
  LOADING,
  NO_POST_FOUND,
  USER_NOTFOUND_ERROR,
} from '../utils/contants'

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const PostPost = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e9ecef;

  &:last-child {
    border-bottom: none;
  }
`

const PostTitle = styled(Link)`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #0070f3;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const PostMeta = styled.div`
  font-size: 0.875rem;
  color: #6c757d;
  margin-bottom: 1rem;
`
/**
 * React component that displays a list of posts for the logged-in user.
 * @component
 * @returns {JSX.Element} The rendered list of posts or appropriate status message.
 */
const Posts: React.FunctionComponent = () => {
  const user = useAppSelector((state) => state.global.user)

  if (!user) {
    return (
      <LayoutContainer>
        <Sidebar />
        <Content>
          <p>{USER_NOTFOUND_ERROR}</p>
        </Content>
      </LayoutContainer>
    )
  }

  const { data: posts, isLoading, isError } = useGetPostsQuery(user.id)

  return (
    <LayoutContainer>
      <Sidebar />
      <Content>
        <h1>Blogs</h1>
        {isLoading && <p>{LOADING}</p>}
        {isError && <p>{FAILED_TO_LOAD}</p>}
        {posts && posts.length > 0
          ? posts.map((post: Post) => (
              <PostPost key={post.id}>
                <PostTitle to={`/post/${post.id}`}>{post.title}</PostTitle>
                <PostMeta>
                  Published on {post.publishDate} by {post.author}
                </PostMeta>
              </PostPost>
            ))
          : !isLoading && <p>{NO_POST_FOUND}</p>}
      </Content>
    </LayoutContainer>
  )
}

export default Posts
