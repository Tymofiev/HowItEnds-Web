import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Typography, Grid, Avatar, CssBaseline, Box, Paper } from '@material-ui/core'
import {
  LockOutlined,
  EmailOutlined,
  VpnKeyOutlined,
  AccountCircleOutlined,
  ChildCareOutlined,
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { Form, Field } from 'react-final-form'

import Input from '../controls/OwnInput'
import Copyright from '../home/Copyright'
import StyledSnackbar from '../controls/StyledSnackbar'
import StyledLink from '../controls/StyledLink'

import { required, minLength5, email, composeValidators } from '../../utils/validators'
import { register } from '../../services/user'
import rose from '../../images/rose-oled-8k-8v.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${rose})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const SingUpForm = ({ history, register }) => {
  const classes = useStyles()
  const [snackbar, setSnackbar] = useState({
    open: false,
    type: '',
    msg: '',
  })

  const sendToServer = ({ username, email, password }) => {
    register({ username, email, password })
      .then((err) => {
        if (err) {
          return Promise.reject(err)
        }
      })
      .then(() => {
        setSnackbar({ open: true, type: 'success', msg: 'Succesfuly signed up!' })
        setTimeout(() => {
          history.push('/login')
        }, 1000)
      })
      .catch((err) => {
        console.log(err)
        setSnackbar({ open: true, type: 'error', msg: err })
      })
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbar({ open: false, type: snackbar.type, msg: snackbar.msg })
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
      <StyledSnackbar
        message={snackbar.msg}
        open={snackbar.open}
        severity={snackbar.type}
        handleClose={handleSnackbarClose}
      />
    </>
  )
}

export default connect(null, {
  register,
})(SingUpForm)
