import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../redux/redux'
import styled from 'styled-components'
import Sidebar from '../_components/sidebar'
import Content from '../_components/container'
import { useGetPostByPostIdQuery } from '../redux/stateApi'
import axios from 'axios'
import { ArrowLeft, Edit, Trash } from 'lucide-react'
import { Transform } from '../utils/utils'
import {
  LOADING,
  MISSING_POST_ID,
  MISSING_POST_ID_DESC,
  NO_POST_FOUND,
  POST_DELETE_FAILED_MSG,
  POST_DELETE_SUCCESS_MSG,
  POST_UPDATE_FAILED_MSG,
  POST_UPDATE_SUCCESS_MSG,
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`

const IconButton = styled.button`
  background: transparent;
  border: 1px solid #ddd;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f9f9f9;
    border-color: #ccc;
  }

  svg {
    height: 1rem;
    width: 1rem;
  }
`

const Meta = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`

const TitleInput = styled.input`
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  width: 100%;
  border: 1px solid #ddd;
  padding: 0.5rem;
  border-radius: 6px;
`

const SubtitleInput = styled.input`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  width: 100%;
  border: 1px solid #ddd;
  padding: 0.5rem;
  border-radius: 6px;
`

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  line-height: 1.6;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
`

const SaveButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-top: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #e9e9e9;
  }
`

const PostImage = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
  }
`

const PostTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #333;
`

const PostSubtitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: #555;
`

const PostBody = styled.div`
  line-height: 1.8;
  font-size: 1.1rem;
  color: #444;

  p {
    margin-bottom: 1.5rem;
  }
`

const PostContent = styled.div`
  margin-top: 1rem;
`

const EditForm = styled.div`
  margin-top: 1.5rem;
`

/**
 * React component for displaying, editing, and deleting a single post.
 * Allows users to view post details, enter edit mode, save changes, or delete the post.
 *
 * @component
 * @returns {JSX.Element} The rendered post view/edit interface.
 */

const Post: React.FunctionComponent = () => {
  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState({
    title: '',
    subTitle: '',
    content: '',
  })
  const navigate = useNavigate()
  const { postId } = useParams<{ postId: string }>()

  if (!postId) {
    return (
      <LayoutContainer>
        <Sidebar />
        <Content>
          <h1>{MISSING_POST_ID}</h1>
          <p>{MISSING_POST_ID_DESC}</p>
        </Content>
      </LayoutContainer>
    )
  }

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

  const { data, isLoading, isError } = useGetPostByPostIdQuery({
    userId: user.id,
    postId: postId,
  })

  const handleEdit = () => {
    if (data) {
      setForm({
        title: data.title,
        subTitle: data.subTitle,
        content: data.content,
      })
      setEditMode(true)
    }
  }

  /**
   * Deletes a post by ID and navigates to the posts page.
   * Shows an alert on success or failure.
   *
   * @async
   * @function handleDelete
   * @returns {Promise<void>}
   */
  const handleDelete = async () => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      alert(`${POST_DELETE_SUCCESS_MSG}`)
      navigate('/posts')
    } catch (err) {
      alert(`${POST_DELETE_FAILED_MSG}`)
    }
  }
  /**
   * Saves the edited post by merging form and existing data, transforming it, and sending a PUT request.
   * Shows alerts based on success or failure, and exits edit mode on success.
   *
   * @async @function handleSave
   * @returns {Promise<void>}
   */
  const handleSave = async () => {
    try {
      const updatedPost = {
        ...data,
        ...form,
      }
      const transformedUpdatePost = Transform({
        id: updatedPost.id ?? '',
        author: updatedPost.author ?? '',
        publishDate: updatedPost.publishDate ?? '',
        image: updatedPost.image ?? '',
        ...updatedPost,
      })
      await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${transformedUpdatePost.id}`,
        transformedUpdatePost
      )
      alert(`${POST_UPDATE_SUCCESS_MSG}`)
      setEditMode(false)
    } catch (err) {
      alert(`${POST_UPDATE_FAILED_MSG}`)
    }
  }

  if (isLoading) {
    return (
      <LayoutContainer>
        <Sidebar />
        <Content>
          <h1>{LOADING}</h1>
        </Content>
      </LayoutContainer>
    )
  }

  if (!data || isError) {
    return (
      <LayoutContainer>
        <Sidebar />
        <Content>
          <h1>{NO_POST_FOUND}</h1>
        </Content>
      </LayoutContainer>
    )
  }
  const imageSource = `${import.meta.env.VITE_API_URL}${data.image}`
  console.log('IMAGE SOURCE', imageSource)
  return (
    <LayoutContainer>
      <Sidebar />
      <Content>
        <PostImage>
          <img src={imageSource || '/placeholder.svg'} alt={data.title} />
        </PostImage>
        <Header>
          <IconButton onClick={() => navigate('/posts')}>
            <ArrowLeft />
          </IconButton>

          {!editMode && (
            <Actions>
              <IconButton onClick={handleEdit}>
                <Edit />
              </IconButton>
              <IconButton onClick={handleDelete}>
                <Trash />
              </IconButton>
            </Actions>
          )}
        </Header>

        {editMode ? (
          <EditForm>
            <TitleInput
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <SubtitleInput
              type="text"
              value={form.subTitle}
              onChange={(e) => setForm({ ...form, subTitle: e.target.value })}
            />
            <TextArea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
            <SaveButton onClick={handleSave}>Save</SaveButton>
          </EditForm>
        ) : (
          <PostContent>
            <PostTitle>{data.title}</PostTitle>
            <PostSubtitle>{data.subTitle}</PostSubtitle>
            <Meta>
              Published on {data.publishDate} by {user.firstName}{' '}
              {user.lastName}
            </Meta>
            <PostBody>{data.content}</PostBody>
          </PostContent>
        )}
      </Content>
    </LayoutContainer>
  )
}

export default Post
