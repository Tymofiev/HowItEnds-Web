import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { required } from 'redux-form-validators'

import { insertUser } from '../../redux/actions/userActions'

import OwnInput from '../own/OwnInput'

const SimpleForm = ({ handleSubmit, pristine, submitting, currentUser, insertUser }) => {
  const sendToServer = ({ username, password }) => {
    console.log('Works! = ' + username, password)
  }

  return (
    <div className='container'>
      <Form onSubmit={handleSubmit(sendToServer)}>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Username</Form.Label>
          <Field name='username' component={OwnInput} type='text' placeholder='Username' validate={[required()]} />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Field name='password' component={OwnInput} type='password' placeholder='Password' validate={[required()]} />
        </Form.Group>

        <div>
          <Button variant={pristine ? 'danger' : 'success'} type='submit' disabled={submitting}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  )
}

const LoginForm = reduxForm({
  form: 'login-form',
})(SimpleForm)

const mapStateToProps = (store) => {
  return {
    currentUser: store.user.data,
  }
}

export default connect(mapStateToProps, {
  insertUser,
})(LoginForm)
