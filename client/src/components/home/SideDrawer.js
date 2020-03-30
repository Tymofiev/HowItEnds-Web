import React from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Button, List, Divider, ListItem, Drawer, Typography } from '@material-ui/core'
import { MailOutline, ViewListOutlined, ForumOutlined, HomeOutlined } from '@material-ui/icons'

import StyledLink from '../styled/StyledLink'
import ListItemLink from '../styled/ListItemLink'

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuTitle: {
    margin: theme.spacing(2, 0, 2, 0),
  },
}))

const SideDrawer = ({ isOpen, closeDrawer, location: { pathname } }) => {
  const classes = useStyles()

  return (
    <>
      <Drawer anchor='left' open={isOpen} onClose={closeDrawer()}>
        <div className={classes.list} role='presentation'>
          <Typography className={classes.menuTitle} variant='h5' component='h1' align='center'>
            Pages
          </Typography>

          <Divider />
          <List>
            <ListItemLink
              to='/'
              primary='Home'
              icon={<HomeOutlined />}
              selected={'/' === pathname}
              onClick={closeDrawer()}
            />
            <ListItemLink
              to='/blog'
              primary='Blog'
              icon={<ViewListOutlined />}
              selected={'/blog' === pathname}
              onClick={closeDrawer()}
            />
            <ListItemLink
              to='/forum'
              primary='Forum'
              icon={<ForumOutlined />}
              selected={'/forum' === pathname}
              onClick={closeDrawer()}
            />
          </List>

          <Divider />
          <List>
            <ListItemLink
              to='/support'
              primary='Support'
              icon={<MailOutline />}
              selected={'/support' === pathname}
              onClick={closeDrawer()}
            />
            <ListItemLink
              to='/ask-question'
              primary='Ask question'
              icon={<MailOutline />}
              selected={'/ask-question' === pathname}
              onClick={closeDrawer()}
            />
          </List>

          <Divider />
          <List>
            <ListItem>
              <Button component={StyledLink} to='/login' color='primary' variant='contained' fullWidth>
                Sign in
              </Button>
            </ListItem>
            <ListItem>
              <Button component={StyledLink} to='/register' color='secondary' variant='contained' fullWidth>
                Sign up
              </Button>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  )
}

export default withRouter(SideDrawer)
