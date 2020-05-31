import React from 'react'

import { Paper, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Step from './Step'

const useStyles = makeStyles((theme) => ({
  paperWrapper: {
    padding: theme.spacing(10, 5, 10, 10),
  },
  stepOneRightBottom: {
    width: '100%',
    padding: theme.spacing(5, 0),
    borderRight: '5px dotted  #d3d4d5',
    borderBottom: '5px dotted #d3d4d5',
  },
  stepOneLeft: {
    width: '100%',
    padding: theme.spacing(5, 0),
    borderLeft: '5px dotted  #d3d4d5',
  },
}))

const Guide = () => {
  const classes = useStyles()

  return (
    <>
      <Paper className={classes.paperWrapper}>
        <Step />
        <Grid container direction='row' justify='center'>
          <Grid item xs={7} className={classes.stepOneRightBottom} />
          <Grid item xs={7} className={classes.stepOneLeft} />
        </Grid>
        <Step isReverse={true} />
      </Paper>
    </>
  )
}

export default Guide
