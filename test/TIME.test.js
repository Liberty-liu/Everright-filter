import { describe, assert, expect, test, beforeEach, afterEach, beforeAll, vi } from 'vitest'
import { flushPromises, config } from '@vue/test-utils'
import optionData from '@ER-server/routes/Filter/data/options.js'
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
describe('renderType: TIME', () => {
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
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-menu')[1].querySelectorAll('.el-cascader-node')[7].click()
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
    await nextTick()
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toEqual({})
    await new Promise(resolve => setTimeout(resolve, 100))
    const timeElm = wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId(`${NAME.TIMETYPE}-picker`, 'id'))
    expect(timeElm.classes()).toContain('ERFILTER-ERROR')
    await timeElm.find('input').trigger('input')
    timeElm.find('input').trigger('blur')
    timeElm.find('input').trigger('focus')
    await nextTick()
    const [hoursEl, minutesEl] = document.querySelectorAll(`${utils.getTestId(`${NAME.TIMETYPE}-popperClass`, 'id')} .el-time-spinner__list`)
    hoursEl.querySelectorAll('.el-time-spinner__item')[4].click()
    await nextTick()
    minutesEl.querySelectorAll('.el-time-spinner__item')[36].click()
    await nextTick()
    document.querySelector(utils.getTestId(`${NAME.TIMETYPE}-popperClass`, 'id')).querySelector('.el-time-panel__btn.confirm').click()
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toMatchSnapshot()
  })
  test('operator: "style=range" && value is not empty', async () => {
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find('.Everright-filter-TriggerComponent').trigger('click')
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-node')[0].click()
    await nextTick()
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-menu')[1].querySelectorAll('.el-cascader-node')[7].click()
    await flushPromises()
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId('operator', 'id')).trigger('click')
    const selectOptions = getSelectOptions(utils.getTestId('operator-popperClass', 'id'))
    selectOptions[6].click()
    await nextTick()
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toEqual({})
    await new Promise(resolve => setTimeout(resolve, 100))
    const timeElm = wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId(`${NAME.TIMETYPE}-picker`, 'id'))
    expect(timeElm.classes()).toContain('ERFILTER-ERROR')
    await timeElm.find('input').trigger('input')
    timeElm.find('input').trigger('blur')
    timeElm.find('input').trigger('focus')
    await nextTick()
    const [
      startHoursEl,
      startMinutesEl,
      endHoursEl,
      endMinutesEl] = document.querySelectorAll(`${utils.getTestId(`${NAME.TIMETYPE}-popperClass`, 'id')} .el-time-spinner__list`)
    startHoursEl.querySelectorAll('.el-time-spinner__item')[4].click()
    await nextTick()
    startMinutesEl.querySelectorAll('.el-time-spinner__item')[36].click()
    await nextTick()
    endHoursEl.querySelectorAll('.el-time-spinner__item')[5].click()
    await nextTick()
    endMinutesEl.querySelectorAll('.el-time-spinner__item')[36].click()
    await nextTick()
    await nextTick()
    document.querySelector(utils.getTestId(`${NAME.TIMETYPE}-popperClass`, 'id')).querySelector('.el-time-panel__btn.confirm').click()
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toMatchSnapshot()
  })
  test('operator: "style=none"', async () => {
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find('.Everright-filter-TriggerComponent').trigger('click')
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-node')[0].click()
    await nextTick()
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-menu')[1].querySelectorAll('.el-cascader-node')[7].click()
    await flushPromises()
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId('operator', 'id')).trigger('click')
    const selectOptions = getSelectOptions(utils.getTestId('operator-popperClass', 'id'))
    selectOptions[7].click()
    await nextTick()
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toMatchSnapshot()
  })
  test('Modifying the operatorStyle from range to none', async () => {
    wrapper.findComponent({ ref: 'ERfilterRef' }).vm.setData({
      filters: [{
        conditions: [
          {
            operator: 'between',
            property: 'time1',
            value: [
              '17:30:00',
              '18:30:00'
            ]
          }
        ],
        logicalOperator: 'and'
      }],
      logicalOperator: 'and'
    })
    await new Promise(resolve => setTimeout(resolve, 100))
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId('operator', 'id')).trigger('click')
    const selectOptions = getSelectOptions(utils.getTestId('operator-popperClass', 'id'))
    selectOptions[7].click()
    await nextTick()
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toMatchSnapshot()
  })
  test('Modifying the operatorStyle from none to range', async () => {
    wrapper.findComponent({ ref: 'ERfilterRef' }).vm.setData({
      filters: [{
        conditions: [
          {
            operator: 'empty',
            property: 'time0'
          }
        ],
        logicalOperator: 'and'
      }],
      logicalOperator: 'and'
    })
    await new Promise(resolve => setTimeout(resolve, 100))
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId('operator', 'id')).trigger('click')
    const selectOptions = getSelectOptions(utils.getTestId('operator-popperClass', 'id'))
    selectOptions[6].click()
    await nextTick()
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toEqual({})
    await new Promise(resolve => setTimeout(resolve, 100))
    const timeElm = wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId(`${NAME.TIMETYPE}-picker`, 'id'))
    expect(timeElm.classes()).toContain('ERFILTER-ERROR')
    await timeElm.find('input').trigger('input')
    timeElm.find('input').trigger('blur')
    timeElm.find('input').trigger('focus')
    await nextTick()
    const [
      startHoursEl,
      startMinutesEl,
      endHoursEl,
      endMinutesEl] = document.querySelectorAll(`${utils.getTestId(`${NAME.TIMETYPE}-popperClass`, 'id')} .el-time-spinner__list`)
    startHoursEl.querySelectorAll('.el-time-spinner__item')[4].click()
    await nextTick()
    startMinutesEl.querySelectorAll('.el-time-spinner__item')[36].click()
    await nextTick()
    endHoursEl.querySelectorAll('.el-time-spinner__item')[5].click()
    await nextTick()
    endMinutesEl.querySelectorAll('.el-time-spinner__item')[36].click()
    await nextTick()
    await nextTick()
    document.querySelector(utils.getTestId(`${NAME.TIMETYPE}-popperClass`, 'id')).querySelector('.el-time-panel__btn.confirm').click()
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toMatchSnapshot()
  })
  test.only('Modifying operators of the same type do not modify values', async () => {
    wrapper.findComponent({ ref: 'ERfilterRef' }).vm.setData({
      filters: [{
        conditions: [
          {
            operator: 'equal',
            property: 'time0',
            value: '04:36'
          }
        ],
        logicalOperator: 'and'
      }],
      logicalOperator: 'and'
    })
    await new Promise(resolve => setTimeout(resolve, 100))
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId('operator', 'id')).trigger('click')
    const selectOptions = getSelectOptions(utils.getTestId('operator-popperClass', 'id'))
    selectOptions[2].click()
    await nextTick()
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toMatchSnapshot()
  })
})
