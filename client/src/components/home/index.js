import React from 'react'
import Main from './Main'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
}))

const Home = () => {
  const classes = useStyles()

  const post = {
    title: 'HowItEnds',
    description: 'Evolution simultor',
    linkText: 'Buy',
    imgText: 'main image description',
  }
  return (
    <>
      <div className={classes.root}>
        <Main post={post} />
      </div>
    </>
  )
}

export default Home
