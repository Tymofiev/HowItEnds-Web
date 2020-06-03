import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Typography } from '@material-ui/core'
import { MessageOutlined, EmailOutlined, SendOutlined } from '@material-ui/icons'
import { Form, Field } from 'react-final-form'
import { connect } from 'react-redux'

import Input from '../../controls/own/OwnInput'
import { required, email, composeValidators } from '../../../utils/validators'
import { showSnackbar } from '../../../services/ui'
import { sendFeedbackEmail } from '../../../api/email'
import { startLoading, stopLoading } from '../../../redux/actions/uiActions'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
  },
}))

const ContactForm = ({ user, startLoading, stopLoading, showSnackbar }) => {
  const classes = useStyles()

  const handleSend = ({ email, message }) => {
    startLoading()
    sendFeedbackEmail(email, message)
      .then((res) => {
        if (res.success) {
          showSnackbar({ message: res.message, variant: 'success' })
        }
      })
      .finally(() => {
        stopLoading()
      })
  }

  return (
    <Form
      onSubmit={handleSend}
      render={({ handleSubmit, submitting, pristine, invalid, form }) => (
        <form
          onSubmit={async (event) => {
            await handleSubmit(event)
            form.reset()
            form.resetFieldState('email')
            form.resetFieldState('message')
          }}
          noValidate
          className={classes.form}
        >
          <Grid container direction='column' className={classes.root}>
            <Grid item xs={12}>
              <Typography component='span' color='textPrimary'>
                <EmailOutlined /> Email
              </Typography>
              <Field
                name='email'
                initialValue={user?.email}
                component={Input}
                validate={composeValidators(required, email)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography component='span' color='textPrimary'>
                <MessageOutlined /> Message
              </Typography>
              <Field name='message' multiline component={Input} validate={composeValidators(required)} />
            </Grid>
            <Grid item xs={12}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                disabled={submitting || invalid || pristine}
                endIcon={<SendOutlined />}
                fullWidth
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    />
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
})(ContactForm)
