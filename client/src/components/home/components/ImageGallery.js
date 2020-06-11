import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Gallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

import { getAllImages } from '../../../api/image'
import { getImageUrl } from '../../../utils/url'

const useStyles = makeStyles((theme) => ({
  galleryContainer: {
    margin: theme.spacing(0, 0),
  },
}))

const gallerySettings = {
  showPlayButton: false,
  thumbnailPosition: 'left',
  showNav: true,
  showBullets: false,
  slideDuration: 1000,
}

const ImageGallery = (props) => {
  const classes = useStyles()
  const [images, setImages] = useState()

  useEffect(() => {
    getAllImages().then((images) => {
      const items = images.map((image) => ({
        original: getImageUrl(image.path),
        thumbnail: getImageUrl(image.path),
        description: image.title,
      }))
      setImages(items)
    })
  }, [])

  return (
    <>
      {images && (
        <Paper className={classes.galleryContainer}>
          <Gallery {...gallerySettings} items={images} />
        </Paper>
      )}
    </>
  )
}

export default ImageGallery
