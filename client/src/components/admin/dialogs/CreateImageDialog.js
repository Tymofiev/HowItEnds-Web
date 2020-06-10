import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import ImageForm from './ImageForm'

const FormDialog = ({ open, handleClose }) => {
  return (
    <div>
      <Dialog fullWidth={true} maxWidth='md' open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Image creation</DialogTitle>
        <DialogContent>
          <ImageForm closeDialog={handleClose} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(true)} color='primary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default FormDialog
