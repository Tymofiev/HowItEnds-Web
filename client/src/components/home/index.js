import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Posts from './components/posts/index'
import Guide from './components/guide/index'

import SliderPreview from './components/SliderPreview'
import ImageGallery from './components/ImageGallery'
import Separator from './components/Separator'
import smoothScrollTop from '../../lib/smoothScrollTop'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
}))

const Home = ({ history }) => {
  const classes = useStyles()

  const openPostsPage = () => {
    history.push('/news')
    smoothScrollTop()
  }

  const openGalleryPage = () => {
    history.push('/gallery')
    smoothScrollTop()
  }

  return (
    <>
      <div className={classes.root}>
        <Grid container data-aos-delay='200' data-aos='zoom-in'>
          <Grid item xs={12}>
            <SliderPreview />
          </Grid>
        </Grid>
        <Grid data-aos='fade-right' data-aos-anchor-placement='top-center'>
          <Separator title='Guide' />
        </Grid>
        <Grid data-aos='fade-down' data-aos-easing='linear' data-aos-duration='1500'>
          <Guide />
        </Grid>
        <Grid data-aos='fade-right' data-aos-anchor-placement='top-center'>
          <Separator title='Latest news' btn={{ text: 'Read', onClick: openPostsPage }} />
        </Grid>
        {/* <ParallexItem> */}
        <Grid data-aos='fade-down' data-aos-easing='linear' data-aos-duration='1500'>
          <Posts />
        </Grid>
        {/* </ParallexItem> */}
        <Grid data-aos='fade-right' data-aos-anchor-placement='top-center'>
          <Separator title='Gallery' btn={{ text: 'View', onClick: openGalleryPage }} />
        </Grid>
        <Grid container data-aos='fade-down' data-aos-easing='linear' data-aos-duration='1500'>
          <Grid item xs={12}>
            <ImageGallery />
          </Grid>
        </Grid>
        {/* <Separator title='Leave us feedback' /> */}
        {/* <ContactForm /> */}
      </div>
    </>
  )
}

export default Home
