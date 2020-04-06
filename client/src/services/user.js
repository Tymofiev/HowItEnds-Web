import { login as loginAPI, register as registerAPI, logout as logoutAPI } from '../api/user'
import { logoutUser, insertUser } from '../redux/actions/userActions'

export const register = ({ username, email, password }) => (dispatch) => {
  return registerAPI({ username, email, password }).then((res) => {
    if (res.err) {
      return res.err
    }
    dispatch(insertUser(res))
  })
}

export const login = ({ email, password }) => (dispatch) => {
  return loginAPI({ email, password }).then((result) => {
    const { user, token, err } = result
    if (err) {
      return err
    }

    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    dispatch(insertUser(user))
  })
}

export const logout = () => (dispatch) => {
  return logoutAPI().then((res) => {
    dispatch(logoutUser())
  })
}
