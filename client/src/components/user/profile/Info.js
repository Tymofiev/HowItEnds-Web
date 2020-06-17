import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid, Avatar, Divider } from '@material-ui/core'
import { InfoOutlined } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  passwordHolder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}))

const Info = ({ user }) => {
  const classes = useStyles()

  return (
    <>
      <Typography variant='h6' gutterBottom>
        Info
      </Typography>
      <Grid container justify='center' spacing={3}>
        <Grid item xs={12} sm={10} className={classes.passwordHolder}>
          <Typography component='span'>
            <InfoOutlined fontSize='large' color='secondary' />
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10} className={classes.passwordHolder}>
          <Grid item xs={12} sm={6}>
            <Typography>Username</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color='primary'>{user.username}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={10} className={classes.passwordHolder}>
          <Grid item xs={12} sm={6}>
            <Typography>Email</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color='primary'>{user.email}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={10} className={classes.passwordHolder}>
          <Grid item xs={12} sm={6}>
            <Typography>Avatar</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Avatar alt={user?.username} src={user?.avatar} className={classes.avatar} />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default connect((state) => {
  return { user: state.user.data }
}, {})(Info)
