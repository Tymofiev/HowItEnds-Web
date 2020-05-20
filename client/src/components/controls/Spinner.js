import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Grid, CircularProgress, LinearProgress } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'absolute',
    // top: theme.spacing(80),
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressWrapper: {
    paddingTop: theme.spacing(50),
  },
  progressWidth: {
    marginTop: theme.spacing(80),
    width: theme.spacing(100),
  },
}))

const ColorCircularProgress = withStyles((theme) => ({
  root: {
    color: theme.palette.secondary,
  },
}))(CircularProgress)

const Spinner = () => {
  const { isLoading } = useSelector((state) => state.ui)
  const classes = useStyles()

  if (isLoading) {
    return (
      <Grid container className={classes.wrapper}>
        {/* <ColorCircularProgress variant='indeterminate' disableShrink size={100} thickness={5} /> */}
        <LinearProgress className={classes.progressWidth} />
      </Grid>
    )
  }

  return null
}
export default Spinner
