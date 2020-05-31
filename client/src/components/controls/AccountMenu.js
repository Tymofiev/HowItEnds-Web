import React from 'react'
import { connect } from 'react-redux'
import { Menu, MenuItem, ListItemIcon, ListItemText, Divider, Badge, Hidden, Fade } from '@material-ui/core'
import { ExitToAppOutlined, NotificationsOutlined, MailOutlined } from '@material-ui/icons'

import StyledLink from './styled/StyledLink'
import { logout } from '../../services/auth'
import { showSnackbar } from '../../services/ui'
import { startLoading, stopLoading } from '../../redux/actions/uiActions'

import { withStyles } from '@material-ui/core/styles'

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

const AccountMenu = ({ anchorEl, closeMenu, logout, showSnackbar, startLoading, stopLoading }) => {
  const isMenuOpen = Boolean(anchorEl)

  const handleLogout = () => {
    startLoading()
    logout()
      .then(() => {
        showSnackbar({ message: 'Succesfuly logged out!', variant: 'success' })
      })
      .catch((err) => console.log(err))
      .finally(() => {
        stopLoading()
      })
    closeMenu()
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
    </>
  )
}

export default connect(null, {
  showSnackbar,
  startLoading,
  stopLoading,
  logout,
})(AccountMenu)
