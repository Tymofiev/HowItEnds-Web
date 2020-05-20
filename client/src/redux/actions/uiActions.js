import { createAction } from 'redux-actions'
import {
  START_LOADING,
  STOP_LOADING,
  SHOW_SNACKBAR,
  HIDE_SNACKBAR,
  ENQUEUE_SNACKBAR,
  CLOSE_SNACKBAR,
  REMOVE_SNACKBAR,
} from './types'

const startLoading = createAction(START_LOADING)
const stopLoading = createAction(STOP_LOADING)
const showSnackbar = createAction(SHOW_SNACKBAR)
const hideSnackbar = createAction(HIDE_SNACKBAR)
const enqueueSnackbar = createAction(ENQUEUE_SNACKBAR)
const closeSnackbar = createAction(CLOSE_SNACKBAR)
const removeSnackbar = createAction(REMOVE_SNACKBAR)

export { startLoading, stopLoading, showSnackbar, hideSnackbar, enqueueSnackbar, closeSnackbar, removeSnackbar }
