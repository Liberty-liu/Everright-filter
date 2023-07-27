const addTestId = (id, type = 'attr') => {
  let result = type === 'attr' ? {} : ''
  if (process.env.NODE_ENV === 'test') {
    if (type === 'attr') {
      result = { 'data-test-id': `er-filter-${id}` }
    }
    if (type === 'id') {
      result = `er-filter-${id}`
    }
  }
  // process.env.NODE_ENV === 'test' ? { 'data-test-id': `er-filter-${id}` } : {}
  return result
}
const getTestId = (id, type = 'attr') => type === 'attr' ? `[data-test-id="er-filter-${id}"]` : `.er-filter-${id}`
const addAttrs = (obj) => {
  return process.env.NODE_ENV === 'test' ? { 'data-test-attrs': JSON.stringify(obj) } : {}
}
const getAttrs = (el) => JSON.parse(el.getAttribute('data-test-attrs'))
export {
  addTestId,
  getTestId,
  addAttrs,
  getAttrs
}
