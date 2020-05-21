import React from 'react'

import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Step from './Step'

const useStyles = makeStyles((theme) => ({
  paperWrapper: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(10, 5, 10, 10),
  },
}))

const Guide = () => {
  const classes = useStyles()

  return (
    <>
      <Paper className={classes.paperWrapper}>
        <Step />
        <Step isReverse={true} />
      </Paper>
    </>
  )
}

export default Guide
