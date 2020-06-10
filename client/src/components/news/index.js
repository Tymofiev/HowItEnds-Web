import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Grid, Box, isWidthUp, withWidth, Paper, makeStyles, TextField, InputAdornment } from '@material-ui/core'
import { SearchOutlined } from '@material-ui/icons'
import { Pagination } from '@material-ui/lab'
import { KeyboardDatePicker } from '@material-ui/pickers'
import _ from 'lodash'

import { getAllPosts, getAllPostsByTitle, getAllPostsByDate } from '../../api/post'
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
  margin: {
    marginTop: theme.spacing(1),
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
  if (!newsPosts) return

  newsPosts.forEach((newsPost, index) => {
    gridRows[index % rows].push(
      <Grid key={newsPost._id} item xs={12}>
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
  const [selectedDate, setSelectedDate] = useState(null)

  useEffect(() => {
    startLoading()
    getAllPosts(page, 6)
      .then((result) => {
        setPostsData(result)
      })
      .finally(() => stopLoading())
  }, [startLoading, stopLoading])

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

  const handleSearchInput = (value) => {
    startLoading()
    getAllPostsByTitle(1, 6, value)
      .then((result) => {
        setPostsData(result)
      })
      .finally(() => stopLoading())
  }
  const debouncedHandleSearch = _.debounce(handleSearchInput, 450)

  const handleDateChange = (date) => {
    setSelectedDate(date)
    startLoading()
    getAllPostsByDate(1, 6, date.format('YYYY-MM-DD'))
      .then((result) => {
        setPostsData(result)
      })
      .finally(() => stopLoading())
  }

  return (
    <Grid className={classNames(classes.wrapper)}>
      {postsData && (
        <>
          <Paper className={classes.contentWrapper}>
            <Grid container justify='center' alignItems='center' className={classes.filtersWrapper}>
              <Grid item md={3} xs={12}>
                <KeyboardDatePicker
                  disableToolbar
                  variant='inline'
                  format='MM/DD/yyyy'
                  margin='normal'
                  id='date-picker-inline'
                  label='Filter posts by date'
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  autoOk
                />
              </Grid>
              <Grid item md={3} xs={12}>
                <TextField
                  className={classes.margin}
                  id='input-with-icon-textfield'
                  label='Search by title'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <SearchOutlined />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => debouncedHandleSearch(e.target.value)}
                />
              </Grid>
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
