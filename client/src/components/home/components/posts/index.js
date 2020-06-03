import React, { useState } from 'react'
import { Grid, Paper } from '@material-ui/core'
import Pagination from 'material-ui-flat-pagination'

import PostCard from './PostCard'
import image from '../../../../images/robot.jpg'
import news from '../../../../images/news.jpg'
import { makeStyles } from '@material-ui/core/styles'

const posts = [
  {
    id: 1,
    title: 'Post title',
    date: 'September 14, 2016',
    image: image,
    body:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id mi sed ante imperdiet mattis. Vivamus semperex et urna egestas, at dictum velit gravida. Integer eu mattis mauris.',
  },
  {
    id: 2,
    title: 'Post title',
    date: 'September 14, 2016',
    image: image,
    body:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id mi sed ante imperdiet mattis. Vivamus semperex et urna egestas, at dictum velit gravida. Integer eu mattis mauris.',
  },
  {
    id: 3,
    title: 'Post title',
    date: 'September 14, 2016',
    image: image,
    body:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id mi sed ante imperdiet mattis. Vivamus semperex et urna egestas, at dictum velit gravida. Integer eu mattis mauris.',
  },
  {
    id: 4,
    title: 'Post title',
    date: 'September 14, 2016',
    image: image,
    body:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id mi sed ante imperdiet mattis. Vivamus semperex et urna egestas, at dictum velit gravida. Integer eu mattis mauris.',
  },
]

const useStyles = makeStyles((theme) => ({
  paperWrapper: {
    padding: theme.spacing(10, 5, 10, 10),
  },
  paginationWrapper: {
    marginTop: theme.spacing(2),
  },
}))

const Posts = () => {
  const classes = useStyles(0)
  const [offset, setOffset] = useState()
  const [displayPosts, setPosts] = useState(posts.slice(0, 4))

  const handleClick = (offset) => {
    console.log(offset)
    setOffset(offset)
    setPosts(posts.slice(offset))
  }

  return (
    <>
      <Paper variant='elevation' elevation={10} className={classes.paperWrapper}>
        <Grid container direction='row' justify='center' alignItems='center'>
          <Grid item md={12}>
            <Grid container direction='row' justify='center' alignItems='center'>
              {displayPosts.map((post) => (
                <Grid key={post.id} item md={3}>
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
                <Pagination limit={3} offset={offset} total={100} onClick={(e, offset) => handleClick(offset)} />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default Posts
