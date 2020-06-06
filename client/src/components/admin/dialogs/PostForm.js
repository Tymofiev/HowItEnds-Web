import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Form, Field } from 'react-final-form'
import { Button, Typography, Grid, Avatar, CssBaseline, Paper } from '@material-ui/core'
import { TitleOutlined, SubjectOutlined, CreateOutlined, SubtitlesOutlined, ImageOutlined } from '@material-ui/icons'
import clsx from 'clsx'
import { DropzoneArea } from 'material-ui-dropzone'

import Input from '../../controls/own/OwnInput'

import { required, composeValidators } from '../../../utils/validators'
import { createPost, setImage } from '../../../api/post'
import { showSnackbar } from '../../../services/ui'
import { startLoading, stopLoading } from '../../../redux/actions/uiActions'

import useStyles from './style'

const PostForm = ({ startLoading, stopLoading, showSnackbar, closeDialog }) => {
  const classes = useStyles()
  const [file, setFile] = useState()

  const handleCreate = ({ title, snippet, body }) => {
    startLoading()
    createPost({ title, snippet, body })
      .then((post) => {
        setImage({ file, id: post._id }).then(() => {
          showSnackbar({ message: 'Post was created!', variant: 'success' })
          closeDialog()
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
                      <TitleOutlined /> Title
                    </Typography>
                    <Field name='title' component={Input} validate={composeValidators(required)} />
                  </Grid>
                  <Grid item xl={12}>
                    <Typography component='span'>
                      <SubtitlesOutlined /> Subtitle
                    </Typography>
                    <Field name='snippet' multiline component={Input} validate={composeValidators(required)} />
                  </Grid>
                  <Grid item xl={12}>
                    <Typography component='span'>
                      <SubjectOutlined /> Body
                    </Typography>
                    <Field name='body' multiline component={Input} validate={composeValidators(required)} />
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
})(PostForm)
