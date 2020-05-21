import { handleActions } from 'redux-actions'
import { insertUser, logoutUser, setActive, updateAvatar } from '../actions/userActions'

const initialState = {
  isLoggedIn: false,
  data: {},
}

const userReducer = handleActions(
  {
    [insertUser]: (state = initialState, action) => {
      return {
        ...state,
        data: action.payload.data,
        isLoggedIn: action.payload.isLoggedIn,
      }
    },
    [updateAvatar]: (state = initialState, action) => {
      const { avatar, ...rest } = state.data
      return {
        ...state,
        data: { ...rest, avatar: action.payload },
      }
    },
    [setActive]: (state = initialState, action) => {
      const { active, ...rest } = state.data
      return {
        ...state,
        data: { ...rest, active: action.payload },
      }
    },
    [logoutUser]: () => initialState,
  },
  initialState,
)

export default userReducer
