import { handleActions } from 'redux-actions'
import { insertUser, logoutUser, updateAvatar } from '../actions/userActions'

const initialState = {}

const userReducer = handleActions(
  {
    [insertUser]: (state = initialState, action) => {
      return {
        ...state,
        data: action.payload,
      }
    },
    [logoutUser]: (state = initialState, action) => {
      return {
        ...state,
        data: 'Unauthorized',
      }
    },
    [updateAvatar]: (state = initialState, action) => {
      const { avatar, ...rest } = state.data
      return {
        ...state,
        data: { ...rest, avatar: action.payload },
      }
    },
  },
  initialState,
)

export default userReducer
