import React from 'react'

import { showSnackbar } from '../../services/ui'
import { confirmEmail } from '../../api/user'

class Confirm extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params
    const { history } = this.props

    confirmEmail(id)
      .then((res) => {
        if (res.success) {
          showSnackbar({ message: 'Email succesfully confirmed!', variant: 'success' })
          history.push('/')
        }
      })
      .catch((err) => console.log(err))
  }

  render() {
    return null
  }
}

export default Confirm
