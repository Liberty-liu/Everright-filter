import hooks from '@ER/hooks'
import utils from '@ER/utils'
const fn = (method, props, params, sendParams) => {
  if (!props[method]) {
    return hooks.useFetch(...sendParams)
  } else {
    return props[method](params)
  }
}
export const useXhr = (props) => {
  return {
    getOptions (params) {
      return fn('getOptions', props, params, utils.apiParams('options', 'get', props.httpParams))
    },
    getConditions (params) {
      return fn('getConditions', props, params, utils.apiParams('conditions', 'get', props.httpParams, {
        params
      }))
    },
    getProps (params) {
      return fn('getProps', props, params, utils.apiParams('props', 'get', props.httpParams, {
        params
      }))
    },
    getPropValues (params) {
      return fn('getPropValues', props, params, utils.apiParams('propValues', 'get', props.httpParams, {
        params
      }))
    }
  }
}
