import { describe, assert, expect, test, beforeEach, afterEach, beforeAll, vi } from 'vitest'
import { flushPromises, config } from '@vue/test-utils'
import optionData from '@ER-server/routes/Filter/data/options.js'
import ruleconditionsData from '@ER-server/routes/Filter/data/ruleconditions.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import NAME from '@ER/filter/name.js'
import utils from '@ER/utils'
import { nextTick } from 'vue'
import { getSelectOptions, _mount } from './utils.js'
config.global.components.Delete = ElementPlusIconsVue.Delete
const getOptions = async () => {
  return new Promise((resolve, reject) => {
    resolve({
      data: optionData
    })
  })
}
const getConditions = async () => {
  return new Promise((resolve, reject) => {
    resolve({
      data: ruleconditionsData.cascader
    })
  })
}
describe('renderType: CASCADER', () => {
  let wrapper = {}
  const handleListener = vi.fn()
  beforeAll(() => {
    wrapper = _mount(`
      <everright-filter
        :getOptions="getOptions"
        :getConditions="getConditions"
        @listener="handleListener"
        ref="ERfilterRef"
      />
      `, () => ({
      handleListener,
      getOptions,
      getConditions
    })
    )
  })
  afterEach(() => {
    wrapper.findComponent({ ref: 'ERfilterRef' }).vm.clearData()
  })
  test('operator: "style=noop" && params: ["multiple = false"] && value is not empty', async () => {
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find('.Everright-filter-TriggerComponent').trigger('click')
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-node')[0].click()
    await nextTick()
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-menu')[1].querySelectorAll('.el-cascader-node')[0].click()
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
    await nextTick()
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toEqual({})
    await new Promise(resolve => setTimeout(resolve, 100))
    const cascaderElm = wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId(`${NAME.CASCADERTYPE}`, 'id'))
    expect(cascaderElm.classes()).toContain('ERFILTER-ERROR')
    await cascaderElm.trigger('click')
    expect(document.querySelector(utils.getTestId(`${NAME.CASCADERTYPE}-popperClass`, 'id')).style.display).not.toBe('none')
    document.querySelector(utils.getTestId(`${NAME.CASCADERTYPE}-popperClass`, 'id')).querySelectorAll('.el-cascader-node')[0].click()
    await new Promise(resolve => setTimeout(resolve, 100))
    expect(document.querySelector(utils.getTestId(`${NAME.CASCADERTYPE}-popperClass`, 'id')).style.display).toBe('none')
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toMatchSnapshot()
  })
  test('operator: "style=noop" && params: ["multiple = true"] && value is not empty', async () => {
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find('.Everright-filter-TriggerComponent').trigger('click')
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-node')[0].click()
    await nextTick()
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-menu')[1].querySelectorAll('.el-cascader-node')[1].click()
    await flushPromises()
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId('operator', 'id')).trigger('click')
    await nextTick()
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toEqual({})
    await new Promise(resolve => setTimeout(resolve, 100))
    const cascaderElm = wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId(`${NAME.CASCADERTYPE}`, 'id'))
    expect(cascaderElm.classes()).toContain('ERFILTER-ERROR')
    await cascaderElm.trigger('click')
    expect(document.querySelector(utils.getTestId(`${NAME.CASCADERTYPE}-popperClass`, 'id')).style.display).not.toBe('none')
    expect(document.querySelector(utils.getTestId(`${NAME.CASCADERTYPE}-popperClass`, 'id')).querySelectorAll('.el-cascader-menu')[0].querySelectorAll('.el-cascader-node')[0].querySelector('.el-checkbox').className).not.toContain('is-checked')
    document.querySelector(utils.getTestId(`${NAME.CASCADERTYPE}-popperClass`, 'id')).querySelectorAll('.el-cascader-menu')[0].querySelectorAll('.el-cascader-node')[0].querySelector('.el-checkbox').click()
    await nextTick()
    expect(document.querySelector(utils.getTestId(`${NAME.CASCADERTYPE}-popperClass`, 'id')).querySelectorAll('.el-cascader-menu')[0].querySelectorAll('.el-cascader-node')[0].querySelector('.el-checkbox').className).toContain('is-checked')
    document.querySelector(utils.getTestId(`${NAME.CASCADERTYPE}-popperClass`, 'id')).querySelectorAll('.el-cascader-menu')[0].querySelectorAll('.el-cascader-node')[1].querySelector('.el-checkbox').click()
    await nextTick()
    expect(document.querySelector(utils.getTestId(`${NAME.CASCADERTYPE}-popperClass`, 'id')).querySelectorAll('.el-cascader-menu')[0].querySelectorAll('.el-cascader-node')[1].querySelector('.el-checkbox').className).toContain('is-checked')
    expect(document.querySelector(utils.getTestId(`${NAME.CASCADERTYPE}-popperClass`, 'id')).querySelectorAll('.el-cascader-menu')[1].querySelectorAll('.el-cascader-node .el-checkbox.is-disabled').length).toBe(20)
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toMatchSnapshot()
  })
  test.only('operator: "style=none"', async () => {
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find('.Everright-filter-TriggerComponent').trigger('click')
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-node')[0].click()
    await nextTick()
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-menu')[1].querySelectorAll('.el-cascader-node')[1].click()
    await flushPromises()
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId('operator', 'id')).trigger('click')
    const selectOptions = getSelectOptions(utils.getTestId('operator-popperClass', 'id'))
    selectOptions[5].click()
    await nextTick()
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toMatchSnapshot()
  })
})
