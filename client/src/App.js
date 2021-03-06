import React, { useMemo, useState, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {} from './api/palette'

import { DARK, LIGHT, DEFAULT_DARK_PALETTE, DEFAULT_LIGHT_PALETTE } from './constants'
import store from './redux/store'
import SingUp from './components/auth/SignUp'
import SingIn from './components/auth/SignIn'
import Profile from './components/user/profile/Profile'

import Home from './components/home'
import NotFound from './components/routes/NotFound'
import Layout from './components/layout/index'
import Confirm from './components/email/Confirm'
import Confirmation from './components/email/Confirmation'

import PrivateRoute from './components/routes/PrivateRoute'
import Spinner from './components/controls/wrappers/Spinner'
import Notifier from './components/controls/wrappers/Notifier'
import LoadingContainer from './components/controls/wrappers/LoadingContainer'

import News from './components/news/index'
import Gallery from './components/gallery/index'
import NewsPost from './components/news/NewsPost'

import AdminRoute from './components/routes/AdminRoute'
import AdminSpinner from './components/controls/wrappers/AdminSpinner'
import Users from './components/admin/Users'
import Posts from './components/admin/Posts'
import Images from './components/admin/Images'
import Dashboard from './components/admin/index'
const AdminLayout = lazy(() => import('./components/admin/Layout'))

AOS.init()

const App = () => {
  const [themeType, setThemeType] = useState(DARK)
  const [palette, setPalette] = useState(themeType === DARK ? DEFAULT_DARK_PALETTE : DEFAULT_LIGHT_PALETTE)
  const [customPalette, setCustomPalette] = useState(DEFAULT_DARK_PALETTE)

  let theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          ...palette,
          type: themeType,
        },
      }),
    [themeType, palette],
  )
  theme = responsiveFontSizes(theme)

  const changeColorTheme = (type) => {
    setThemeType(type)
    if (type === LIGHT) {
      setPalette(DEFAULT_LIGHT_PALETTE)
    } else {
      setPalette(customPalette)
    }
  }

  const changePalette = (palette) => {
    setPalette(palette)
    setCustomPalette(palette)
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <SnackbarProvider maxSnack={3}>
            <Notifier />
            <LoadingContainer>
              <Router>
                <Suspense fallback={<AdminSpinner />}>
                  <Switch>
                    <Route path='/login' component={SingIn} />
                    <Route path='/register' component={SingUp} />
                    <Route path='/admin'>
                      <Switch>
                        <AdminLayout>
                          <AdminRoute path='/admin'>
                            <Route exact path='/admin' component={Dashboard} />
                            <Route exact path='/admin/users' component={Users} />
                            <Route exact path='/admin/posts' component={Posts} />
                            <Route exact path='/admin/images' component={Images} />
                          </AdminRoute>
                        </AdminLayout>
                      </Switch>
                    </Route>
                    <Layout themeToggler={changeColorTheme} paletteChanger={changePalette}>
                      <Switch>
                        <Route path='/confirmation' component={Confirmation} />
                        <Route path='/gallery' component={Gallery} />
                        <PrivateRoute exact path='/profile' component={<Profile />} />
                        <Route exact path='/confirm/:id' component={Confirm} />
                        <Route exact path='/news' component={News} />
                        <Route exact path='/news/:id' component={NewsPost} />
                        <Route exact path='/' component={Home} />
                        <Route path='*' component={NotFound} />
                      </Switch>
                    </Layout>
                  </Switch>
                </Suspense>
              </Router>
            </LoadingContainer>
          </SnackbarProvider>
          <Spinner />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
