import { Form } from 'react-bootstrap'
import React, { useEffect } from 'react'

const OwnInput = (props) => {
  const { input, meta, ...rest } = props
  const { valid, error, touched } = meta

  useEffect(() => {}, [props])

  return (
    <>
      <Form.Control {...input} {...rest} isInvalid={touched && !valid} />
      {touched && error && <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback>}
    </>
  )
}

export default OwnInput
