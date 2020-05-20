import { handleActions } from 'redux-actions'
import { insertUser, logoutUser, updateAvatar } from '../actions/userActions'

const initialState = {
  data: 'Unauthorized',
}

const userReducer = handleActions(
  {
    [insertUser]: (state = initialState, action) => {
      return {
        ...state,
        data: action.payload,
      }
    },
    [updateAvatar]: (state = initialState, action) => {
      const { avatar, ...rest } = state.data
      return {
        ...state,
        data: { ...rest, avatar: action.payload },
      }
    },
    [logoutUser]: () => initialState,
  },
  initialState,
)

export default userReducer
