import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import { getAllPosts, deletePost } from '../../api/post'
import { Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

import EditPostDialog from './dialogs/EditPostDialog'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
  },
  bodyContainer: {
    padding: theme.spacing(5),
  },
}))

export default () => {
  const classes = useStyles()
  const [postsData, setPostsData] = useState()
  const [open, setOpen] = useState(false)
  const [post, setPost] = useState(false)

  useEffect(() => {
    getAllPosts().then((result) => {
      setPostsData(result)
    })
  }, [])

  const openEditDialog = (rowData) => {
    setOpen(true)
    setPost(rowData)
  }

  const deletePostAction = (rowData) => {
    deletePost(rowData._id).then(() => {
      refreshList()
    })
  }

  const refreshList = () => {
    getAllPosts().then((result) => {
      setPostsData(result)
    })
  }

  return (
    <>
      {postsData && (
        <Grid className={classes.root}>
          <MaterialTable
            columns={[
              { title: 'Title', field: 'title' },
              { title: 'Snippet', field: 'snippet' },
              { title: 'Date', field: 'date', type: 'date' },
              { title: 'body', field: 'body', hidden: true, export: true },
              {
                title: 'Image',
                field: 'image',
                export: false,
                render: (rowData) => <img src={`/${rowData.image}`} style={{ width: 50, borderRadius: '50%' }} />,
              },
            ]}
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit post',
                onClick: (event, rowData) => openEditDialog(rowData),
              },
              {
                icon: 'delete',
                tooltip: 'Delete post',
                onClick: (event, rowData) => deletePostAction(rowData),
              },
              {
                icon: 'refresh',
                tooltip: 'Refresh Data',
                isFreeAction: true,
                onClick: () => refreshList(),
              },
            ]}
            data={postsData.posts}
            title='Posts'
            detailPanel={(rowData) => {
              return (
                <Grid className={classes.bodyContainer}>
                  <Typography color='primary'>Body:</Typography>
                  <Typography>{rowData.body}</Typography>
                </Grid>
              )
            }}
            onRowClick={(event, rowData, togglePanel) => togglePanel()}
            options={{
              exportButton: true,
              exportFileName: 'posts',
              filtering: true,
            }}
          />
        </Grid>
      )}
      <EditPostDialog open={open} post={post} handleClose={() => setOpen(false)} />
    </>
  )
}
