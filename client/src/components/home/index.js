import React from 'react'

import Main from './components/Main'
import Posts from './components/posts/index'
import Guide from './components/guide/index'

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
    description: 'Incredible evolution simultor',
    linkText: 'Get started',
    imgText: 'main image description',
  }
  return (
    <>
      <div className={classes.root}>
        <Main post={post} />
        <Guide />
        <Posts />
      </div>
    </>
  )
}

export default Home
