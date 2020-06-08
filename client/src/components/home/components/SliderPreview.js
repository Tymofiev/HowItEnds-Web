import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import { Button } from '@material-ui/core'
import { Link as DownloadLink } from 'react-router-dom'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import moment from 'moment'

import { updateDownloadsCount } from '../../../api/downloads'
import robot from '../../../images/robot.jpg'

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    height: '91vh',
    backgroundImage: `url(${robot})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}))

const carouselSettings = {
  showStatus: false,
  swipeable: true,
  infiniteLoop: true,
  autoPlay: false,
  transitionTime: 3000,
  stopOnHover: true,
  showThumbs: false,
  interval: 10000,
}

const SliderPreview = (props) => {
  const classes = useStyles()

  const dateTime = moment().format('YYYY-MM-DD')
  return (
    <Carousel {...carouselSettings}>
      <Paper className={classes.mainFeaturedPost}>
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <Typography component='h1' variant='h3' color='inherit' gutterBottom>
                Build your perfect simulation!
              </Typography>
              <Typography variant='h5' color='inherit' paragraph>
                Compete with friends
              </Typography>
              <DownloadLink to='/howitends.zip' target='_blank' download onClick={() => updateDownloadsCount(dateTime)}>
                <Button variant='contained' color='primary'>
                  <Typography variant='h5' color='inherit'>
                    Download now
                  </Typography>
                </Button>
              </DownloadLink>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.mainFeaturedPost}>
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <Typography component='h1' variant='h3' color='inherit' gutterBottom>
                Build your perfect simulation!
              </Typography>
              <Typography variant='h5' color='inherit' paragraph>
                Compete with friends
              </Typography>
              <Link variant='subtitle1' href='#'>
                Download now
              </Link>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.mainFeaturedPost}>
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <Typography component='h1' variant='h3' color='inherit' gutterBottom>
                Build your perfect simulation!
              </Typography>
              <Typography variant='h5' color='inherit' paragraph>
                Compete with friends
              </Typography>
              <Link variant='subtitle1' href='#'>
                Download now
              </Link>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Carousel>
  )
}

export default SliderPreview
