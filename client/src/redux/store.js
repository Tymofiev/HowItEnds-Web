import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk'

import user from './reducers/userReducer'
import ui from './reducers/uiReducer'

const rootReducer = combineReducers({
  form: formReducer,
  user,
  ui,
})

export default createStore(
  rootReducer,
  compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
)
