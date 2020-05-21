import React from 'react'
import { connect } from 'react-redux'
import { checkAuthorized } from '../../services/user'
import { startLoading, stopLoading } from '../../redux/actions/uiActions'

class LoadingContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      infoLoaded: false,
    }
  }
  componentDidMount() {
    const { checkAuthorized, startLoading, stopLoading } = this.props

    startLoading()
    checkAuthorized()
      .then(() => {
        this.setState({ infoLoaded: true })
      })
      .finally(() => {
        stopLoading()
      })
  }

  componentWillUnmount() {
    this.setState({ infoLoaded: false })
  }

  render() {
    const { children } = this.props
    if (this.state.infoLoaded) {
      return children
    }
    return null
  }
}

export default connect(
  (state) => {
    return {
      user: state.user,
    }
  },
  { checkAuthorized, startLoading, stopLoading },
)(LoadingContainer)
