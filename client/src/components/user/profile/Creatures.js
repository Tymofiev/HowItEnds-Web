import React from 'react'
import MaterialTable from 'material-table'
import { connect } from 'react-redux'

import { getCreatures, deleteCreature, updateCreature } from '../../../api/creatures'
import { Grid, withStyles } from '@material-ui/core'

import { showSnackbar } from '../../../services/ui'
import { startLoading, stopLoading } from '../../../redux/actions/uiActions'
import EditGenotype from './EditGenotype'
import Image from '../../controls/Image'

const styles = (theme) => ({
  root: {
    padding: theme.spacing(5),
  },
})

class Creatures extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      creatures: [],
    }
  }

  componentDidMount() {
    this.refreshList()
  }

  deleteCreatureAction = (rowData) => {
    deleteCreature(rowData._id).then(() => {
      this.refreshList()
    })
  }

  refreshList = () => {
    const { _id } = this.props.user
    const { startLoading, stopLoading } = this.props

    startLoading()
    getCreatures(_id)
      .then((creatures) => {
        this.setState({ creatures })
      })
      .finally(() => stopLoading())
  }

  updateCreatureInfo = ({ id, name, genotype }) => {
    const { showSnackbar } = this.props

    updateCreature(id, name, genotype).then(() => {
      this.refreshList()
      showSnackbar({ message: 'Creature sucesfully updated', variant: 'success' })
    })
  }

  render() {
    const { classes } = this.props
    const { creatures } = this.state

    return (
      <>
        {creatures && (
          <Grid className={classes.root}>
            <MaterialTable
              columns={[
                { title: 'Name', field: 'name' },
                {
                  title: 'Image',
                  field: 'image',
                  export: false,
                  sorting: false,
                  filtering: false,
                  render: (rowData) => (
                    <Image src={rowData.image} alt='No image' style={{ width: 50, borderRadius: '50%' }} />
                  ),
                },
              ]}
              actions={[
                {
                  icon: 'delete',
                  tooltip: 'Delete creature',
                  onClick: (event, rowData) => this.deleteCreatureAction(rowData),
                },
                {
                  icon: 'refresh',
                  tooltip: 'Refresh Data',
                  isFreeAction: true,
                  onClick: () => this.refreshList(),
                },
              ]}
              detailPanel={(rowData) => {
                return (
                  <Grid className={classes.bodyContainer}>
                    <EditGenotype creature={rowData} saveCreature={this.updateCreatureInfo} />
                  </Grid>
                )
              }}
              onRowClick={(event, rowData, togglePanel) => {
                this.setState({ genotype: rowData.genotype }, () => {
                  togglePanel()
                })
              }}
              data={creatures}
              title='Creatures'
              options={{
                filtering: true,
              }}
            />
          </Grid>
        )}
      </>
    )
  }
}

export default connect(
  (state) => {
    return { user: state.user.data }
  },
  {
    startLoading,
    stopLoading,
    showSnackbar,
  },
)(withStyles(styles)(Creatures))
