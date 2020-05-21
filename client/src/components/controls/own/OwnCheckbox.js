import React, { useEffect } from 'react'
import { FormControl, FormControlLabel, FormHelperText, Checkbox } from '@material-ui/core'

const OwnInput = (props) => {
  const { input, meta, ...rest } = props
  const { valid, error, touched } = meta

  useEffect(() => {}, [props])

  return (
    <>
      <FormControl error={touched && !valid} fullWidth>
        <FormControlLabel control={<Checkbox {...input} {...rest} />} label='Remember me' />
        <FormHelperText id='component-error-text'>{touched && error}</FormHelperText>
      </FormControl>
    </>
  )
}

export default OwnInput
