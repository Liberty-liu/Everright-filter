import Filter from './Filter/index.js'
const prefix = '/Everright-api'
export default (app) => {
  app.use(`${prefix}/filter`, Filter)
}
