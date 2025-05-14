import styled from 'styled-components'
import { User, LayoutDashboard, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { setSelectedTab, type Tab } from '../redux/store'
import { useAppDispatch, useAppSelector } from '../redux/redux'
import Content from './container'
import { LOADING, USER_NOTFOUND_ERROR } from '../utils/contants'
const SidebarContainer = styled.aside`
  width: 250px;
  min-width: 250px;
  background-color: #f8f9fa;
  height: 100vh;
  left: 0;
  top: 0;
  padding: 1.5rem;
  border-right: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
`

const UserSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e9ecef;
`

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`

const UserName = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0.5rem 0 0.25rem;
`

const UserRole = styled.p`
  font-size: 0.875rem;
  color: #6c757d;
  margin: 0;
`

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  color: #495057;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e9ecef;
  }

  &.active {
    background-color: #e9ecef;
    font-weight: 500;
  }
`

const NavIcon = styled.span`
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
`

const InfoItem = styled.p`
  margin: 0.5rem 0;
  font-size: 1rem;
  color: #333;

  span {
    font-weight: bold;
  }
`
const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  position: relative;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const UserImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`

const Sidebar: React.FunctionComponent = () => {
  const selectedTab = useAppSelector((state) => state.global.selectedTab)
  const user = useAppSelector((state) => state.global.user)
  if (!user) {
    return (
      <LayoutContainer>
        <Sidebar />
        <Content>
          <h1>{USER_NOTFOUND_ERROR}</h1>
        </Content>
      </LayoutContainer>
    )
  }
  const dispatch = useAppDispatch()

  const toggleSelectedTab = (tabName: Tab) => {
    dispatch(setSelectedTab(tabName))
  }
  const userImage = `${import.meta.env.VITE_API_URL}${user.image}`
  return (
    <SidebarContainer>
      <UserSection>
        <Avatar>
          <UserImage
            src={userImage}
            alt={`${user.firstName} ${user.lastName}`}
          />
        </Avatar>
        {user ? (
          <>
            <UserName>
              {user.firstName} {user.lastName}
            </UserName>
            <UserRole>{user.occupation}</UserRole>
          </>
        ) : (
          <InfoItem>{LOADING}</InfoItem>
        )}
      </UserSection>

      <Navigation>
        <NavItem
          to="/dashboard"
          className={selectedTab === 'Dashboard' ? 'active' : ''}
          onClick={() => toggleSelectedTab('Dashboard')}
        >
          <NavIcon>
            <LayoutDashboard size={18} />
          </NavIcon>
          Dashboard
        </NavItem>
        <NavItem
          to="/posts"
          className={selectedTab === 'Post' ? 'active' : ''}
          onClick={() => toggleSelectedTab('Post')}
        >
          <NavIcon>
            <BookOpen size={18} />
          </NavIcon>
          Posts
        </NavItem>
      </Navigation>
    </SidebarContainer>
  )
}

export default Sidebar
