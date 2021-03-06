import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, LinearProgress } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'fixed',
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

const Spinner = () => {
  const { isLoading } = useSelector((state) => state.ui)
  const classes = useStyles()

  return (
    <div data-testid='container'>
      {isLoading ? (
        <Grid container className={classes.wrapper}>
          <LinearProgress className={classes.progressWidth} />
        </Grid>
      ) : null}
    </div>
  )
}
export default Spinner
