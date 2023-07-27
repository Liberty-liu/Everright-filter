import { describe, assert, expect, test, beforeEach, afterEach, beforeAll, vi } from 'vitest'
import { mount, flushPromises, enableAutoUnmount, config } from '@vue/test-utils'
import optionData from '@ER-server/routes/Filter/data/options.js'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { EverrightFilter } from '@ER/filter'
import NAME from '@ER/filter/name.js'
import utils from '@ER/utils'
import { nextTick } from 'vue'
import { getSelectOptions } from '../utils.js'
config.global.components.Delete = ElementPlusIconsVue.Delete
const _mount = (template, data, otherObj) => mount(
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
const getOptions = async () => {
  return new Promise((resolve, reject) => {
    resolve({
      data: optionData
    })
  })
}
describe('renderType: TEXT', () => {
  let wrapper = {}
  const handleListener = vi.fn()
  beforeAll(() => {
    wrapper = _mount(`
      <everright-filter
        :getOptions="getOptions"
        ref="ERfilterRef"
      />
      `, () => ({
      handleListener,
      getOptions
    })
    )
  })
  afterEach(() => {
    wrapper.findComponent({ ref: 'ERfilterRef' }).vm.clearData()
  })
  test('operator: "style=noop" && value is not empty', async () => {
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find('.Everright-filter-TriggerComponent').trigger('click')
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-node')[0].click()
    await nextTick()
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-menu')[1].querySelectorAll('.el-cascader-node')[5].click()
    await flushPromises()
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId('operator', 'id')).trigger('click')
    expect(getSelectOptions(utils.getTestId('operator-popperClass', 'id')).map(e => utils.getAttrs(e).value)).toEqual([
      'equal',
      'one_of',
      'not_equal',
      'contains',
      'not_contain',
      'empty',
      'not_empty'
    ])
    let inputElm = wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId(`${NAME.TEXTTYPE}-input`, 'id'))
    const inputWrapper = inputElm.find('input')
    const nativeInput = inputWrapper.element
    expect(inputElm.exists()).toBe(true)
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toEqual({})
    await new Promise(resolve => setTimeout(resolve, 100))
    inputElm = wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId(`${NAME.TEXTTYPE}-input`, 'id'))
    expect(inputElm.classes()).toContain('ERFILTER-ERROR')
    nativeInput.value = '1'
    await inputWrapper.trigger('input')
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData(), '', 2).toMatchSnapshot()
  })
})
