import React, { useMemo } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './redux/store'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import SingUp from './components/user/SignUp'
import SingIn from './components/user/SignIn'
import Home from './components/home/Home'
import Footer from './components/home/Footer'
import Profile from './components/user/Profile'

import PrivateRoute from './components/routes/PrivateRoute'
import NotFound from './components/routes/NotFound'
import Header from './components/home/Header'
import Header2 from './components/home/HeaderDepr'

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: {
            main: '#00838f',
          },
          secondary: {
            main: '#fbc02d',
          },
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  )

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path='/login' component={SingIn} />
            <Route exact path='/register' component={SingUp} />
            <Route path='/'>
              <Header />
              <Header2 />
              <Switch>
                <Route exact path='/' component={Home} />
                <PrivateRoute exact path='/profile'>
                  <Profile />
                </PrivateRoute>
                <Route path='*' component={NotFound} />
              </Switch>
              <Footer />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  )
}

export default App
