import { describe, assert, expect, test, beforeEach, afterEach, beforeAll, vi } from 'vitest'
import { flushPromises, config } from '@vue/test-utils'
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
describe('renderType: TEXT', () => {
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
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toMatchSnapshot()
  })
  test('operator: "style=one_of" && value is not empty', async () => {
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find('.Everright-filter-TriggerComponent').trigger('click')
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-node')[0].click()
    await nextTick()
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-menu')[1].querySelectorAll('.el-cascader-node')[5].click()
    await flushPromises()
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId('operator', 'id')).trigger('click')
    const selectOptions = getSelectOptions(utils.getTestId('operator-popperClass', 'id'))
    expect(selectOptions.map(e => utils.getAttrs(e).value)).toEqual([
      'equal',
      'one_of',
      'not_equal',
      'contains',
      'not_contain',
      'empty',
      'not_empty'
    ])
    selectOptions[1].click()
    await nextTick()
    let selectElm = wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId(`${NAME.TEXTTYPE}-select`, 'id'))
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toEqual({})
    await new Promise(resolve => setTimeout(resolve, 100))
    selectElm = wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId(`${NAME.TEXTTYPE}-select`, 'id'))
    expect(selectElm.classes()).toContain('ERFILTER-ERROR')
    const inputWrapper = selectElm.find('.el-select__input')
    const selectInputEl = inputWrapper.element
    selectInputEl.value = '1'
    await new Promise(resolve => setTimeout(resolve, 100))
    await inputWrapper.trigger('input')
    getSelectOptions(utils.getTestId(`${NAME.TEXTTYPE}-select-popperClass`, 'id'))[0].click()
    await nextTick()
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toMatchSnapshot()
  })
  test('operator: "style=none"', async () => {
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find('.Everright-filter-TriggerComponent').trigger('click')
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-node')[0].click()
    await nextTick()
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-menu')[1].querySelectorAll('.el-cascader-node')[5].click()
    await flushPromises()
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId('operator', 'id')).trigger('click')
    const selectOptions = getSelectOptions(utils.getTestId('operator-popperClass', 'id'))
    selectOptions[5].click()
    await nextTick()
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toMatchSnapshot()
  })
  test('Modifying operators of the same type do not modify values', async () => {
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
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId('operator', 'id')).trigger('click')
    const selectOptions = getSelectOptions(utils.getTestId('operator-popperClass', 'id'))
    selectOptions[2].click()
    await nextTick()
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toMatchSnapshot()
  })
  test('Modifying the operatorStyle from none to tags', async () => {
    wrapper.findComponent({ ref: 'ERfilterRef' }).vm.setData({
      filters: [{
        conditions: [
          {
            operator: 'empty',
            property: 'text'
          }
        ],
        logicalOperator: 'and'
      }],
      logicalOperator: 'and'
    })
    await new Promise(resolve => setTimeout(resolve, 100))
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId('operator', 'id')).trigger('click')
    const selectOptions = getSelectOptions(utils.getTestId('operator-popperClass', 'id'))
    expect(selectOptions.map(e => utils.getAttrs(e).value)).toEqual([
      'equal',
      'one_of',
      'not_equal',
      'contains',
      'not_contain',
      'empty',
      'not_empty'
    ])
    selectOptions[1].click()
    await nextTick()
    let selectElm = wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId(`${NAME.TEXTTYPE}-select`, 'id'))
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toEqual({})
    await new Promise(resolve => setTimeout(resolve, 100))
    selectElm = wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId(`${NAME.TEXTTYPE}-select`, 'id'))
    expect(selectElm.classes()).toContain('ERFILTER-ERROR')
    const inputWrapper = selectElm.find('.el-select__input')
    const selectInputEl = inputWrapper.element
    selectInputEl.value = '1'
    await new Promise(resolve => setTimeout(resolve, 100))
    await inputWrapper.trigger('input')
    getSelectOptions(utils.getTestId(`${NAME.TEXTTYPE}-select-popperClass`, 'id'))[0].click()
    await nextTick()
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toMatchSnapshot()
  })
})
