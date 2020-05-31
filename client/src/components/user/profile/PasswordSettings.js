import React from 'react'
import { Form, Field } from 'react-final-form'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid, Button } from '@material-ui/core'
import { VpnKeyOutlined } from '@material-ui/icons'

import { required, match, composeValidators, minLength5 } from '../../../utils/validators'
import PasswordInput from '../../controls/own/PasswordInput'
import { updateUserPassword } from '../../../services/user'
import { showSnackbar } from '../../../services/ui'
import { startLoading, stopLoading } from '../../../redux/actions/uiActions'

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  passwordHolder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

const PasswordSettings = ({ user, updateUserPassword, startLoading, stopLoading, showSnackbar }) => {
  const classes = useStyles()

  const handlePasswordUpdate = ({ oldPassword, password }) => {
    startLoading()
    updateUserPassword(oldPassword, password, user._id)
      .then(() => {
        showSnackbar({ message: 'Password sucesfully updated', variant: 'success' })
      })
      .catch((e) => {
        if (e.response) {
          const { message } = e.response.data
          showSnackbar({ message: message, variant: 'error' })
        } else {
          console.log(e)
        }
      })
      .finally(() => {
        stopLoading()
      })
  }

  return (
    <>
      <Typography variant='h6' gutterBottom>
        Password
      </Typography>
      <Form
        onSubmit={handlePasswordUpdate}
        render={({ handleSubmit, submitting, pristine, invalid, form, values: { password } }) => (
          <form
            onSubmit={async (event) => {
              await handleSubmit(event)
              form.reset()
              form.resetFieldState('oldPassword')
              form.resetFieldState('passwordRepeat')
              form.resetFieldState('password')
            }}
            className={classes.form}
            noValidate
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} className={classes.passwordHolder}>
                <Typography component='span'>
                  <VpnKeyOutlined fontSize='large' color='secondary' />
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} className={classes.passwordHolder}>
                <Grid item xs={12} sm={6}>
                  <Typography>Old password</Typography>
                  <Field
                    name='oldPassword'
                    type='password'
                    component={PasswordInput}
                    validate={composeValidators(required)}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} className={classes.passwordHolder}>
                <Grid item xs={12} sm={6}>
                  <Typography>New password</Typography>
                  <Field
                    name='password'
                    type='password'
                    component={PasswordInput}
                    validate={composeValidators(required, minLength5)}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} className={classes.passwordHolder}>
                <Grid item xs={12} sm={6}>
                  <Typography>New password repeat</Typography>
                  <Field
                    name='passwordRepeat'
                    type='password'
                    component={PasswordInput}
                    validate={composeValidators(required, minLength5, match(password))}
                  />
                </Grid>
              </Grid>
            </Grid>
            <div className={classes.buttons}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                disabled={submitting || invalid || pristine}
                className={classes.button}
              >
                Update password
              </Button>
            </div>
          </form>
        )}
      />
    </>
  )
}

export default connect(
  (state) => {
    return { user: state.user.data }
  },
  {
    updateUserPassword,
    startLoading,
    stopLoading,
    showSnackbar,
  },
)(PasswordSettings)
