import React from 'react'
import { Link } from 'react-router-dom'

const StyledLink = React.forwardRef((props, ref) => <Link ref={ref} {...props} style={{ color: 'inherit' }} />)

export default StyledLink
