import { handleActions } from 'redux-actions'
import { insertUser, logoutUser } from '../actions/userActions'

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
        data: {},
      }
    },
  },
  initialState,
)

export default userReducer
