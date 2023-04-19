import { computed, inject } from 'vue'
import locale from '@ER/filter/locale'
import utils from '@ER/utils'
import _ from 'lodash-es'
const transferData = (lang, path, locale, options = {}) => {
  let result = ''
  if (_.isEmpty(options)) {
    result = _.get(locale[lang], path, '')
  } else {
    result = _.template(_.get(locale[lang], path, ''))(options)
  }
  return result
}
export const useI18n = (props) => {
  const ER = inject('Everright', { props })
  const lang = computed(() => {
    return ER.props.lang
  })
  return {
    lang,
    t (path, options) {
      return transferData(lang.value, path, locale, options)
    }
  }
}
