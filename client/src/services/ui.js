import React from 'react'
import { Button } from '@material-ui/core'
import { enqueueSnackbar, closeSnackbar } from '../redux/actions/uiActions'

export const showSnackbar = ({ message, variant }) => (dispatch) => {
  dispatch(
    enqueueSnackbar({
      message,
      key: new Date().getTime() + Math.random(),
      options: {
        variant,
        action: (key) => <Button onClick={() => dispatch(closeSnackbar(key))}>Close</Button>,
      },
    }),
  )
}
