import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, makeStyles, Grid, IconButton } from '@material-ui/core'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(10, 0, 10, 0),
    height: '90vh',
  },
  iconHolder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: theme.spacing(50),
    height: theme.spacing(50),
  },
  text: {
    color: theme.palette.text.primary,
  },
}))

const NotFound = () => {
  const classes = useStyles()

  return (
    <>
      <Grid container color='default' className={classes.container}>
        <Grid item xs={12} sm={12}>
          <Typography component='h1' variant='h1' align='center' className={classes.text}>
            404 - Not Found
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} className={classes.iconHolder}>
          <IconButton>
            <SentimentVeryDissatisfiedIcon color='inherit' className={classes.icon} />
          </IconButton>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography component='h3' variant='h5' align='center' className={classes.text}>
            The link you followed may be broken, or the page may have been removed. <Link>Go back to HowItEnds</Link>
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default NotFound
