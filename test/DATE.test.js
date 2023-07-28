import { describe, assert, expect, test, beforeEach, afterEach, beforeAll, vi } from 'vitest'
import { flushPromises, config } from '@vue/test-utils'
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
  test.only('Default full function', async () => {
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
  })
})