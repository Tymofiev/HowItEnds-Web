import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Gallery from 'react-image-gallery'

import 'react-image-gallery/styles/css/image-gallery.css'
import robot from '../../../images/robot.jpg'

const useStyles = makeStyles((theme) => ({
  galleryContainer: {
    margin: theme.spacing(0, 0),
  },
}))

const images = [
  {
    original: robot,
    thumbnail: robot,
  },
  {
    original: robot,
    thumbnail: robot,
  },
  {
    original: robot,
    thumbnail: robot,
  },
  {
    original: robot,
    thumbnail: robot,
  },
  {
    original: robot,
    thumbnail: robot,
  },
  {
    original: robot,
    thumbnail: robot,
  },
  {
    original: robot,
    thumbnail: robot,
  },
  {
    original: robot,
    thumbnail: robot,
  },
  {
    original: robot,
    thumbnail: robot,
  },
  {
    original: robot,
    thumbnail: robot,
  },
  {
    original: robot,
    thumbnail: robot,
  },
  {
    original: robot,
    thumbnail: robot,
  },
  {
    original: robot,
    thumbnail: robot,
  },
]

const gallerySettings = {
  showPlayButton: false,
  thumbnailPosition: 'left',
  showNav: true,
  showBullets: false,
  slideDuration: 1000,
}

const ImageGallery = (props) => {
  const classes = useStyles()

  return (
    <>
      <Paper className={classes.galleryContainer}>
        <Gallery {...gallerySettings} items={images} />
      </Paper>
    </>
  )
}

export default ImageGallery
