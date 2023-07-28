import optionData from './data/options.js'
export default (req, res) => {
  res.json({
    code: 0,
    data: optionData
  })
}
