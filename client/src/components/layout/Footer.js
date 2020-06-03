import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Grid, Typography, Link, Container, Box } from '@material-ui/core'

import Copyright from './components/Copyright'
import ContactForm from './components/ContactForm'
import WaveBorder from '../controls/WaveBorder'

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.default,
    paddingBottom: theme.spacing(3),
  },
}))

const footers = [
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
]

const Footer = () => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <>
      <footer className={classes.footer}>
        <WaveBorder
          upperColor={theme.palette.background.paper}
          lowerColor={theme.palette.background.default}
          animationNegativeDelay={4}
        />
        <Container maxWidth='md' component='footer' className={classes.footer}>
          <Grid container spacing={4} justify='space-evenly'>
            <Grid item xs={6} sm={5}>
              <Typography variant='h6' color='textPrimary' gutterBottom>
                Contact us
              </Typography>
              <ContactForm />
            </Grid>
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
