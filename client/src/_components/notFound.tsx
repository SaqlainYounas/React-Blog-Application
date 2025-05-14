import React from 'react'
import Content from './container'
import { Link } from 'react-router-dom'
import { BACK_TO_HOME, PAGE_NOTFOUND_ERROR } from '../utils/contants'

const NotFound: React.FunctionComponent = () => {
  return (
    <Content>
      <h1>{PAGE_NOTFOUND_ERROR}</h1>
      <Link to={'/dashboard'}>{BACK_TO_HOME}</Link>
    </Content>
  )
}

export default NotFound
