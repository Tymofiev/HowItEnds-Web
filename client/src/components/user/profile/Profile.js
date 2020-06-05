import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Paper, Typography, Tabs, Tab } from '@material-ui/core'
import { AccountCircleOutlined, SettingsApplicationsOutlined, EmojiNatureOutlined } from '@material-ui/icons'

import TabPanel from '../../controls/TabPanel'
import StyledDivider from '../../controls/styled/StyledDivider'
import EmailSettings from './EmailSettings'
import PasswordSettings from './PasswordSettings'
import AvatarSettings from './AvatarSettings'

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      width: 1000,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  settingPaper: {
    padding: theme.spacing(2),
  },
}))

const Profile = () => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h4' align='center'>
            Profile
          </Typography>
          <Tabs
            value={value}
            onChange={handleChange}
            variant='fullWidth'
            indicatorColor='primary'
            textColor='primary'
            aria-label='icon tabs example'
          >
            <Tab icon={<SettingsApplicationsOutlined />} label='Settings' />
            <Tab icon={<AccountCircleOutlined />} aria-label='favorite' />
            <Tab icon={<EmojiNatureOutlined />} label='Creatures' />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Paper elevation={3} variant='elevation' className={classes.settingPaper}>
              <AvatarSettings />
            </Paper>
            <StyledDivider />
            <Paper elevation={3} variant='elevation' className={classes.settingPaper}>
              <EmailSettings />
            </Paper>
            <StyledDivider />
            <Paper elevation={3} variant='elevation' className={classes.settingPaper}>
              <PasswordSettings />
            </Paper>
          </TabPanel>
          <TabPanel value={value} index={0}></TabPanel>
        </Paper>
      </main>
    </>
  )
}

export default Profile
