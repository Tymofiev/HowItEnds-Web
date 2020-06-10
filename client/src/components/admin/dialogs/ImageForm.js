import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Form, Field } from 'react-final-form'
import { Button, Typography, Grid, Avatar, CssBaseline, Paper } from '@material-ui/core'
import { CategoryOutlined, CreateOutlined, ImageOutlined, TitleOutlined } from '@material-ui/icons'
import clsx from 'clsx'
import { DropzoneArea } from 'material-ui-dropzone'

import Input from '../../controls/own/OwnInput'

import { required, composeValidators } from '../../../utils/validators'
import { createImage, setImage } from '../../../api/image'
import { showSnackbar } from '../../../services/ui'
import { startLoading, stopLoading } from '../../../redux/actions/uiActions'

import useStyles from './style'

const ImageForm = ({ startLoading, stopLoading, showSnackbar, closeDialog }) => {
  const classes = useStyles()
  const [file, setFile] = useState()

  const handleCreate = ({ category, title }) => {
    startLoading()
    createImage(category, title)
      .then((image) => {
        setImage({ file, id: image._id }).then(() => {
          showSnackbar({ message: 'Image was created!', variant: 'success' })
          closeDialog(true)
        })
      })
      .catch((err) => showSnackbar({ message: err, variant: 'error' }))
      .finally(() => {
        stopLoading()
      })
  }

  const handleFileChange = (file) => {
    setFile(file)
  }

  return (
    <>
      <Grid container component='main' className={clsx(classes.root)}>
        <CssBaseline />
        <Grid item xs={12} component={Paper} elevation={6} className={classes.container}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <CreateOutlined />
            </Avatar>
            <Form
              onSubmit={handleCreate}
              render={({ handleSubmit, submitting, pristine, invalid }) => (
                <form onSubmit={handleSubmit} className={classes.form} noValidate>
                  <Grid item xl={12}>
                    <Typography component='span'>
                      <CategoryOutlined /> Category
                    </Typography>
                    <Field name='category' component={Input} validate={composeValidators(required)} />
                  </Grid>
                  <Grid item xl={12}>
                    <Typography component='span'>
                      <TitleOutlined /> Title
                    </Typography>
                    <Field name='title' component={Input} validate={composeValidators(required)} />
                  </Grid>
                  <Grid item xl={12}>
                    <Typography component='span'>
                      <ImageOutlined /> Image
                    </Typography>
                    <DropzoneArea
                      acceptedFiles={['image/*']}
                      dropzoneText={'Drag and drop an image here or click'}
                      filesLimit={1}
                      dropzoneParagraphClass={classes.dropzoneText}
                      dropzoneClass={classes.dropzone}
                      onChange={(files) => handleFileChange(files[0])}
                    />
                  </Grid>
                  <Grid item xl={12}>
                    <Button
                      type='submit'
                      variant='contained'
                      color='primary'
                      disabled={submitting || invalid || pristine || !file}
                      className={classes.submit}
                      fullWidth
                    >
                      Create
                    </Button>
                  </Grid>
                </form>
              )}
            />
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default connect(null, {
  startLoading,
  stopLoading,
  showSnackbar,
})(ImageForm)
