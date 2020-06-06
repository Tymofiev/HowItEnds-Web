import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Grid, Typography, Card, Box, withStyles, Paper } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import moment from 'moment'

import { startLoading, stopLoading } from '../../redux/actions/uiActions'
import { getPost, getAllPosts } from '../../api/post'
import ShareButton from '../../components/controls/ShareButton'
import ZoomImage from '../../components/controls/ZoomImage'
import smoothScrollTop from '../../lib/smoothScrollTop'
import NewsCard from './NewsCard'

const styles = (theme) => ({
  contentWrapper: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
    },
    padding: theme.spacing(5, 5, 5, 5),
  },
  wrapper: {
    minHeight: '60vh',
    padding: theme.spacing(5, 0),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    width: '100%',
    height: 'auto',
  },
  card: {
    boxShadow: theme.shadows[4],
  },
})

const NewsPost = ({ classes, startLoading, stopLoading, ...props }) => {
  const [post, setPost] = useState()
  const [otherArticles, setOtherArticles] = useState()
  const { id } = props.match.params

  useEffect(() => {
    startLoading()
    getPost(id)
      .then((result) => {
        setPost(result)
        smoothScrollTop()
        getAllPosts().then((result) => {
          const posts = result.posts.filter((post) => post._id !== id)
          const shuffled = posts.sort(() => 0.5 - Math.random())
          setOtherArticles(shuffled.slice(Math.max(shuffled.length - 3, 0)))
        })
      })
      .finally(() => stopLoading())
  }, [id])

  return (
    <Grid className={classNames(classes.wrapper)}>
      <Paper className={classes.contentWrapper}>
        <Grid container spacing={5}>
          {post ? (
            <>
              <Grid item md={9}>
                <Card className={classes.card}>
                  <Box pt={3} pr={3} pl={3} pb={2}>
                    <Typography variant='h4'>
                      <b>{post.title}</b>
                    </Typography>
                    <Typography variant='body1' color='textSecondary'>
                      {moment(post.date).format('MMMM Do YYYY')}
                    </Typography>
                  </Box>
                  <ZoomImage className={classes.img} src={post.image} alt='' />
                  <Box p={3}>
                    {post.body}
                    <Box pt={2}>
                      <Grid spacing={1} container>
                        {['Facebook', 'Twitter', 'Reddit', 'Telegram'].map((type, index) => (
                          <Grid item key={index}>
                            <ShareButton
                              type={type}
                              title='HowItEnds'
                              description='I found an awesome game!'
                              disableElevation
                              variant='contained'
                              className='text-white'
                              classes={{
                                label: 'text-white',
                              }}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            </>
          ) : (
            <Skeleton animation='wave' />
          )}
          <Grid item md={3}>
            <Typography variant='h6' paragraph>
              Other arcticles
            </Typography>
            {otherArticles &&
              otherArticles.map((newsPost) => (
                <Paper key={newsPost._id}>
                  <Box mb={3}>
                    <NewsCard
                      title={newsPost.title}
                      image={newsPost.image}
                      snippet={newsPost.snippet}
                      date={newsPost.date}
                      url={`/news/${newsPost._id}`}
                    />
                  </Box>
                </Paper>
              ))}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default connect(null, {
  startLoading,
  stopLoading,
})(withStyles(styles, { withTheme: true })(NewsPost))
