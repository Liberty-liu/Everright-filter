import _ from 'lodash-es'
import Nzh from 'nzh'
import writtenNumber from 'written-number'
const digitalToChinese = (number) => {
  return Nzh.cn.encodeS(number)
}
const digitalToEnglish = (number) => {
  return _.startCase(writtenNumber(number))
}
export {
  digitalToChinese,
  digitalToEnglish
}
