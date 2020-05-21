import React, { useMemo, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import store from './redux/store'
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles'

import SingUp from './components/auth/SignUp'
import SingIn from './components/auth/SignIn'
import Profile from './components/user/profile/Profile'

import Home from './components/home'
import NotFound from './components/routes/NotFound'
import Layout from './components/layout/index'

import PrivateRoute from './components/routes/PrivateRoute'
import Spinner from './components/controls/wrappers/Spinner'
import Notifier from './components/controls/wrappers/Notifier'
import LoadingContainer from './components/controls/wrappers/LoadingContainer'

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
        <SnackbarProvider maxSnack={3}>
          <Notifier />
          <LoadingContainer>
            <Router>
              <Switch>
                <Route path='/login' component={SingIn} />
                <Route path='/register' component={SingUp} />
                <Layout themeToggler={changeColorTheme}>
                  <Switch>
                    <Route exact path='/' component={Home} />
                    <PrivateRoute exact path='/profile' component={<Profile />} />
                    <Route path='*' component={NotFound} />
                  </Switch>
                </Layout>
              </Switch>
            </Router>
          </LoadingContainer>
        </SnackbarProvider>
        <Spinner />
      </ThemeProvider>
    </Provider>
  )
}

export default App
