import { createAction } from 'redux-actions'
import { SAVE_USER, USER_LOGOUT } from './types'

const insertUser = createAction(SAVE_USER)
const logoutUser = createAction(USER_LOGOUT)

export { insertUser, logoutUser }
