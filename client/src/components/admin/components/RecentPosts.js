import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import Typography from '@material-ui/core/Typography'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import StyledLink from '../../controls/styled/StyledLink'
import Title from './Title'

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod) {
  return { id, date, name, shipTo, paymentMethod }
}

const rows = [
  createData(0, '16 Mar, 2019', 'Lorem ipsum', 'Img', 'Content'),
  createData(0, '16 Mar, 2019', 'Lorem ipsum', 'Img', 'Content'),
  createData(0, '16 Mar, 2019', 'Lorem ipsum', 'Img', 'Content'),
  createData(0, '16 Mar, 2019', 'Lorem ipsum', 'Img', 'Content'),
  createData(0, '16 Mar, 2019', 'Lorem ipsum', 'Img', 'Content'),
]

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}))

const RecentPosts = () => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Title>Recent Posts</Title>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Content</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
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
