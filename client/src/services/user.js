import { login as loginAPI, register as registerAPI, logout as logoutAPI, checkIfLoggedIn } from '../api/auth'
import { logoutUser, insertUser } from '../redux/actions/userActions'

export const register = ({ username, email, password }) => (dispatch) => {
  return registerAPI({ username, email, password }).then((res) => {
    if (res.err) {
      return res.err
    }
    dispatch(insertUser({ data: res, isLoggedIn: true }))
  })
}

export const login = ({ email, password, remember }) => (dispatch) => {
  return loginAPI({ email, password, remember }).then((result) => {
    const { user, token, err } = result
    if (err) {
      return err
    }
    dispatch(insertUser({ data: user, isLoggedIn: true }))
  })
}

export const logout = () => (dispatch) => {
  return logoutAPI().then((res) => {
    dispatch(logoutUser())
  })
}

export const checkAuthorized = () => (dispatch) => {
  return checkIfLoggedIn().then((res) => {
    dispatch(insertUser(res))
  })
}
