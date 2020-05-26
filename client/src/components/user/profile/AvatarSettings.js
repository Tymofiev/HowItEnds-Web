import React, { useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid, Button, Avatar, Input } from '@material-ui/core'
import { CloudUploadOutlined } from '@material-ui/icons'
import { DropzoneDialog } from 'material-ui-dropzone'

import { updateAvatar } from '../../../redux/actions/userActions'
import { editAvatar } from '../../../api/user'

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  avatarHolder: {
    display: 'flex',
    justifyContent: 'center',
  },
  inputHolder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputButton: {
    [theme.breakpoints.down(400)]: {
      textAlign: 'center',
      fontSize: theme.typography.fontSize - 3,
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  uploadIcon: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))

const AvatarSettings = ({ user, updateAvatar }) => {
  const classes = useStyles()
  const [open, setOpen] = useState()

  const handleSave = (file) => {
    setOpen(false)
    editAvatar({ file, id: user._id }).then((result) => {
      updateAvatar(result?.avatar)
    })
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <>
      <Typography variant='h6' gutterBottom>
        Avatar
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} className={classes.avatarHolder}>
          <Avatar alt={user?.username} src={user?.avatar} className={classes.avatar} />
        </Grid>
        <Grid item xs={12} sm={12} className={classes.inputHolder}>
          <Button variant='outlined' color='primary' component='label' className={classes.inputButton}>
            File dialog
            <Input type='file' style={{ display: 'none' }} onChange={(e) => handleSave(e.target.files[0])} />
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} className={classes.inputHolder}>
          <CloudUploadOutlined color='secondary' fontSize='large' className={classes.uploadIcon} />
        </Grid>
        <Grid item xs={12} sm={12} className={classes.inputHolder}>
          <Button variant='outlined' color='primary' onClick={() => handleOpen()} className={classes.inputButton}>
            Choose file
          </Button>
        </Grid>
      </Grid>
      <DropzoneDialog
        open={open}
        onSave={(files) => handleSave(files[0])}
        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
        showPreviews={false}
        maxFileSize={5000000}
        filesLimit={1}
        showPreviewsInDropzone={true}
        onClose={() => handleClose()}
      />
    </>
  )
}

export default connect(
  (state) => {
    return { user: state.user.data }
  },
  { updateAvatar },
)(AvatarSettings)
