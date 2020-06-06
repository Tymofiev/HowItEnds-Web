import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import PostForm from './EditForm'

const FormDialog = ({ open, handleClose, post }) => {
  return (
    <div>
      <Dialog fullWidth={true} maxWidth='md' open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Post edit</DialogTitle>
        <DialogContent>
          <PostForm closeDialog={handleClose} post={post} />
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
