import _ from 'lodash-es'
const apiParams = (id, method, defaultHttpParams, params = {}) => {
  const result = []
  const url = _.get(defaultHttpParams, `${id}.url`, '')
  if (url) {
    result[0] = url
  }
  const findParams = _.get(defaultHttpParams, `${id}.${method}`, '')
  if (findParams) {
    const data = {
      method
    }
    const key = method === 'get' ? 'query' : 'body'
    data[method === 'get' ? 'params' : 'data'] = findParams[key]
    result[1] = data
    _.merge(data, params)
  }
  return result
}
export {
  apiParams
}
