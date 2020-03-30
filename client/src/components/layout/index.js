import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default ({ children, themeToggler }) => {
  return (
    <>
      <Header themeToggler={themeToggler} />
      {children}
      <Footer />
    </>
  )
}
