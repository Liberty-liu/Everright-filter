import { describe, assert, expect, test, beforeEach, afterEach, beforeAll, vi } from 'vitest'
import { flushPromises, config, DOMWrapper } from '@vue/test-utils'
import optionData from '@ER-server/routes/Filter/data/options.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import NAME from '@ER/filter/name.js'
import utils from '@ER/utils'
import { nextTick } from 'vue'
import { getSelectOptions, _mount } from './utils.js'
config.global.components.Delete = ElementPlusIconsVue.Delete
config.global.components.Calendar = ElementPlusIconsVue.Calendar
const getOptions = async () => {
  return new Promise((resolve, reject) => {
    resolve({
      data: optionData
    })
  })
}
describe('renderType: DATE', () => {
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
  test('Default full function', async () => {
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find('.Everright-filter-TriggerComponent').trigger('click')
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-node')[0].click()
    await nextTick()
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-menu')[1].querySelectorAll('.el-cascader-node')[9].click()
    await flushPromises()
    expect(wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId('dateOperator', 'id')).exists()).toBe(true)
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
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId('dateOperator', 'id')).trigger('click')
    expect(getSelectOptions(utils.getTestId('dateOperator-popperClass', 'id')).map(e => utils.getAttrs(e).value)).toEqual(['date', 'year', 'month', 'day'])
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find('.Everright-filter-DateComponent__button').trigger('click')
    const shortcuts = Array.from(document.querySelector(utils.getTestId(`${NAME.DATECOMPONENT}-popperClass`, 'id')).querySelector('.Everright-filter-DateComponent__shortcuts').querySelectorAll('button')).map(e => utils.getAttrs(e).value)
    expect(shortcuts).toEqual([
      '- 0 days/- 0 days',
      '- 0 weeks/- 0 weeks',
      '- 0 months/- 0 months',
      '- 0 years/- 0 years',
      'release_time/- 0 days',
      '- 1 days/- 1 days',
      '- 1 weeks/- 1 weeks',
      '- 1 months/- 1 months',
      '- 1 years/- 1 years'
    ])
    const manuals = Array.from(document.querySelector(utils.getTestId(`${NAME.DATECOMPONENT}-popperClass`, 'id')).querySelector('.Everright-filter-DateComponent__manuals').querySelectorAll('.Everright-filter-DayHourComponent')).map(e => utils.getAttrs(e).value)
    expect(manuals).toEqual(['intervalBefore', 'afterBefore', 'erenowBefore', 'intervalBetween'])
    document.querySelector(utils.getTestId(`${NAME.DATECOMPONENT}-popperClass`, 'id')).querySelector('.Everright-filter-DateComponent__absolute button').click()
    await nextTick()
    const datePickerEl = wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId(`${NAME.DATECOMPONENT}-picker`, 'id'))
    datePickerEl.find('.el-input__inner').setValue('2023-07-28')
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toMatchSnapshot()
    document.querySelector(utils.getTestId(`${NAME.DATECOMPONENT}-popperClass`, 'id')).querySelector('.Everright-filter-DateComponent__absolute button').click()
    await nextTick()
    document.querySelector(utils.getTestId(`${NAME.DATECOMPONENT}-popperClass`, 'id')).querySelector('.Everright-filter-DateComponent__shortcuts').querySelectorAll('button')[0].click()
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toMatchSnapshot()
    document.querySelector(utils.getTestId(`${NAME.DATECOMPONENT}-popperClass`, 'id')).querySelector('.Everright-filter-DateComponent__absolute button').click()
    await nextTick()
    const intervalBeforeEl = new DOMWrapper(document.querySelector(utils.getTestId(`${NAME.DATECOMPONENT}-popperClass`, 'id')).querySelector('.Everright-filter-DateComponent__manuals').querySelectorAll('.Everright-filter-DayHourComponent')[0].querySelector('.el-input__inner'))
    intervalBeforeEl.setValue('2')
    await nextTick()
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toMatchSnapshot()
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId('dateOperator', 'id')).trigger('click')
    getSelectOptions(utils.getTestId('dateOperator-popperClass', 'id'))[1].click()
    await nextTick()
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toEqual({})
    await new Promise(resolve => setTimeout(resolve, 100))
    const selectElm = wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId(`${NAME.DATETYPE}-start`, 'id'))
    expect(selectElm.classes()).toContain('ERFILTER-ERROR')
    getSelectOptions(utils.getTestId(`${NAME.DATETYPE}-start-popperClass`, 'id')).filter(e => utils.getAttrs(e).value === 2023)[0].click()
    await nextTick()
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toMatchSnapshot()
    getSelectOptions(utils.getTestId('operator-popperClass', 'id'))[6].click()
    await nextTick()
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toEqual({})
    await new Promise(resolve => setTimeout(resolve, 100))
    const startElm = wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId(`${NAME.DATETYPE}-start`, 'id'))
    const endElm = wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId(`${NAME.DATETYPE}-end`, 'id'))
    expect(startElm.classes()).toContain('ERFILTER-ERROR')
    expect(endElm.classes()).toContain('ERFILTER-ERROR')
    getSelectOptions(utils.getTestId(`${NAME.DATETYPE}-start-popperClass`, 'id')).filter(e => utils.getAttrs(e).value === 2022)[0].click()
    await nextTick()
    getSelectOptions(utils.getTestId(`${NAME.DATETYPE}-end-popperClass`, 'id')).filter(e => utils.getAttrs(e).value === 2023)[0].click()
    await nextTick()
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toMatchSnapshot()
  })
  test('Default full function && operator: "style=none"', async () => {
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find('.Everright-filter-TriggerComponent').trigger('click')
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-node')[0].click()
    await nextTick()
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-menu')[1].querySelectorAll('.el-cascader-node')[9].click()
    await flushPromises()
    expect(wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId('dateOperator', 'id')).exists()).toBe(true)
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId('operator', 'id')).trigger('click')
    const selectOptions = getSelectOptions(utils.getTestId('operator-popperClass', 'id'))
    selectOptions[7].click()
    await nextTick()
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toMatchSnapshot()
  })
  test('Exclude equal and date operators (date)', async () => {
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find('.Everright-filter-TriggerComponent').trigger('click')
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-node')[0].click()
    await nextTick()
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-menu')[1].querySelectorAll('.el-cascader-node')[13].click()
    await flushPromises()
    expect(wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId('dateOperator', 'id')).exists()).toBe(true)
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId('operator', 'id')).trigger('click')
    expect(getSelectOptions(utils.getTestId('operator-popperClass', 'id')).map(e => utils.getAttrs(e).value)).toEqual([
      'not_equal',
      'greater_than',
      'greater_than_equal',
      'less_than',
      'less_than_equal',
      'between',
      'empty',
      'not_empty'
    ])
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId('dateOperator', 'id')).trigger('click')
    expect(getSelectOptions(utils.getTestId('dateOperator-popperClass', 'id')).map(e => utils.getAttrs(e).value)).toEqual(['year', 'month', 'day'])
    await nextTick()
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toEqual({})
    await new Promise(resolve => setTimeout(resolve, 100))
    const selectElm = wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId(`${NAME.DATETYPE}-start`, 'id'))
    expect(selectElm.classes()).toContain('ERFILTER-ERROR')
    getSelectOptions(utils.getTestId(`${NAME.DATETYPE}-start-popperClass`, 'id')).filter(e => utils.getAttrs(e).value === 2023)[0].click()
    await nextTick()
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toMatchSnapshot()
  })
  test('only Exact Date', async () => {
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find('.Everright-filter-TriggerComponent').trigger('click')
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-node')[0].click()
    await nextTick()
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-menu')[1].querySelectorAll('.el-cascader-node')[14].click()
    await flushPromises()
    const datePickerEl = wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId(`${NAME.DATECOMPONENT}-picker`, 'id'))
    expect(datePickerEl.exists()).toBe(true)
    datePickerEl.find('.el-input__inner').setValue('2023-07-28')
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toMatchSnapshot()
  })
  test('dates', async () => {
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find('.Everright-filter-TriggerComponent').trigger('click')
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-node')[0].click()
    await nextTick()
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-menu')[1].querySelectorAll('.el-cascader-node')[15].click()
    await flushPromises()
    const datePickerEl = wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId(`${NAME.DATECOMPONENT}-picker`, 'id'))
    expect(datePickerEl.exists()).toBe(true)
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toMatchSnapshot()
  })
})
