import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Snackbar, IconButton } from '@material-ui/core'
import { CloseOutlined } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  snackbar: {
    backgroundColor: theme.palette.background.default,
  },
}))

const StyledSnackbar = ({ open, message, severity, handleClose }) => {
  const classes = useStyles()

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
      <Alert
        severity={severity}
        action={
          <>
            <IconButton color='inherit' onClick={handleClose}>
              <CloseOutlined fontSize='small' />
            </IconButton>
          </>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default StyledSnackbar
