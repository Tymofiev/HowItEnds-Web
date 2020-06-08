import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import Typography from '@material-ui/core/Typography'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import moment from 'moment'

import { getAllPosts } from '../../../api/post'
import StyledLink from '../../controls/styled/StyledLink'
import Title from './Title'

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}))

const RecentPosts = () => {
  const classes = useStyles()
  const [posts, setPosts] = useState()

  useEffect(() => {
    getAllPosts().then((result) => {
      const posts = result.posts.sort((a, b) => a.title > b.title)
      setPosts(posts.slice(Math.max(posts.length - 3, 0)))
    })
  }, [])

  return (
    <React.Fragment>
      <Title>Recent Posts</Title>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Snippet</TableCell>
            <TableCell>Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts &&
            posts.map((post) => (
              <TableRow key={post._id}>
                <TableCell>{moment(post.date).format('MMMM Do YYYY')}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.snippet}</TableCell>
                <TableCell>
                  <img src={`/${post.image}`} style={{ width: 50, borderRadius: '50%' }} alt='No image' />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Typography color='primary'>
          <StyledLink to='/admin/posts'>See more posts</StyledLink>
        </Typography>
      </div>
    </React.Fragment>
  )
}

export default RecentPosts
