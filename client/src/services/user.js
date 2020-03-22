import { logoutUser } from '../redux/actions/userActions'

export const logout = () => (dispatch) => {
  dispatch(logoutUser())
}
