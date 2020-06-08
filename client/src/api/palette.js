import request from '../lib/request'

export const savePalette = (userId, type, palette) => {
  return request({
    url: `/palettes`,
    method: 'post',
    data: {
      type,
      palette,
      user: userId,
    },
  })
}

export const getPalette = (id) => {
  return request({
    url: `/palettes/${id}`,
    method: 'get',
  })
}

export const clearPalette = (id) => {
  return request({
    url: `/palettes/${id}`,
    method: 'delete',
  })
}
