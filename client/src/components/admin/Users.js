import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'

import { getAllUsers, deleteUser } from '../../api/user'
import { Grid, makeStyles } from '@material-ui/core'

import Image from '../controls/Image'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
  },
}))

export default () => {
  const classes = useStyles()
  const [usersData, setUsersData] = useState()

  useEffect(() => {
    refreshList()
  }, [])

  const deleteUserAction = (rowData) => {
    deleteUser(rowData._id).then(() => {
      refreshList()
    })
  }

  const refreshList = () => {
    getAllUsers().then((result) => {
      setUsersData(result)
    })
  }

  return (
    <>
      {usersData && (
        <Grid className={classes.root}>
          <MaterialTable
            columns={[
              { title: 'Username', field: 'username' },
              { title: 'Email', field: 'email' },
              { title: 'Active', field: 'active', type: 'boolean' },
              {
                title: 'Avatar',
                field: 'avatar',
                export: false,
                render: (rowData) => (
                  <Image src={rowData.avatar} alt='No image' style={{ width: 50, borderRadius: '50%' }} />
                ),
              },
            ]}
            actions={[
              {
                icon: 'delete',
                tooltip: 'Delete post',
                onClick: (event, rowData) => deleteUserAction(rowData),
              },
              {
                icon: 'refresh',
                tooltip: 'Refresh Data',
                isFreeAction: true,
                onClick: () => refreshList(),
              },
            ]}
            data={usersData.users}
            title='Users'
            options={{
              exportButton: true,
              exportFileName: 'users',
              filtering: true,
            }}
          />
        </Grid>
      )}
    </>
  )
}
