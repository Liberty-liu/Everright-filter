import _ from 'lodash-es'
const getLableByLang = (obj, lang) => {
  return lang === 'zh-cn' ? obj.label : (obj.en_label || obj.label)
}
const flatNodes = (nodes, fn) => {
  return nodes.reduce((res, node, currentIndex) => {
    res.push(node)
    fn && fn(nodes, node, currentIndex)
    const children = node.children || []
    res = res.concat(flatNodes(children, fn))
    return res
  }, [])
}
const convertDataByLang = (nodes, lang) => {
  const newNodes = _.cloneDeep(nodes)
  flatNodes(newNodes, (nodes, node) => {
    if (lang !== 'zh-cn') {
      node.label = node.en_label || node.label
    }
  })
  return newNodes
}
export {
  getLableByLang,
  convertDataByLang
}
