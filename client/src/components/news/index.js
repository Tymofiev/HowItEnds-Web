import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Grid, Box, isWidthUp, withWidth, withStyles, Paper, makeStyles, Typography } from '@material-ui/core'
import NewsCard from './NewsCard'
import dummyData from './dummyData'

const useStyles = makeStyles((theme) => ({
  contentWrapper: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
    },
    padding: theme.spacing(5, 5, 5, 5),
  },
  wrapper: {
    backgroundColor: theme.palette.background.default,
    minHeight: '60vh',
    padding: theme.spacing(5, 0),
  },
  noDecoration: {
    textDecoration: 'none !important',
  },
  filtersWrapper: {
    padding: theme.spacing(5, 5, 5, 5),
  },
}))

const getVerticalNewsPosts = (width, newsPosts) => {
  const gridRows = [[], [], []]
  let rows
  let xs
  if (isWidthUp('md', width)) {
    rows = 3
    xs = 4
  } else if (isWidthUp('sm', width)) {
    rows = 2
    xs = 6
  } else {
    rows = 1
    xs = 12
  }
  newsPosts.forEach((newsPost, index) => {
    gridRows[index % rows].push(
      <Grid key={newsPost.id} item xs={12}>
        <Box mb={3}>
          <NewsCard
            src={newsPost.imageSrc}
            title={newsPost.title}
            snippet={newsPost.snippet}
            date={newsPost.date}
            url={`/news/${newsPost.id}`}
          />
        </Box>
      </Grid>,
    )
  })
  return gridRows.map((element, index) => (
    <Grid key={index} item xs={xs}>
      {element}
    </Grid>
  ))
}

const News = (props) => {
  const classes = useStyles()
  const { width } = props
  const newsPosts = dummyData

  return (
    <Grid className={classNames(classes.wrapper)}>
      <Paper className={classes.contentWrapper}>
        <Grid className={classes.filtersWrapper}>
          <Typography>Filters</Typography>
        </Grid>
        <Grid container spacing={3}>
          {getVerticalNewsPosts(width, newsPosts)}
        </Grid>
      </Paper>
    </Grid>
  )
}

News.propTypes = {
  width: PropTypes.string.isRequired,
}

export default withWidth()(News)
