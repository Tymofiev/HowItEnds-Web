import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { connect } from 'react-redux'

import { showSnackbar } from '../../services/ui'
import { checkAuthorized } from '../../services/user'
import { confirmEmail } from '../../api/user'
import { startLoading, stopLoading } from '../../redux/actions/uiActions'

class Confirm extends React.Component {
  componentDidMount() {
    const { history, showSnackbar, startLoading, stopLoading, checkAuthorized } = this.props
    const { id } = this.props.match.params

    startLoading()
    confirmEmail(id)
      .then((res) => {
        checkAuthorized().then(() => {
          showSnackbar({ message: 'Email succesfully confirmed!', variant: 'success' })
          history.push('/')
        })
      })
      .catch((err) => {
        showSnackbar({ message: err.message, variant: 'error' })
        history.push('/')
      })
      .finally(() => {
        stopLoading()
      })
  }

  render() {
    return (
      <Grid style={{ height: '90vh' }} container direction='row' justify='center' alignItems='center'>
        <Typography>Your email is being confirmed. Hold it tight!</Typography>
      </Grid>
    )
  }
}

export default connect(null, {
  startLoading,
  stopLoading,
  showSnackbar,
  checkAuthorized,
})(Confirm)
