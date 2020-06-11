import React from 'react'

import Header from './Header'
import Footer from './Footer'

const Layout = ({ children, themeToggler, paletteChanger }) => {
  return (
    <>
      <Header themeToggler={themeToggler} paletteChanger={paletteChanger} />
      {children}
      <Footer />
    </>
  )
}

export default Layout
