import React from 'react'
import { Grid, Typography, Card, CardMedia, CardContent } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  stepTitle: {
    marginBottom: theme.spacing(5),
  },
}))

const Step = ({ title, subtitle, caption, imageCaption, image, isReverse = false }) => {
  const classes = useStyles()

  return (
    <Grid container direction='row' justify='space-between' alignItems='center'>
      {isReverse ? (
        <>
          <Grid item md={6}>
            <Card>
              <CardMedia component='img' alt='Image' image={image} />
              <CardContent>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {imageCaption}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={5}>
            <Typography variant='h3' color='textPrimary' className={classes.stepTitle}>
              {title}
            </Typography>
            <Typography variant='subtitle1' component='p'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id mi sed ante imperdiet mattis. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Cras id mi sed ante imperdiet mattis.
            </Typography>
            <Typography variant='caption' component='p' color='error'>
              {caption}
            </Typography>
          </Grid>
        </>
      ) : (
        <>
          <Grid item md={5}>
            <Typography variant='h3' color='textPrimary' className={classes.stepTitle}>
              {title}
            </Typography>
            <Typography variant='subtitle1' component='p'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id mi sed ante imperdiet mattis. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Cras id mi sed ante imperdiet mattis.
            </Typography>
            <Typography variant='caption' component='p' color='error'>
              {caption}
            </Typography>
          </Grid>
          <Grid item md={6}>
            <Card>
              <CardMedia component='img' alt='Image' image={image} />
              <CardContent>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {imageCaption}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </>
      )}
    </Grid>
  )
}

export default Step
