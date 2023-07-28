import { describe, assert, expect, test, beforeEach, afterEach, beforeAll, vi } from 'vitest'
import { flushPromises, config } from '@vue/test-utils'
import optionData from '@ER-server/routes/Filter/data/options.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import NAME from '@ER/filter/name.js'
import utils from '@ER/utils'
import _ from 'lodash-es'
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
describe('type: linear', () => {
  let wrapper = {}
  const handleListener = vi.fn()
  beforeAll(() => {
    wrapper = _mount(`
      <everright-filter
        :getOptions="getOptions"
        @listener="handleListener"
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
    wrapper.setProps({
      ruleLimit: -1
    })
  })
  test('method: pushData', async () => {
    wrapper.findComponent({ ref: 'ERfilterRef' }).vm.pushData('text')
    await new Promise(resolve => setTimeout(resolve, 100))
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
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toMatchSnapshot()
  })
  test('method: clearData', async () => {
    wrapper.findComponent({ ref: 'ERfilterRef' }).vm.setData({
      filters: [{
        conditions: [
          {
            operator: 'equal',
            property: 'text',
            value: 'hello!'
          }
        ],
        logicalOperator: 'and'
      }],
      logicalOperator: 'and'
    })
    await new Promise(resolve => setTimeout(resolve, 100))
    expect(wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).exists()).toBe(true)
    wrapper.findComponent({ ref: 'ERfilterRef' }).vm.clearData('values')
    await nextTick()
    expect(wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId('operator', 'id')).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId(`${NAME.TEXTTYPE}-input`, 'id')).exists()).toBe(true)
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toEqual({})
    wrapper.findComponent({ ref: 'ERfilterRef' }).vm.clearData()
    await nextTick()
    expect(wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).exists()).toBe(true)
    expect(wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId('operator', 'id')).exists()).toBe(false)
    expect(wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId(`${NAME.TEXTTYPE}-input`, 'id')).exists()).toBe(false)
  })
  test('change: logicalOperator', async () => {
    wrapper.findComponent({ ref: 'ERfilterRef' }).vm.setData({
      filters: [{
        conditions: [
          {
            operator: 'equal',
            property: 'text',
            value: 'hello!'
          },
          {
            operator: 'equal',
            property: 'text',
            value: 'hello!'
          }
        ],
        logicalOperator: 'and'
      }],
      logicalOperator: 'and'
    })
    await new Promise(resolve => setTimeout(resolve, 100))
    expect(wrapper.find('.Everright-filter-FilterItem').find(utils.getTestId(`${NAME.LOGICALOPERATORCOMPONENT}`)).exists()).toBe(true)
    await wrapper.find('.Everright-filter-FilterItem').find(utils.getTestId(`${NAME.LOGICALOPERATORCOMPONENT}`)).find('.el-switch__core').trigger('click')
    expect(_.get(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData(), 'filters.0.logicalOperator', 'and')).toBe('or')
  })
  test('ruleLimit: 2', async () => {
    wrapper.setProps({
      ruleLimit: 2
    })
    expect(wrapper.find(utils.getTestId('addCondition')).exists()).toBe(true)
    await wrapper.find(utils.getTestId('addCondition')).trigger('click')
    expect(wrapper.find(utils.getTestId('addCondition')).exists()).toBe(false)
  })
})
