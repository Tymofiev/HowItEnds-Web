import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Paper, Button, Typography, Grid, TextField } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 1000,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}))

export default function Checkout() {
  const classes = useStyles()

  return (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h4' align='center'>
            Profile
          </Typography>
          <>
            <React.Fragment>
              <Typography variant='h6' gutterBottom>
                Shipping address
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id='firstName'
                    name='firstName'
                    label='First name'
                    fullWidth
                    autoComplete='fname'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required id='lastName' name='lastName' label='Last name' fullWidth autoComplete='lname' />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id='address1'
                    name='address1'
                    label='Address line 1'
                    fullWidth
                    autoComplete='billing address-line1'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id='address2'
                    name='address2'
                    label='Address line 2'
                    fullWidth
                    autoComplete='billing address-line2'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id='city'
                    name='city'
                    label='City'
                    fullWidth
                    autoComplete='billing address-level2'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField id='state' name='state' label='State/Province/Region' fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id='zip'
                    name='zip'
                    label='Zip / Postal code'
                    fullWidth
                    autoComplete='billing postal-code'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id='country'
                    name='country'
                    label='Country'
                    fullWidth
                    autoComplete='billing country'
                  />
                </Grid>
              </Grid>
            </React.Fragment>
            <div className={classes.buttons}>
              <Button variant='contained' color='primary' onClick={() => {}} className={classes.button}>
                Update
              </Button>
            </div>
          </>
        </Paper>
      </main>
    </>
  )
}
