import { updateAvatar, updateEmail, updatePassword } from '../api/user'
import { insertUser, insertAvatar } from '../redux/actions/userActions'

export const updateUserAvatar = ({ file, id }) => (dispatch) => {
  return updateAvatar({ file, id }).then((res) => {
    dispatch(insertAvatar(res?.avatar))
  })
}

export const updateUserEmail = (email, id) => (dispatch) => {
  return updateEmail(email, id).then((res) => {
    dispatch(insertUser({ data: res.user, isLoggedIn: true }))
    return res.emailStatus
  })
}

export const updateUserPassword = (oldPassword, password, id) => (dispatch) => {
  return updatePassword(oldPassword, password, id).then((res) => {
    dispatch(insertUser({ data: res.user, isLoggedIn: true }))
  })
}
