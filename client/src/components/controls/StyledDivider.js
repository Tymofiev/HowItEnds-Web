import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Divider } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(2),
  },
}))

const StyledDivider = () => {
  const classes = useStyles()
  return <Divider variant='inset' className={classes.divider} />
}

export default StyledDivider
