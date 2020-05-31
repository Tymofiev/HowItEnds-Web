import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { showSnackbar } from '../../services/ui'

const PrivateRoute = ({ component, user, location, showSnackbar }) => {
  const isAuthorized = user.isLoggedIn
  const isActive = user.data.active

  useEffect(() => {
    if (!isAuthorized) {
      showSnackbar({ variant: 'error', message: 'Unathorized.' })
    } else if (!isActive) {
      showSnackbar({ variant: 'error', message: 'Unactive.' })
    }
  })

  return (
    <>
      {isAuthorized ? (
        isActive ? (
          component
        ) : (
          <Redirect
            to={{
              pathname: '/confirmation',
              state: { from: location },
            }}
          />
        )
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      )}
    </>
  )
}

const PrivateWithRouter = withRouter(PrivateRoute)

export default connect(
  (state) => {
    return {
      user: state.user,
    }
  },
  { showSnackbar },
)(PrivateWithRouter)
