import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './redux/store'

import LoginForm from './components/user/LoginForm'
import SinginForm from './components/user/SigninForm'
import Home from './components/home/Home'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path='/login' component={LoginForm} />
            <Route exact path='/register' component={SinginForm} />
            <Route path='/' component={Home} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App
