import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { DialogTitle, IconButton, Grid, Typography } from '@material-ui/core'
import { ColorizeOutlined } from '@material-ui/icons'

import { clearPalette } from '../../../api/palette'
import ColorPicker from './ColorPicker'

class ColorSettingsDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      type: '',
      primary: '#00838f',
      secondary: '#fbc02d',
      background: '#303030',
      paper: '#424242',
    }
  }

  handlePickerClose = () => {
    this.setState({ open: false })
  }

  handlePickerOpen = (type) => {
    this.setState({ open: true, type })
  }

  handlePickerSave = (color) => {
    this.setState((state) => ({ [state.type]: color, open: false }))
  }

  clearUserPalette = () => {
    const { user, handleClose } = this.props

    clearPalette(user)
    handleClose()
  }

  render() {
    const { open, handleClose, handleSave } = this.props
    const { primary, secondary, background, paper } = this.state
    const palette = {
      primary: {
        main: primary,
      },
      secondary: {
        main: secondary,
      },
      background: {
        paper: paper,
        default: background,
      },
    }

    return (
      <div>
        <Dialog maxWidth='md' open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
          <DialogTitle id='form-dialog-title'>Set up your color palette</DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid item xs={6}>
                <Typography>Primary</Typography>
                <IconButton
                  style={{ color: this.state.primary }}
                  size='medium'
                  onClick={() => this.handlePickerOpen('primary')}
                >
                  <ColorizeOutlined />
                </IconButton>
              </Grid>
              <Grid item xs={6}>
                <Typography>Secondary</Typography>
                <IconButton
                  style={{ color: this.state.secondary }}
                  size='medium'
                  onClick={() => this.handlePickerOpen('secondary')}
                >
                  <ColorizeOutlined />
                </IconButton>
              </Grid>
              <Grid item xs={6}>
                <Typography>Background 1</Typography>
                <IconButton
                  style={{ color: this.state.background }}
                  size='medium'
                  onClick={() => this.handlePickerOpen('background')}
                >
                  <ColorizeOutlined />
                </IconButton>
              </Grid>
              <Grid item xs={6}>
                <Typography>Background 2</Typography>
                <IconButton
                  style={{ color: this.state.paper }}
                  size='medium'
                  onClick={() => this.handlePickerOpen('paper')}
                >
                  <ColorizeOutlined />
                </IconButton>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.clearUserPalette()} color='default'>
              <Typography color='error'>Clear current palette</Typography>
            </Button>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={() => handleSave(palette)} variant='outlined' color='primary'>
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <ColorPicker open={this.state.open} handleClose={this.handlePickerClose} handleSave={this.handlePickerSave} />
      </div>
    )
  }
}

export default ColorSettingsDialog
