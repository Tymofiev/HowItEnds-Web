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
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import { ChevronRightOutlined } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    marginLeft: 'auto',
  },
}))

const PostCard = ({ post }) => {
  const classes = useStyles()
  const { title, date, image, body } = post

  return (
    <Card variant='outlined' className={classes.root}>
      <CardActionArea>
        <CardHeader title={title} subheader={date} />
        <CardMedia className={classes.media} image={image} />
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {body}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        {/* <IconButton aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton> */}
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
        <IconButton className={classes.expand}>
          <Typography variant='body2' component='p'>
            Open post
          </Typography>
          <ChevronRightOutlined />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default PostCard
