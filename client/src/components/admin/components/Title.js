import React from 'react'
import { Typography, IconButton, Grid } from '@material-ui/core'
import { RefreshOutlined } from '@material-ui/icons'

const Title = ({ children, refresh }) => {
  return (
    <>
      <Grid container justify='space-around'>
        <Grid item>
          <Typography component='h2' variant='h6' color='primary' gutterBottom>
            {children}
          </Typography>
        </Grid>
        {refresh && (
          <Grid item>
            <IconButton onClick={() => refresh()}>
              <RefreshOutlined />
            </IconButton>
          </Grid>
        )}
      </Grid>
    </>
  )
}

export default Title
