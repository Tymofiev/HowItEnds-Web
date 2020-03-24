import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography, Link, Toolbar, CssBaseline, AppBar, Avatar } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}))

const Header2 = (props) => {
  const classes = useStyles()

  return (
    <>
      <CssBaseline />
      <AppBar position='static' color='default' elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <nav>
            <Link variant='button' color='textPrimary' href='#' className={classes.link}>
              Blog
            </Link>
            <Link variant='button' color='textPrimary' href='#' className={classes.link}>
              Forum
            </Link>
            <Link variant='button' color='textPrimary' href='#' className={classes.link}>
              Support
            </Link>
          </nav>
          <Button href='/login' color='primary' variant='outlined' className={classes.link}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header2
