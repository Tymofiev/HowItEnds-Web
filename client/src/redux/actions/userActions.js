import { createAction } from 'redux-actions'
import { SAVE_USER, USER_LOGOUT, UPDATE_AVATAR, SET_ACTIVE } from './types'

const insertUser = createAction(SAVE_USER)
const logoutUser = createAction(USER_LOGOUT)
const insertAvatar = createAction(UPDATE_AVATAR)
const setActive = createAction(SET_ACTIVE)

export { insertUser, logoutUser, setActive, insertAvatar }
