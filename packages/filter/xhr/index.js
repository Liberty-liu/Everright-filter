import hooks from '@ER/hooks'
import utils from '@ER/utils'
export const useXhr = (httpPrams) => {
  return {
    getOptions () {
      return hooks.useFetch(...utils.apiParams('options', 'get', httpPrams))
    },
    getConditions (params) {
      return hooks.useFetch(...utils.apiParams('conditions', 'get', httpPrams, {
        params
      }))
    },
    getProps (params) {
      return hooks.useFetch(...utils.apiParams('props', 'get', httpPrams, {
        params
      }))
    },
    getPropValues (params) {
      return hooks.useFetch(...utils.apiParams('propValues', 'get', httpPrams, {
        params
      }))
    }
  }
}
