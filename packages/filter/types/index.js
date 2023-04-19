// import CascaderType from './Cascader.vue'
// export {
//   CascaderType
// }
import _ from 'lodash-es'
const importModules = import.meta.glob('./*.vue', { eager: true })
const modules = {}
_.forIn(importModules, (func, path) => {
  modules[`${path.replace(/(.\/|\.vue)/g, '')}Type`] = func.default
})
export default modules
