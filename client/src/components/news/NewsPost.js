import React, { useEffect } from 'react'
import classNames from 'classnames'
import format from 'date-fns/format'
import { Grid, Typography, Card, Box, withStyles, Paper } from '@material-ui/core'
import NewsCard from './NewsCard'
import ShareButton from '../../components/controls/ShareButton'
import ZoomImage from '../../components/controls/ZoomImage'
import smoothScrollTop from '../../lib/smoothScrollTop'
import dummyData from './dummyData'

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

const NewsPost = (props) => {
  const { classes } = props
  const { date, title, imageSrc, content } = dummyData[0]
  const otherArticles = dummyData

  useEffect(() => {
    document.title = `HowItEnds - ${title}`
    smoothScrollTop()
  }, [])

  return (
    <Grid className={classNames(classes.wrapper)} justifyContent='center'>
      <Paper className={classes.contentWrapper}>
        <Grid container spacing={5}>
          <Grid item md={9}>
            <Card className={classes.card}>
              <Box pt={3} pr={3} pl={3} pb={2}>
                <Typography variant='h4'>
                  <b>{title}</b>
                </Typography>
                <Typography variant='body1' color='textSecondary'>
                  {date}
                </Typography>
              </Box>
              <ZoomImage className={classes.img} src={imageSrc} alt='' />
              <Box p={3}>
                {content}
                <Box pt={2}>
                  <Grid spacing={1} container>
                    {['Facebook', 'Twitter', 'Reddit', 'Telegram'].map((type, index) => (
                      <Grid item key={index}>
                        <ShareButton
                          type={type}
                          title='React SaaS Template'
                          description='I found an awesome template for an webapp using React!'
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
          <Grid item md={3}>
            <Typography variant='h6' paragraph>
              Other arcticles
            </Typography>
            {otherArticles.map((newsPost) => (
              <Paper>
                <Box key={newsPost.id} mb={3}>
                  <NewsCard
                    title={newsPost.title}
                    snippet={newsPost.snippet}
                    date={newsPost.date}
                    url={`/news/${newsPost.id}`}
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

export default withStyles(styles, { withTheme: true })(NewsPost)
