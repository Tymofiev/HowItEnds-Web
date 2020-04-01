import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Header from './Header'
import Footer from './Footer'

import { getProtected } from '../../api/user'
import { insertUser } from '../../redux/actions/userActions'

const Layout = ({ children, themeToggler, user, insertUser }) => {
  useEffect(() => {
    if (!user) {
      getProtected()
        .then((user) => {
          console.log(user)
          insertUser(user)
        })
        .catch((err) => console.log(err))
    }
  })

  return (
    <>
      <Header themeToggler={themeToggler} />
      {children}
      <Footer />
    </>
  )
}

const mapStateToProps = (store) => {
  return {
    user: store.user.data,
  }
}

export default connect(mapStateToProps, {
  insertUser,
})(Layout)
