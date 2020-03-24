import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Drawer, IconButton } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import { MailOutline, ViewListOutlined, ForumOutlined } from '@material-ui/icons'

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
}))

const SideDrawer = ({ isOpen, closeDrawer }) => {
  const classes = useStyles()

  return (
    <>
      <Drawer anchor='left' open={isOpen} onClose={closeDrawer()}>
        <div className={classes.list} role='presentation'>
          <List>
            <ListItem button>
              <ListItemIcon>
                <ViewListOutlined />
              </ListItemIcon>
              <ListItemText primary='Blog' />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <ForumOutlined />
              </ListItemIcon>
              <ListItemText primary='Forum' />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon>
                <MailOutline />
              </ListItemIcon>
              <ListItemText primary='Support' />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <MailOutline />
              </ListItemIcon>
              <ListItemText primary='Ask question' />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  )
}

export default SideDrawer
