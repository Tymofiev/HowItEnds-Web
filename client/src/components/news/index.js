import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Grid, Box, isWidthUp, withWidth, Paper, makeStyles, Typography } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'

import { getAllPosts } from '../../api/post'
import { startLoading, stopLoading } from '../../redux/actions/uiActions'
import NewsCard from './NewsCard'
import smoothScrollTop from '../../lib/smoothScrollTop'

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
  paginationWrapper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1, 0),
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
            image={newsPost.image}
            title={newsPost.title}
            snippet={newsPost.snippet}
            date={newsPost.date}
            url={`/news/${newsPost._id}`}
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

const News = ({ width, startLoading, stopLoading }) => {
  const classes = useStyles()
  const [page, setPage] = useState(1)
  const [postsData, setPostsData] = useState()

  useEffect(() => {
    startLoading()
    getAllPosts(page, 6)
      .then((result) => {
        setPostsData(result)
      })
      .finally(() => stopLoading())
  }, [])

  const handleChange = (event, page) => {
    setPage(page)
    startLoading()
    getAllPosts(page, 6)
      .then((result) => {
        setPostsData(result)
        smoothScrollTop()
      })
      .finally(() => stopLoading())
  }

  return (
    <Grid className={classNames(classes.wrapper)}>
      {postsData && (
        <>
          <Paper className={classes.contentWrapper}>
            <Grid className={classes.filtersWrapper}>
              <Typography>Filters</Typography>
            </Grid>
            <Grid container spacing={3}>
              {getVerticalNewsPosts(width, postsData.posts)}
            </Grid>
          </Paper>
          <Grid container direction='row' justify='center' alignItems='center'>
            <Grid item md={12}>
              <Paper variant='elevation' elevation={10} className={classes.paginationWrapper}>
                <Grid container direction='row' justify='center' alignItems='center'>
                  <Pagination
                    variant='outlined'
                    color='primary'
                    showFirstButton
                    showLastButton
                    count={postsData.totalPages}
                    page={page}
                    onChange={handleChange}
                  />
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  )
}

News.propTypes = {
  width: PropTypes.string.isRequired,
}

export default connect(null, {
  startLoading,
  stopLoading,
})(withWidth()(News))
