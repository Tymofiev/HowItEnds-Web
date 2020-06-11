import React from 'react'

import { getImageUrl } from '../../utils/url'

const Image = ({ src, className, style, alt }) => {
  return <img src={getImageUrl(src)} style={style} className={className} alt={alt} />
}

export default Image
