import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import moment from 'moment'
import { Grid, makeStyles, Typography } from '@material-ui/core'

import { getAllImages, deleteImage } from '../../api/image'
import Image from '../controls/Image'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
  },
}))

export default () => {
  const classes = useStyles()
  const [images, setImages] = useState()

  useEffect(() => {
    refreshList()
  }, [])

  const deleteImageAction = (rowData) => {
    deleteImage(rowData._id).then(() => {
      refreshList()
    })
  }

  const refreshList = () => {
    getAllImages().then((images) => {
      setImages(images)
    })
  }

  return (
    <>
      {images && (
        <Grid className={classes.root}>
          <MaterialTable
            columns={[
              { title: 'Category', field: 'category' },
              { title: 'Title', field: 'title' },
              {
                title: 'Date',
                field: 'date',
                render: (rowData) => <Typography>{moment(rowData.date).format('MMMM Do YYYY')}</Typography>,
              },
              {
                title: 'Image',
                field: 'path',
                filtering: false,
                render: (rowData) => (
                  <Image
                    src={rowData.path}
                    alt='No image'
                    style={{ width: '100%', height: 250, borderRadius: '50%' }}
                  />
                ),
              },
            ]}
            actions={[
              {
                icon: 'delete',
                tooltip: 'Delete Image',
                onClick: (event, rowData) => deleteImageAction(rowData),
              },
              {
                icon: 'refresh',
                tooltip: 'Refresh Data',
                isFreeAction: true,
                onClick: () => refreshList(),
              },
            ]}
            options={{
              filtering: true,
            }}
            title='Images'
            data={images}
          />
        </Grid>
      )}
    </>
  )
}
