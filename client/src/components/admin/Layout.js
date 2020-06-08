import React from 'react'
import clsx from 'clsx'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ViewListOutlined from '@material-ui/icons/ViewListOutlined'
import PeopleOutline from '@material-ui/icons/PeopleOutline'
import AssignmentIcon from '@material-ui/icons/Assignment'

import ListItemLink from '../controls/ListItemLink'
import StyledLink from '../controls/styled/StyledLink'
import CreatePostDialog from './dialogs/CreatePostDialog'
import Copyright from './components/Copyright'

import useStyles from './style'

export default ({ children, location: { pathname } }) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)
  const [isDialogOpen, setDialogOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleDialogOpen = () => {
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='absolute' className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component='h1' variant='h6' color='inherit' noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton color='inherit'>
            <StyledLink to='/'>Home</StyledLink>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItemLink
            to='/admin'
            primary='Dashboard'
            icon={<DashboardIcon />}
            selected={'/admin' === pathname}
            onClick={handleDrawerClose}
          />
          <ListItemLink
            to='/admin/users'
            primary='Users'
            icon={<PeopleOutline />}
            selected={'/admin/users' === pathname}
            onClick={handleDrawerClose}
          />
          <ListItemLink
            to='/admin/posts'
            primary='Posts'
            icon={<ViewListOutlined />}
            selected={'/admin/posts' === pathname}
            onClick={handleDrawerClose}
          />
        </List>
        <Divider />
        <List>
          <ListSubheader inset>Actions</ListSubheader>
          <ListItem button onClick={() => handleDialogOpen()}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary='Create post' />
          </ListItem>
        </List>
      </Drawer>
      <CreatePostDialog open={isDialogOpen} handleClose={handleDialogClose} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {children}
        <Container maxWidth='lg' className={classes.container}>
          <Grid container spacing={3} justify='center' alignItems='center'>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Grid>
        </Container>
      </main>
    </div>
  )
}
