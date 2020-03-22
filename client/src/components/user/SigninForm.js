import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { Form, Field } from 'react-final-form'

import { required, minLength5, email, composeValidators } from '../../utils/validators'
import { insertUser } from '../../redux/actions/userActions'
import { logout } from '../../services/user'
import { register } from '../../api/user'

import OwnInput from '../own/OwnInput'

const SinginForm = ({ insertUser, history, currentUser, logout }) => {
  const sendToServer = ({ email, password }) => {
    if (currentUser) {
      logout()
    }
    register({ email, password })
      .then(({ user, token }) => {
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        insertUser(user)
      })
      .then(() => {
        history.push('/')
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className='container'>
      <Form
        onSubmit={sendToServer}
        render={({ handleSubmit, submitting, pristine, invalid }) => (
          <form onSubmit={handleSubmit}>
            <p className='fa fa-envelope'>Email</p>
            <Field name='email' component={OwnInput} validate={composeValidators(required, email)} />
            <p>Password</p>
            <Field name='password' component={OwnInput} validate={composeValidators(required, minLength5)} />
            <div className='buttons'>
              <button type='submit' disabled={submitting || invalid}>
                Submit
              </button>
            </div>
          </form>
        )}
      />
    </div>
  )
}

const mapStateToProps = (store) => {
  return {
    currentUser: store.user.data,
  }
}

export default connect(mapStateToProps, {
  insertUser,
  logout,
})(SinginForm)

// <Form onSubmit={handleSubmit(sendToServer)}>
//   <Form.Group controlId='formBasicEmail'>
//     <Form.Label>Email</Form.Label>
//     <Field name='email' component={OwnInput} type='text' placeholder='Email' validate={[required(), email()]} />
//   </Form.Group>

//   <Form.Group controlId='formBasicPassword'>
//     <Form.Label>Password</Form.Label>
//     <Field
//       name='password'
//       component={OwnInput}
//       type='password'
//       placeholder='Password'
//       validate={[required(), length(5)]}
//     />
//   </Form.Group>

//   <div>
//     <Button variant={pristine ? 'danger' : 'success'} type='submit' disabled={submitting}>
//       Submit
//     </Button>
//   </div>
// </Form>
