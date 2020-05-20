import { handleActions } from 'redux-actions'
import {
  startLoading,
  stopLoading,
  showSnackbar,
  hideSnackbar,
  enqueueSnackbar,
  closeSnackbar,
  removeSnackbar,
} from '../actions/uiActions'

const initialState = {
  isLoading: false,
  notifications: [],
}

const uiReducer = handleActions(
  {
    [startLoading]: (state = initialState, action) => {
      return {
        ...state,
        isLoading: true,
      }
    },
    [stopLoading]: (state = initialState, action) => {
      return {
        ...state,
        isLoading: false,
      }
    },
    [showSnackbar]: (state = initialState, action) => {
      return {
        ...state,
        snackbar: action.payload,
      }
    },
    [enqueueSnackbar]: (state = initialState, action) => {
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            key: action.payload.key,
            ...action.payload,
          },
        ],
      }
    },
    [closeSnackbar]: (state = initialState, action) => {
      const dismissAll = !action.hasOwnProperty('payload')
      if (dismissAll) {
        return {
          ...state,
          notifications: state.notifications.map((notification) => {
            return { ...notification, dismissed: true }
          }),
        }
      } else {
        return {
          ...state,
          notifications: state.notifications.map((notification) =>
            notification.key === action.payload.key ? { ...notification, dismissed: true } : { ...notification },
          ),
        }
      }
    },
    [removeSnackbar]: (state = initialState, action) => {
      return {
        ...state,
        notifications: state.notifications.filter((notification) => notification.key !== action.payload),
      }
    },
    [hideSnackbar]: () => initialState,
  },
  initialState,
)

export default uiReducer
