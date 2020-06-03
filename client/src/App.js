import React, { useMemo, useState, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles'
import AOS from 'aos'
import 'aos/dist/aos.css'

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

import Users from './components/admin/Users'
import Posts from './components/admin/Posts'
import Dashboard from './components/admin/index'
const AdminLayout = lazy(() => import('./components/admin/Layout'))

AOS.init()

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
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  <Route path='/login' component={SingIn} />
                  <Route path='/register' component={SingUp} />
                  <Route path='/admin'>
                    <Switch>
                      <AdminLayout>
                        <Route exact path='/admin' component={Dashboard} />
                        <Route exact path='/admin/users' component={Users} />
                        <Route exact path='/admin/posts' component={Posts} />
                      </AdminLayout>
                    </Switch>
                  </Route>
                  <Layout themeToggler={changeColorTheme}>
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
      </ThemeProvider>
    </Provider>
  )
}

export default App
