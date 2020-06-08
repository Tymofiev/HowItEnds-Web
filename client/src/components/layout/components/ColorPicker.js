import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { SwatchesPicker } from 'react-color'

const ColorPicker = ({ open, handleClose, handleSave }) => {
  const [color, setColor] = useState()

  const handleColorChange = (color) => {
    setColor(color.hex)
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Color picker</DialogTitle>
        <DialogContent>
          <SwatchesPicker onChangeComplete={(color) => handleColorChange(color)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} color='primary'>
            Cancel
          </Button>
          <Button onClick={() => handleSave(color)} color='primary' variant='contained'>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ColorPicker
