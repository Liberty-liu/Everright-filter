import { describe, assert, expect, test, beforeEach, afterEach, beforeAll, vi } from 'vitest'
import { mount, flushPromises, enableAutoUnmount, config } from '@vue/test-utils'
import optionData from '@ER-server/routes/Filter/data/options.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import NAME from '@ER/filter/name.js'
import utils from '@ER/utils'
import { nextTick } from 'vue'
import { getSelectOptions, _mount } from '../utils.js'
config.global.components.Delete = ElementPlusIconsVue.Delete
const getOptions = async () => {
  return new Promise((resolve, reject) => {
    resolve({
      data: optionData
    })
  })
}
describe('renderType: NUMBER', () => {
  let wrapper = {}
  const handleListener = vi.fn()
  beforeAll(async () => {
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
  })
  test('operator: "style=noop" && value is not empty', async () => {
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find('.Everright-filter-TriggerComponent').trigger('click')
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-node')[0].click()
    await nextTick()
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-menu')[1].querySelectorAll('.el-cascader-node')[6].click()
    await flushPromises()
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId('operator', 'id')).trigger('click')
    expect(getSelectOptions(utils.getTestId('operator-popperClass', 'id')).map(e => utils.getAttrs(e).value)).toEqual([
      'equal',
      'not_equal',
      'greater_than',
      'greater_than_equal',
      'less_than',
      'less_than_equal',
      'between',
      'empty',
      'not_empty'
    ])
    let inputElm = wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId(`${NAME.NUMBERTYPE}-number0`, 'id'))
    const inputWrapper = inputElm.find('input')
    const nativeInput = inputWrapper.element
    expect(inputElm.exists()).toBe(true)
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toEqual({})
    await new Promise(resolve => setTimeout(resolve, 100))
    inputElm = wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId(`${NAME.NUMBERTYPE}-number0`, 'id'))
    expect(inputElm.classes()).toContain('ERFILTER-ERROR')
    nativeInput.value = '1'
    await inputWrapper.trigger('input')
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toMatchSnapshot()
  })
  test('operator: "style=range" && value is not empty', async () => {
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find('.Everright-filter-TriggerComponent').trigger('click')
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-node')[0].click()
    await nextTick()
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-menu')[1].querySelectorAll('.el-cascader-node')[6].click()
    await flushPromises()
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId('operator', 'id')).trigger('click')
    const selectOptions = getSelectOptions(utils.getTestId('operator-popperClass', 'id'))
    selectOptions[6].click()
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toEqual({})
    await new Promise(resolve => setTimeout(resolve, 100))
    const number0Elm = wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId(`${NAME.NUMBERTYPE}-number0`, 'id'))
    const number1Elm = wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId(`${NAME.NUMBERTYPE}-number1`, 'id'))
    expect(number0Elm.classes()).toContain('ERFILTER-ERROR')
    expect(number1Elm.classes()).toContain('ERFILTER-ERROR')
    number0Elm.find('input').element.value = '10'
    await number0Elm.find('input').trigger('input')
    number1Elm.find('input').element.value = '20'
    await number1Elm.find('input').trigger('input')
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toMatchSnapshot()
  })
})
