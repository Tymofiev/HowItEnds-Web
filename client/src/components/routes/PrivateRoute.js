import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated = true

  return (
    <>
      <Route {...rest}>
        {isAuthenticated ? (
          children
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

export default PrivateRoute
