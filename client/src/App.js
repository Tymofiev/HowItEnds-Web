import React, { useMemo, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './redux/store'

// import useMediaQuery from '@material-ui/core/useMediaQuery'
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles'

import SingUp from './components/user/SignUp'
import SingIn from './components/user/SignIn'
import Profile from './components/user/profile/Profile'

import Home from './components/home'
import NotFound from './components/routes/NotFound'
import Layout from './components/layout/index'

import PrivateRoute from './components/routes/PrivateRoute'

const App = () => {
  const [themeType, setThemeType] = useState('dark')

  let theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: {
            main: '#00838f',
          },
          secondary: {
            main: '#fbc02d',
          },
          type: themeType,
        },
      }),
    [themeType],
  )
  theme = responsiveFontSizes(theme)

  const changeColorTheme = (type) => {
    setThemeType(type)
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path='/login' component={SingIn} />
            <Route exact path='/register' component={SingUp} />
            <Route path='/'>
              <Layout themeToggler={changeColorTheme}>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <PrivateRoute exact path='/profile'>
                    <Profile />
                  </PrivateRoute>
                  <Route path='*' component={NotFound} />
                </Switch>
              </Layout>
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  )
}

export default App
