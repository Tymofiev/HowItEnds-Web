import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5, 0),
    background: `linear-gradient(20deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.dark} 90%)`,
  },
}))

const Separator = ({ title, btn }) => {
  const classes = useStyles()

  return (
    <Grid container direction='row' justify='space-around' alignItems='center' className={classes.root}>
      <Typography variant='h2' color='textPrimary'>
        {title}
      </Typography>
      {btn && (
        <Button onClick={btn.onClick} variant='outlined'>
          <Typography variant='subtitle1'>{btn.text}</Typography>
        </Button>
      )}
    </Grid>
  )
}

export default Separator
