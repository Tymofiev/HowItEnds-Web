import React from 'react'
import { Grid, Typography, Button, Paper } from '@material-ui/core'
import { connect } from 'react-redux'

import { showSnackbar } from '../../services/ui'
import { checkAuthorized } from '../../services/auth'
import { sendConfirmationEmail } from '../../api/auth'
import { startLoading, stopLoading } from '../../redux/actions/uiActions'

import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
  paper: {
    padding: theme.spacing(10, 10, 10, 10),
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
  },
  button: {
    marginTop: theme.spacing(5),
  },
})

class Confirmation extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      emailStatus: '',
    }
  }

  componentDidMount() {
    const { user } = this.props

    if (user.active) {
      this.setState({ emailStatus: 'Email has already been confirmed' })
    } else {
      this.setState({ emailStatus: 'Email was succesfully sent to you' })
    }
  }

  handleResendEmail = () => {
    const { user, startLoading, stopLoading, showSnackbar } = this.props

    startLoading()
    sendConfirmationEmail(user.email, user._id)
      .then((res) => {
        this.setState({ emailStatus: res.message })
        showSnackbar({ message: res.message, variant: 'success' })
      })
      .finally(() => {
        stopLoading()
      })
  }

  render() {
    const { classes } = this.props

    return (
      <Grid className={classes.root} container direction='row' justify='center' alignItems='center'>
        <Paper className={classes.paper}>
          <Grid item>
            <Typography variant='h5'>{this.state.emailStatus}</Typography>
          </Grid>
          <Grid item>
            <Grid container direction='row' justify='center' alignItems='center'>
              <Grid>
                <Typography>Didn`t get confirmation letter? Click the button below!</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction='row' justify='center' alignItems='center'>
              <Grid>
                <Button
                  className={classes.button}
                  color='secondary'
                  variant='contained'
                  onClick={this.handleResendEmail}
                >
                  Resend
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    )
  }
}

export default connect(
  (state) => {
    return {
      user: state.user.data,
    }
  },
  {
    startLoading,
    stopLoading,
    showSnackbar,
    checkAuthorized,
  },
)(withStyles(styles)(Confirmation))
