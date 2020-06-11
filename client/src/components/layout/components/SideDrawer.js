import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { withRouter, Link as DownloadLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Button, List, Divider, ListItem, Drawer, Typography } from '@material-ui/core'
import {
  MailOutline,
  ViewListOutlined,
  PhotoLibraryOutlined,
  HomeOutlined,
  ExpandMoreOutlined,
  PeopleOutline,
  DashboardOutlined,
  CloudDownloadOutlined,
} from '@material-ui/icons'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'

import { updateDownloadsCount } from '../../../api/downloads'
import StyledLink from '../../controls/styled/StyledLink'
import ListItemLink from '../../controls/ListItemLink'

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

const SideDrawer = ({ isOpen, closeDrawer, location: { pathname }, user }) => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const dateTime = moment().format('YYYY-MM-DD')
  return (
    <>
      <Drawer anchor='left' open={isOpen} onClose={closeDrawer()}>
        <div className={classes.list} role='presentation'>
          {!user.isLoggedIn ? (
            <Typography className={classes.menuTitle} variant='h5' component='h3' align='center'>
              Pages
            </Typography>
          ) : (
            <Typography className={classes.menuTitle} variant='h5' component='h3' color='secondary' align='center'>
              {user.data?.username}
            </Typography>
          )}

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
              to='/news'
              primary='News'
              icon={<ViewListOutlined />}
              selected={'/news' === pathname}
              onClick={closeDrawer()}
            />
            <ListItemLink
              to='/gallery'
              primary='Gallery'
              icon={<PhotoLibraryOutlined />}
              selected={'/gallery' === pathname}
              onClick={closeDrawer()}
            />
          </List>

          <Divider />
          <List>
            <ListItemLink
              primary='Download'
              to='/howitends.zip'
              target='_blank'
              download
              onClick={() => updateDownloadsCount(dateTime)}
              icon={<CloudDownloadOutlined />}
            />
          </List>
          <Divider />
          {user.data?.admin && (
            <>
              <Typography className={classes.menuTitle} variant='h5' component='h5' align='center'>
                Admin
              </Typography>
              <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreOutlined />}
                  aria-controls='panel1bh-content'
                  id='panel1bh-header'
                >
                  <Typography className={classes.heading}>Actions</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <List>
                    <ListItemLink
                      to='/admin'
                      primary='Dashboard'
                      icon={<DashboardOutlined />}
                      selected={'/admin' === pathname}
                      onClick={closeDrawer()}
                    />
                    <ListItemLink
                      to='/admin/users'
                      primary='Users'
                      icon={<PeopleOutline />}
                      selected={'/admin/users' === pathname}
                      onClick={closeDrawer()}
                    />
                    <ListItemLink
                      to='/admin/posts'
                      primary='Posts'
                      icon={<ViewListOutlined />}
                      selected={'/admin/posts' === pathname}
                      onClick={closeDrawer()}
                    />
                  </List>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </>
          )}
          {!user.isLoggedIn ? (
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
          ) : null}
        </div>
      </Drawer>
    </>
  )
}

export default connect((state) => {
  return {
    user: state.user,
  }
}, null)(withRouter(SideDrawer))
