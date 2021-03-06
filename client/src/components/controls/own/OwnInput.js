import React, { useEffect } from 'react'
import { TextField } from '@material-ui/core'

const OwnInput = (props) => {
  const { input, meta, ...rest } = props
  const { valid, error, touched } = meta

  useEffect(() => {}, [props])

  return (
    <>
      <TextField
        aria-label='input'
        helperText={touched && error}
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
