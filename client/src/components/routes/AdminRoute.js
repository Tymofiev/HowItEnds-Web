import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { showSnackbar } from '../../services/ui'

const PrivateRoute = ({ children, user, location, showSnackbar }) => {
  const isAdmin = user.data.admin

  useEffect(() => {
    if (!isAdmin) {
      showSnackbar({ variant: 'error', message: 'Only admins have access.' })
    }
  })

  return (
    <>
      {isAdmin ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/',
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
