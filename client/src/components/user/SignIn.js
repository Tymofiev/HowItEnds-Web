import React from 'react'
import { connect } from 'react-redux'
import { Button, Typography, Grid, Avatar, CssBaseline, Box, Paper, Link } from '@material-ui/core'
import { Form, Field } from 'react-final-form'
import { LockOutlined, ExitToAppOutlined, AccountCircleOutlined, ChildCareOutlined } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import { required, minLength5, composeValidators } from '../../utils/validators'
import { insertUser } from '../../redux/actions/userActions'
import { login } from '../../api/user'

import Input from '../controls/OwnInput'
import Copyright from '../home/Copyright'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
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

const SingIn = ({ insertUser, history, currentUser }) => {
  const classes = useStyles()

  const sendToServer = ({ username, email, password }) => {
    alert(username + email + password)
    // if (currentUser) {
    //   logout()
    // }
    // register({ email, password })
    //   .then(({ user, token }) => {
    //     localStorage.setItem('token', token)
    //     localStorage.setItem('user', JSON.stringify(user))
    //     insertUser(user)
    //   })
    //   .then(() => {
    //     history.push('/')
    //   })
    //   .catch((err) => console.log(err))
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
                      endIcon={<ExitToAppOutlined />}
                      className={classes.submit}
                      fullWidth
                    >
                      Sign In
                    </Button>
                  </Grid>
                  <Grid container>
                    <Grid item xs>
                      <Link href='/' variant='body2'>
                        Back Home
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href='/register' variant='body2'>
                        {'Don`t have an account? Sign Up'}
                      </Link>
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
    currentUser: store.user.data,
  }
}

export default connect(mapStateToProps, {
  insertUser,
})(SingIn)
