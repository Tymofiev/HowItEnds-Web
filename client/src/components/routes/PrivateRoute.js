import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ children, user, ...rest }) => {
  const isAuthorized = user === 'Unauthorized' ? false : true
  const isActive = true //user.active

  if (isAuthorized) {
    if (isActive) {
    } else {
    }
  } else {
  }

  return (
    <>
      <Route {...rest}>
        {isAuthorized ? (
          isActive ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/confirmation',
              }}
            />
          )
        ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        )}
      </Route>
    </>
  )
}

export default connect((state) => {
  return {
    user: state.user.data,
  }
}, null)(PrivateRoute)
