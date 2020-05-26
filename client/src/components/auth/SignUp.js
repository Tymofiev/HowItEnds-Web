import React from 'react'
import { connect } from 'react-redux'
import { Button, Typography, Grid, Avatar, CssBaseline, Box, Paper } from '@material-ui/core'
import {
  LockOutlined,
  EmailOutlined,
  VpnKeyOutlined,
  AccountCircleOutlined,
  ChildCareOutlined,
} from '@material-ui/icons'
import { Form, Field } from 'react-final-form'

import Input from '../controls/own/OwnInput'
import Copyright from '../layout/components/Copyright'
import StyledLink from '../controls/styled/StyledLink'

import { required, minLength5, email, composeValidators } from '../../utils/validators'
import { register } from '../../services/user'
import { showSnackbar } from '../../services/ui'
import { startLoading, stopLoading } from '../../redux/actions/uiActions'

import useStyles from './style'

const SingUpForm = ({ history, register, showSnackbar, startLoading, stopLoading }) => {
  const classes = useStyles()

  const sendToServer = ({ username, email, password }) => {
    startLoading()
    register({ username, email, password })
      .then((res) => {
        if (res.err) {
          return Promise.reject(res.err)
        }
        showSnackbar({ message: res.emailStatus, variant: 'success' })
      })
      .then(() => {
        showSnackbar({ message: 'Succesfuly signed up!', variant: 'success' })
        history.push('/login')
      })
      .catch((err) => {
        showSnackbar({ message: err, variant: 'error' })
      })
      .finally(() => {
        stopLoading()
      })
  }

  return (
    <>
      <Grid container component='main' className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <AccountCircleOutlined />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign up
            </Typography>
            <Form
              onSubmit={sendToServer}
              render={({ handleSubmit, submitting, pristine, invalid }) => (
                <form onSubmit={handleSubmit} className={classes.form} noValidate>
                  <Grid item xl={12}>
                    <Typography component='span'>
                      <ChildCareOutlined /> Username
                    </Typography>
                    <Field name='username' component={Input} validate={composeValidators(required)} />
                  </Grid>
                  <Grid item xl={12}>
                    <Typography component='span'>
                      <EmailOutlined /> Email
                    </Typography>
                    <Field name='email' component={Input} validate={composeValidators(required, email)} />
                  </Grid>
                  <Grid item xl={12}>
                    <Typography component='span'>
                      <LockOutlined /> Password
                    </Typography>
                    <Field
                      name='password'
                      type='password'
                      component={Input}
                      validate={composeValidators(required, minLength5)}
                    />
                  </Grid>
                  <Grid item xl={12}>
                    <Button
                      type='submit'
                      variant='contained'
                      color='primary'
                      disabled={submitting || invalid || pristine}
                      endIcon={<VpnKeyOutlined />}
                      className={classes.submit}
                      fullWidth
                    >
                      Sign Up
                    </Button>
                  </Grid>
                  <Grid container>
                    <Grid item xs>
                      <StyledLink to='/' variant='body2'>
                        Back Home
                      </StyledLink>
                    </Grid>
                    <Grid item>
                      <StyledLink to='/login' variant='body2'>
                        {'Already have an account? Sign In'}
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

export default connect(null, {
  startLoading,
  stopLoading,
  showSnackbar,
  register,
})(SingUpForm)
