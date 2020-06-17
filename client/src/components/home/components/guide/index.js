import React from 'react'

import { Paper, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import mainMenu from '../../../../images/main-menu.jpg'
import mapSettings from '../../../../images/map-settings.jpg'
import saving from '../../../../images/saving.jpg'

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
  stepOneRightTop: {
    width: '100%',
    padding: theme.spacing(5, 0),
    borderRight: '5px dotted  #d3d4d5',
    borderTop: '5px dotted #d3d4d5',
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
        <Step image={mainMenu} imageCaption='Main menu' title='Start to play' />
        <Grid container direction='row' justify='center'>
          <Grid item xs={7} className={classes.stepOneRightBottom} />
          <Grid item xs={7} className={classes.stepOneLeft} />
        </Grid>
        <Step
          isReverse
          image={mapSettings}
          caption='Auto update can cause low fps level'
          imageCaption='Map settings'
          title='Set up your environment'
        />
        <Grid container direction='row' justify='center'>
          <Grid item xs={7} className={classes.stepOneLeft} />
          <Grid item xs={7} className={classes.stepOneRightTop} />
        </Grid>
        <Step
          image={saving}
          caption='Dont forget to save current progress first'
          imageCaption='Saving panel'
          title='Download saved game'
        />
      </Paper>
    </>
  )
}

export default Guide
