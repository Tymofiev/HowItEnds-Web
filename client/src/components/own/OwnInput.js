import React, { useEffect } from 'react'
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const OwnInput = (props) => {
  const { input, meta, ...rest } = props
  const { valid, error, touched } = meta

  useEffect(() => {}, [props])

  return (
    <>
      <TextField
        id='outlined-error'
        helperText={error}
        variant='standard'
        {...input}
        {...rest}
        margin='normal'
        fullWidth
        error={touched && !valid}
      />
    </>
  )
}

export default OwnInput
