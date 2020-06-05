import React from 'react'
import { connect } from 'react-redux'
import { Form, Field } from 'react-final-form'
import { Button, Typography, Grid, Avatar, CssBaseline, Box, Paper } from '@material-ui/core'
import { LockOutlined, ExitToAppOutlined, AccountCircleOutlined, EmailOutlined } from '@material-ui/icons'
import clsx from 'clsx'

import Input from '../controls/own/OwnInput'
import PasswordInput from '../controls/own/PasswordInput'
import Checkbox from '../controls/own/OwnCheckbox'
import Copyright from '../layout/components/Copyright'
import StyledLink from '../controls/styled/StyledLink'

import { required, email, composeValidators } from '../../utils/validators'
import { login } from '../../services/auth'
import { showSnackbar } from '../../services/ui'
import { startLoading, stopLoading } from '../../redux/actions/uiActions'

import useStyles from './style'

const SingIn = ({ login, startLoading, stopLoading, showSnackbar, history, user }) => {
  const classes = useStyles()

  const handleLogin = ({ email, password, remember }) => {
    startLoading()
    login({ email, password, remember })
      .then((err) => {
        if (err) {
          return Promise.reject(err)
        }
      })
      .then(() => {
        showSnackbar({ message: 'Succesfuly signed in!', variant: 'success' })
        history.push('/')
      })
      .catch((err) => showSnackbar({ message: err, variant: 'error' }))
      .finally(() => {
        stopLoading()
      })
  }

  return (
    <>
      <Grid container component='main' className={clsx(classes.root, classes.image)}>
        <CssBaseline />
        <Grid item xs={false} sm={3} md={3} />
        <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <AccountCircleOutlined />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <Form
              onSubmit={handleLogin}
              render={({ handleSubmit, submitting, pristine, invalid }) => (
                <form onSubmit={handleSubmit} className={classes.form} noValidate>
                  <Grid item xl={12}>
                    <Typography component='span'>
                      <EmailOutlined /> Email
                    </Typography>
                    <Field
                      name='email'
                      initialValue={user?.email}
                      //initialValue='ilia.tumofiev@gmail.com'
                      component={Input}
                      validate={composeValidators(required, email)}
                    />
                  </Grid>
                  <Grid item xl={12}>
                    <Typography component='span'>
                      <LockOutlined /> Password
                    </Typography>
                    <Field
                      name='password'
                      type='password'
                      component={PasswordInput}
                      validate={composeValidators(required)}
                    />
                  </Grid>
                  <Grid item xl={12}>
                    <Field name='remember' type='checkbox' color='primary' component={Checkbox} />
                  </Grid>
                  <Grid item xl={12}>
                    <Button
                      type='submit'
                      variant='contained'
                      color='primary'
                      disabled={submitting || invalid || pristine}
                      endIcon={<ExitToAppOutlined />}
                      className={classes.submit}
                      fullWidth
                    >
                      Sign In
                    </Button>
                  </Grid>
                  <Grid container>
                    <Grid item xs>
                      <StyledLink to='/' variant='body2'>
                        Back Home
                      </StyledLink>
                    </Grid>
                    <Grid item>
                      <StyledLink to='/register' variant='body2'>
                        {'Don`t have an account? Sign Up'}
                      </StyledLink>
                    </Grid>
                  </Grid>
                  <Box mt={5}>
                    <Copyright />
                  </Box>
                </form>
              )}
            />
          </div>
        </Grid>
      </Grid>
    </>
  )
}

const mapStateToProps = (store) => {
  return {
    user: store.user.data,
  }
}

export default connect(mapStateToProps, {
  startLoading,
  stopLoading,
  showSnackbar,
  login,
})(SingIn)
