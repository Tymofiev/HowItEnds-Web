import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import { Typography, Grid } from '@material-ui/core'
import moment from 'moment'

import ZoomImage from '../../components/controls/ZoomImage'
import { getAllImages } from '../../api/image'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}))

const Gallery = () => {
  const classes = useStyles()
  const [imagesPack, setImagesPack] = useState()

  useEffect(() => {
    getAllImages().then((images) => {
      const pack = images.reduce((p, c) => {
        return p[c.category] ? { ...p, [c.category]: [...p[c.category], c] } : { ...p, [c.category]: [c] }
      }, {})
      setImagesPack(pack)
    })
  }, [])

  return (
    <div className={classes.root}>
      <Grid container>
        {imagesPack &&
          Object.keys(imagesPack).map((key) => (
            <GridList cellHeight={500} cols={2} className={classes.gridList}>
              <GridListTile key='Subheader' cols={2} style={{ height: 'auto' }}>
                <ListSubheader component='div'>{key.toUpperCase()}</ListSubheader>
              </GridListTile>
              {imagesPack[key].map((image) => {
                return (
                  <GridListTile data-aos='zoom-in-up' data-aos-delay={1} cols={1} key={image._id}>
                    {/* <img src={`/${image.path}`} alt={image.title} /> */}
                    <ZoomImage src={image.path} alt='' />
                    <GridListTileBar title={image.title} subtitle={moment(image.date).format('DD/MM/YYYY')} />
                  </GridListTile>
                )
              })}
            </GridList>
          ))}
      </Grid>
    </div>
  )
}

export default Gallery
