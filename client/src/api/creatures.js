import request from '../lib/request'

export const getCreatures = (user) => {
  return request({
    url: `/creatures/${user}`,
    method: 'get',
  })
}

export const updateCreature = (id, name, genotype) => {
  return request({
    url: `/creatures/${id}`,
    method: 'put',
    data: {
      name,
      genotype,
    },
  })
}

export const deleteCreature = (id) => {
  return request({
    url: `/creatures/${id}`,
    method: 'delete',
  })
}
