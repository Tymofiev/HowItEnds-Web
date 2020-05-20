import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { showSnackbar } from '../../services/ui'

const PrivateRoute = ({ history, children, user, ...rest }) => {
  const isAuthorized = user === 'Unauthorized' ? false : true
  const isActive = true //user.active

  useEffect(() => {
    if (isAuthorized) {
      if (isActive) {
      } else {
        showSnackbar({ message: 'Account is unactive.', variant: 'warning' })
        history.push('/confirmation')
      }
    } else {
      showSnackbar({ message: 'Unathorized.', variant: 'warning' })
      history.push('/login')
    }
  }, [user])

  return (
    <>{children}</>
    // <>
    //   <Route {...rest}>
    //     {isAuthorized ? (
    //       isActive ? (
    //         children
    //       ) : (
    //         <Redirect
    //           to={{
    //             pathname: '/confirmation',
    //           }}
    //         />
    //       )
    //     ) : (
    //       <Redirect
    //         to={{
    //           pathname: '/login',
    //         }}
    //       />
    //     )}
    //   </Route>
    // </>
  )
}

const PrivateRouteWithHistory = withRouter(PrivateRoute)

export default connect(
  (state) => {
    return {
      user: state.user.data,
    }
  },
  { showSnackbar },
)(PrivateRouteWithHistory)
