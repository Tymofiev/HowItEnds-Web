import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import CardActionArea from '@material-ui/core/CardActionArea'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ShareIcon from '@material-ui/icons/Share'
import { ChevronRightOutlined } from '@material-ui/icons'
import moment from 'moment'

import StyledLink from '../../../controls/styled/StyledLink'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  expand: {
    marginLeft: 'auto',
  },
}))

const PostCard = ({ post }) => {
  const classes = useStyles()
  const { _id, title, date, image, snippet } = post

  return (
    <Card variant='outlined' className={classes.root}>
      <CardActionArea>
        <CardHeader title={title} subheader={moment(date).format('MMMM Do YYYY')} />
        <CardMedia component='img' className={classes.media} src={image} />
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {snippet}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
        <IconButton className={classes.expand}>
          <Typography variant='body2' component='p'>
            <StyledLink to={`/news/${_id}`}>Open post</StyledLink>
          </Typography>
          <ChevronRightOutlined />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default PostCard
