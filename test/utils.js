import { mount } from '@vue/test-utils'
import { EverrightFilter } from '@ER/filter/index.js'
import ElementPlus from 'element-plus'

export const getSelectOptions = (id) => Array.from(
  document.querySelectorAll(`${id} .el-select-dropdown__item`))
export const getTypes = (id) => {}
export const _mount = (template, data, otherObj) => mount(
  {
    components: {
      EverrightFilter
    },
    template,
    data,
    ...otherObj
  },
  {
    attachTo: 'body',
    global: {
      plugins: [
        ElementPlus
      ]
    }
  }
)
