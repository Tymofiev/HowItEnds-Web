import React from 'react'
import { Form, Field } from 'react-final-form'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid, Button } from '@material-ui/core'
import { EmailOutlined } from '@material-ui/icons'

import { required, email, composeValidators } from '../../../utils/validators'
import Input from '../../controls/OwnInput'

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  emailHolder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

const EmailSettings = () => {
  const classes = useStyles()

  const handleEmailUpdate = ({ email }) => {
    console.log(email)
  }

  return (
    <>
      <Typography variant='h6' gutterBottom>
        Email address
      </Typography>
      <Form
        onSubmit={handleEmailUpdate}
        render={({ handleSubmit, submitting, pristine, invalid }) => (
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} className={classes.emailHolder}>
                <Typography component='span'>
                  <EmailOutlined fontSize='large' color='secondary' />
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} className={classes.emailHolder}>
                <Grid item xs={12} sm={6}>
                  <Field name='email' component={Input} validate={composeValidators(required, email)} />
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
                Update email
              </Button>
            </div>
          </form>
        )}
      />
    </>
  )
}

export default EmailSettings
