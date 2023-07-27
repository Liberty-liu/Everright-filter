import ruleconditionsData from './data/ruleconditions.js'
export default (req, res) => {
  const { property } = req.query
  let result = []
  if (/^(cascader01|cascader02)$/.test(property)) {
    result = ruleconditionsData.cascader
  } else {
    result = ruleconditionsData.select
  }
  res.json({
    code: 0,
    msg: '',
    data: result
  })
}
