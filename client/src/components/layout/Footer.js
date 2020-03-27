import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography, Link, Container, Box, Divider } from '@material-ui/core'

import Copyright from '../home/Copyright'

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}))

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
]

const Footer = (props) => {
  const classes = useStyles()

  return (
    <>
      <footer className={classes.footer}>
        <Divider />
        <Container maxWidth='md' component='footer' className={classes.footer}>
          <Grid container spacing={4} justify='space-evenly'>
            {footers.map((footer) => (
              <Grid item xs={6} sm={3} key={footer.title}>
                <Typography variant='h6' color='textPrimary' gutterBottom>
                  {footer.title}
                </Typography>
                <ul>
                  {footer.description.map((item) => (
                    <li key={item}>
                      <Link href='#' variant='subtitle1' color='textSecondary'>
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Grid>
            ))}
          </Grid>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </footer>
    </>
  )
}

export default Footer
