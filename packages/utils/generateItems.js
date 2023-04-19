import _ from 'lodash-es'
const generateItems = (len = 1) => {
  const result = []
  while (len--) {
    result.push(_.uniqueId())
  }
  return result
}
export {
  generateItems
}
