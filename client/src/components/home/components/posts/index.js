import React, { useState, useEffect } from 'react'
import { Grid, Paper } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { Skeleton } from '@material-ui/lab'

import { getAllPosts } from '../../../../api/post'
import PostCard from './PostCard'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paperWrapper: {
    padding: theme.spacing(10, 5, 10, 10),
  },
  paginationWrapper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1, 0),
  },
}))

const Posts = () => {
  const classes = useStyles()
  const [page, setPage] = useState(1)
  const [postsData, setPosts] = useState()

  useEffect(() => {
    getAllPosts(page, 4).then((result) => {
      setPosts(result)
    })
  }, [])

  const handleChange = (event, page) => {
    setPage(page)
    getAllPosts(page, 4).then((result) => {
      setPosts(result)
    })
  }

  return (
    <>
      <Paper variant='elevation' elevation={10} className={classes.paperWrapper}>
        {postsData ? (
          <>
            <Grid container direction='row' justify='center' alignItems='center'>
              <Grid item md={12}>
                <Grid container direction='row' justify='center' alignItems='center'>
                  {postsData.posts.map((post) => (
                    <Grid key={post._id} item md={3}>
                      <PostCard post={post} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
            <Grid container direction='row' justify='center' alignItems='center'>
              <Grid item md={12}>
                <Paper variant='elevation' elevation={10} className={classes.paginationWrapper}>
                  <Grid container direction='row' justify='center' alignItems='center'>
                    <Pagination
                      variant='outlined'
                      color='primary'
                      count={postsData.totalPages}
                      page={page}
                      onChange={handleChange}
                    />
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </>
        ) : (
          <Skeleton animation='wave' />
        )}
      </Paper>
    </>
  )
}

export default Posts
