import React, { useEffect, useState } from 'react'
import { FormControl, Input, InputAdornment, FormHelperText, IconButton } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'

const PasswordInput = (props) => {
  const [showPassword, setShowPassword] = useState(false)
  const { input, meta, ...rest } = props
  const { valid, error, touched } = meta

  useEffect(() => {}, [props])

  return (
    <FormControl error={touched && !valid} fullWidth>
      <Input
        id='component-error'
        {...input}
        {...rest}
        type={showPassword ? 'text' : 'password'}
        aria-describedby='component-error-text'
        endAdornment={
          <InputAdornment position='end'>
            <IconButton aria-label='toggle password visibility' onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText id='component-error-text'>{touched && error}</FormHelperText>
    </FormControl>
  )
}

export default PasswordInput
