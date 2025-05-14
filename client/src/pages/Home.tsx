import styled from 'styled-components'
import Sidebar from './../_components/sidebar'
import Content from './../_components/container'
import { useGetSingleUserQuery } from './../redux/stateApi'
import { useAppDispatch, useAppSelector } from '../redux/redux'
import { setUser } from '../redux/store'
import { useEffect } from 'react'

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`

const ProfileContainer = styled.div`
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
`

const UserProfileWrapper = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;
`

const UserImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ccc;
`

const InfoItem = styled.p`
  margin: 0.5rem 0;
  font-size: 1rem;
  color: #333;

  span {
    font-weight: bold;
  }
`

const Heading = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #222;
`
/**
 * React component that displays user profile information.
 * Fetches user data randomly and updates the global state with the user info.
 *
 * @component
 * @returns {JSX.Element} The rendered user profile page or a loading message if user data is not available.
 */
const Home: React.FunctionComponent = () => {
  const random: string = `u${Math.floor(Math.random() * 10) + 1}`
  const { data, isSuccess } = useGetSingleUserQuery(String(random))
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.global.user)
  const userImage = `${import.meta.env.VITE_API_URL}${user?.image}`

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data))
    }
  }, [isSuccess])

  return (
    <LayoutContainer>
      <Sidebar />
      <Content>
        <ProfileContainer>
          <Heading>User Info</Heading>
          {user ? (
            <UserProfileWrapper>
              <UserImage
                src={userImage}
                alt={`${user.firstName} ${user.lastName}`}
              />
              <div>
                <InfoItem>
                  <span>Name:</span> {user.firstName} {user.lastName}
                </InfoItem>
                <InfoItem>
                  <span>Email:</span> {user.email}
                </InfoItem>
                <InfoItem>
                  <span>Occupation:</span> {user.occupation}
                </InfoItem>
              </div>
            </UserProfileWrapper>
          ) : (
            <InfoItem>Loading user data...</InfoItem>
          )}
        </ProfileContainer>
      </Content>
    </LayoutContainer>
  )
}

export default Home
