import React from 'react'
import { Form, Field } from 'react-final-form'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid, Button } from '@material-ui/core'
import { VpnKeyOutlined } from '@material-ui/icons'

import { required, match, composeValidators } from '../../../utils/validators'
import Input from '../../controls/OwnInput'

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

const PasswordSettings = () => {
  const classes = useStyles()

  const handlePasswordUpdate = ({ password }) => {
    console.log(password)
  }

  return (
    <>
      <Typography variant='h6' gutterBottom>
        Password
      </Typography>
      <Form
        onSubmit={handlePasswordUpdate}
        render={({ handleSubmit, submitting, pristine, invalid, values: { password } }) => (
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} className={classes.passwordHolder}>
                <Typography component='span'>
                  <VpnKeyOutlined fontSize='large' color='secondary' />
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} className={classes.passwordHolder}>
                <Grid item xs={12} sm={6}>
                  <Typography>Old password</Typography>
                  <Field name='oldPassword' type='password' component={Input} validate={composeValidators(required)} />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} className={classes.passwordHolder}>
                <Grid item xs={12} sm={6}>
                  <Typography>New password</Typography>
                  <Field name='password' type='password' component={Input} validate={composeValidators(required)} />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} className={classes.passwordHolder}>
                <Grid item xs={12} sm={6}>
                  <Typography>New password repeat</Typography>
                  <Field
                    name='passwordRepeat'
                    type='password'
                    component={Input}
                    validate={composeValidators(required, match(password))}
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

export default PasswordSettings
