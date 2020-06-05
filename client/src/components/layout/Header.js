import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Hidden, Toolbar, Button, IconButton, Typography, Avatar, AppBar } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import MenuIcon from '@material-ui/icons/Menu'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import SideDrawer from './components/SideDrawer'
import AccountMenu from '../controls/AccountMenu'
import StyledLink from '../controls/styled/StyledLink'

const useStyles = makeStyles((theme) => {
  return {
    toolbar: {
      borderBottom: `5px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
      flex: 1,
    },
    toolbarSecondary: {
      justifyContent: 'space-between',
      overflowX: 'auto',
    },
    toolbarLink: {
      padding: theme.spacing(1),
      flexShrink: 0,
    },
    signin: {
      margin: theme.spacing(2, 0, 2, 2),
      color: theme.palette.text.primary,
    },
    signup: {
      margin: theme.spacing(2, 0, 2, 2),
      color: theme.palette.text.secondary,
    },
  }
})

const Header = ({ themeToggler, user }) => {
  const classes = useStyles()
  const themeType = useTheme().palette.type

  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [theme, setTheme] = useState(themeType)

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setOpen(open)
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const changeColorTheme = () => {
    let newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    themeToggler(newTheme)
  }

  return (
    <AppBar position='static' color='default'>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          aria-label='open drawer'
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

        <SideDrawer isOpen={open} closeDrawer={toggleDrawer} />

        <Typography component='h2' variant='h5' color='inherit' align='center' noWrap className={classes.toolbarTitle}>
          <StyledLink to='/'>HowItEnds</StyledLink>
        </Typography>

        <IconButton onClick={() => changeColorTheme()}>
          {theme === 'dark' ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>

        {!user.isLoggedIn ? (
          <Hidden smDown>
            <Button component={StyledLink} to='/login' color='primary' variant='contained' className={classes.signin}>
              Sign in
            </Button>
            <Button
              component={StyledLink}
              to='/register'
              color='secondary'
              variant='contained'
              className={classes.signup}
            >
              Sign up
            </Button>
          </Hidden>
        ) : (
          <IconButton
            edge='end'
            aria-label='account of current user'
            aria-controls='account-menu'
            aria-haspopup='true'
            onClick={handleProfileMenuOpen}
            color='inherit'
          >
            <Avatar alt={user.data?.username} src={user.data?.avatar} />
          </IconButton>
        )}
      </Toolbar>

      <AccountMenu anchorEl={anchorEl} closeMenu={handleMenuClose} />
    </AppBar>
  )
}

const mapStateToProps = (store) => {
  return {
    user: store.user,
  }
}

export default connect(mapStateToProps)(Header)
