import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import { getAllUsers } from '../../../api/user'
import StyledLink from '../../controls/styled/StyledLink'
import Title from './Title'

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
})

const RecentUsers = () => {
  const classes = useStyles()
  const [users, setUsers] = useState()

  useEffect(() => {
    getAllUsers().then((result) => {
      const users = result.users
      setUsers(users.slice(Math.max(users.length - 3, 0)))
    })
  }, [])

  return (
    <React.Fragment>
      <Title>Recent Users</Title>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users &&
            users.map((user) => (
              <TableRow key={user.email}>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div>
        <Typography color='primary'>
          <StyledLink to='/admin/users'>View all</StyledLink>
        </Typography>
      </div>
    </React.Fragment>
  )
}

export default RecentUsers
