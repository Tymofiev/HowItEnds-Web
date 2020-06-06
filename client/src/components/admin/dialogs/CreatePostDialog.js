import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import PostForm from './PostForm'

const FormDialog = ({ open, handleClose }) => {
  return (
    <div>
      <Dialog fullWidth={true} maxWidth='md' open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Post creation</DialogTitle>
        <DialogContent>
          <PostForm closeDialog={handleClose} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} color='primary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default FormDialog
