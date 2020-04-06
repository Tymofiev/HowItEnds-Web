import { createAction } from 'redux-actions'
import { SAVE_USER, USER_LOGOUT, UPDATE_AVATAR } from './types'

const insertUser = createAction(SAVE_USER)
const logoutUser = createAction(USER_LOGOUT)
const updateAvatar = createAction(UPDATE_AVATAR)

export { insertUser, logoutUser, updateAvatar }
