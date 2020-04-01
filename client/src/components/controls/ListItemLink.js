import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { ListItem, ListItemText } from '@material-ui/core'
import ListItemIcon from '@material-ui/core/ListItemIcon'

const useStyles = makeStyles((theme) => ({
  listItem: {
    '&$selected': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.black,
      },
    },
  },
  selected: {},
}))

const ListItemLink = (props) => {
  const classes = useStyles()
  const { icon, primary, to, ...rest } = props

  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <Link to={to} ref={ref} {...itemProps} style={{ color: 'inherit' }} />),
    [to],
  )

  return (
    <li>
      <ListItem
        {...rest}
        button
        component={renderLink}
        classes={{ root: classes.listItem, selected: classes.selected }}
      >
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  )
}

export default ListItemLink
