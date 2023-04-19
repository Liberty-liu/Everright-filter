import LowCode from './LowCode.js'
import Filter from './Filter/index.js'
import ListFilter from './ListFilter.js'
const prefix = '/Everright-api'
export default (app) => {
  app.use(`${prefix}/lowCode`, LowCode)
  app.use(`${prefix}/filter`, Filter)
  app.use(`${prefix}/listFilter`, ListFilter)
}
