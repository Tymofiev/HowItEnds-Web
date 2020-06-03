import React, { useRef } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Button, Grid, Typography } from '@material-ui/core'
import { motion } from 'framer-motion'

import WaveBorder from '../../controls/WaveBorder'

const styles = (theme) => ({
  root: {
    padding: theme.spacing(5, 0),
    background: `linear-gradient(0deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.dark} 90%)`,
  },
})

const Separator = ({ title, btn, classes, theme }) => {
  const constraintsRef = useRef(null)

  return (
    <>
      <Grid
        ref={constraintsRef}
        container
        direction='row'
        justify='space-around'
        alignItems='center'
        className={classes.root}
      >
        <motion.div drag dragConstraints={constraintsRef}>
          <Typography variant='h2' color='textPrimary'>
            {title}
          </Typography>
        </motion.div>
        {btn && (
          <Button onClick={btn.onClick} variant='outlined'>
            <Typography variant='subtitle1'>{btn.text}</Typography>
          </Button>
        )}
      </Grid>
      <WaveBorder
        upperColor={`linear-gradient(180deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.dark} 90%)`}
        lowerColor={theme.palette.background.paper}
        animationNegativeDelay={4}
      />
    </>
  )
}

export default withStyles(styles, { withTheme: true })(Separator)
