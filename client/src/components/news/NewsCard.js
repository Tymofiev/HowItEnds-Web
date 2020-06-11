import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import classNames from 'classnames'
import { Typography, Card, Box, withStyles } from '@material-ui/core'

import Image from '../controls/Image'

const styles = (theme) => ({
  img: {
    width: '100%',
    height: 'auto',
    marginBottom: 8,
  },
  card: {
    boxShadow: theme.shadows[2],
  },
  noDecoration: {
    textDecoration: 'none !important',
  },
  title: {
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeInOut,
    }),
    cursor: 'pointer',
    color: theme.palette.secondary.main,
    '&:hover': {
      color: theme.palette.secondary.dark,
    },
    '&:active': {
      color: theme.palette.primary.dark,
    },
  },
  link: {
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeInOut,
    }),
    cursor: 'pointer',
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  showFocus: {
    '&:focus span': {
      color: theme.palette.secondary.dark,
    },
  },
})

const NewsCard = (props) => {
  const { classes, url, image, date, title, snippet } = props

  return (
    <Card className={classes.card}>
      {image && (
        <Link to={url} tabIndex={-1}>
          <Image src={image} className={classes.img} alt='' />
        </Link>
      )}
      <Box p={2}>
        <Typography variant='body2' color='textSecondary'>
          {moment(date).format('MMMM Do YYYY')}
        </Typography>
        <Link to={url} className={classNames(classes.noDecoration, classes.showFocus)}>
          <Typography variant='h6'>
            <span className={classes.title}>{title}</span>
          </Typography>
        </Link>
        <Typography variant='body1' color='textSecondary'>
          {snippet}
          <Link to={url} className={classes.noDecoration} tabIndex={-1}>
            <span className={classes.link}> read more...</span>
          </Link>
        </Typography>
      </Box>
    </Card>
  )
}

export default withStyles(styles, { withTheme: true })(NewsCard)
