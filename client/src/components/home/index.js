import React from 'react'

import Posts from './components/posts/index'
import Guide from './components/guide/index'

import SliderPreview from './components/SliderPreview'
import ImageGallery from './components/ImageGallery'
import Separator from './components/Separator'
import ContactForm from './components/ContactForm'

import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
}))

const Home = ({ history }) => {
  const classes = useStyles()

  const openPostsPage = () => {
    history.push('/news')
  }

  const openGalleryPage = () => {
    history.push('/gallery')
  }

  return (
    <>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <SliderPreview />
          </Grid>
        </Grid>
        <Separator title='Guide' />
        <Guide />
        <Separator title='Latest news' btn={{ text: 'Read', onClick: openPostsPage }} />
        <Posts />
        <Separator title='Gallery' btn={{ text: 'View', onClick: openGalleryPage }} />
        <Grid container>
          <Grid item xs={12}>
            <ImageGallery />
          </Grid>
        </Grid>
        <Separator title='Leave us feedback' />
        <ContactForm />
      </div>
    </>
  )
}

export default Home
