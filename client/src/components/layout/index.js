import React from 'react'

import Header from './Header'
import Footer from './Footer'

const Layout = ({ children, themeToggler }) => {
  return (
    <>
      <Header themeToggler={themeToggler} />
      {children}
      <Footer />
    </>
  )
}
export default Layout
