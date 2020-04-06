import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Menu, MenuItem, ListItemIcon, ListItemText, Divider, Badge, Hidden, Fade } from '@material-ui/core'
import { ExitToAppOutlined, NotificationsOutlined, MailOutlined } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

import StyledLink from './StyledLink'
import { logout } from '../../services/user'
import StyledSnackbar from './StyledSnackbar'

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
))

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem)

const AccountMenu = ({ anchorEl, closeMenu, logout }) => {
  const isMenuOpen = Boolean(anchorEl)
  const [snackbar, setSnackbar] = useState({
    open: false,
    type: '',
    msg: '',
  })

  const handleLogout = () => {
    logout()
      .then(() => {
        setSnackbar({ open: true, type: 'success', msg: 'Succesfuly logged out!' })
      })
      .catch((err) => console.log(err))
    closeMenu()
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbar({ open: false, type: snackbar.type, msg: snackbar.msg })
  }

  return (
    <>
      <StyledMenu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id='account-menu'
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={closeMenu}
        TransitionComponent={Fade}
      >
        <StyledMenuItem component={StyledLink} to='/profile' onClick={closeMenu}>
          <ListItemIcon>
            <MailOutlined fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Profile' />
        </StyledMenuItem>

        <Hidden mdUp>
          <StyledMenuItem onClick={closeMenu}>
            <ListItemIcon>
              <Badge badgeContent={4} color='secondary'>
                <MailOutlined fontSize='small' />
              </Badge>
            </ListItemIcon>
            <ListItemText primary='Messages' />
          </StyledMenuItem>
          <StyledMenuItem onClick={closeMenu}>
            <ListItemIcon>
              <Badge badgeContent={17} color='secondary'>
                <NotificationsOutlined fontSize='small' />
              </Badge>
            </ListItemIcon>
            <ListItemText primary='Notifications' />
          </StyledMenuItem>
        </Hidden>

        <Divider />
        <StyledMenuItem component={StyledLink} to='/' onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppOutlined fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </StyledMenuItem>
      </StyledMenu>
      <StyledSnackbar
        message={snackbar.msg}
        open={snackbar.open}
        severity={snackbar.type}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        title={false}
        handleClose={handleSnackbarClose}
      />
    </>
  )
}

export default connect(null, {
  logout,
})(AccountMenu)
