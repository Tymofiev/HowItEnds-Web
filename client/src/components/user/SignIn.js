import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Typography, Grid, Avatar, CssBaseline, Box, Paper } from '@material-ui/core'
import { Form, Field } from 'react-final-form'
import { LockOutlined, ExitToAppOutlined, AccountCircleOutlined, EmailOutlined } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import Input from '../controls/OwnInput'
import Copyright from '../home/Copyright'
import StyledSnackbar from '../controls/StyledSnackbar'
import StyledLink from '../controls/StyledLink'

import { required, email, composeValidators } from '../../utils/validators'
import { login } from '../../services/user'
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

const SingIn = ({ login, history, user }) => {
  const classes = useStyles()
  const [snackbar, setSnackbar] = useState({
    open: false,
    type: '',
    msg: '',
  })

  const handleLogin = ({ email, password }) => {
    login({ email, password })
      .then((err) => {
        if (err) {
          return Promise.reject(err)
        }
      })
      .then(() => {
        setSnackbar({ open: true, type: 'success', msg: 'Succesfuly signed in!' })
        setTimeout(() => {
          history.push('/')
        }, 1000)
      })
      .catch((err) => setSnackbar({ open: true, type: 'error', msg: err }))
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
                    <Field name='password' type='password' component={Input} validate={composeValidators(required)} />
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
      <StyledSnackbar
        message={snackbar.msg}
        open={snackbar.open}
        severity={snackbar.type}
        handleClose={handleSnackbarClose}
      />
    </>
  )
}

const mapStateToProps = (store) => {
  return {
    user: store.user.data,
  }
}

export default connect(mapStateToProps, {
  login,
})(SingIn)
