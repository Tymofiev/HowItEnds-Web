import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import robot from '../../images/robot.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    height: 'auto',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}))

const tileData = [
  {
    img: robot,
    title: 'Image',
    date: 'December 14th, 2020',
  },
  {
    img: robot,
    title: 'Image',
    date: 'December 14th, 2020',
  },
  {
    img: robot,
    title: 'Image',
    date: 'December 14th, 2020',
  },
  {
    img: robot,
    title: 'Image',
    date: 'December 14th, 2020',
  },
  {
    img: robot,
    title: 'Image',
    date: 'December 14th, 2020',
  },
  {
    img: robot,
    title: 'Image',
    date: 'December 14th, 2020',
  },
  {
    img: robot,
    title: 'Image',
    date: 'December 14th, 2020',
  },
]

export default function TitlebarGridList() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <GridList cellHeight={300}>
        <GridListTile key='Subheader' cols={2} style={{ height: 'auto' }}>
          <ListSubheader component='div'>Menu</ListSubheader>
        </GridListTile>
        {tileData.map((tile) => (
          <GridListTile data-aos='zoom-in-up' data-aos-delay={5} className={classes.gridList} key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={tile.date}
              actionIcon={
                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
        <GridListTile key='Subheader' cols={2} style={{ height: 'auto' }}>
          <ListSubheader component='div'>Gameplay</ListSubheader>
        </GridListTile>
      </GridList>
    </div>
  )
}
