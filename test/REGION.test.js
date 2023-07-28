import { describe, assert, expect, test, beforeEach, afterEach, beforeAll, vi } from 'vitest'
import { flushPromises, config } from '@vue/test-utils'
import optionData from '@ER-server/routes/Filter/data/options.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import NAME from '@ER/filter/name.js'
import utils from '@ER/utils'
import { nextTick } from 'vue'
import { getSelectOptions, _mount } from './utils.js'
config.global.components.Delete = ElementPlusIconsVue.Delete
config.global.components.ArrowRight = ElementPlusIconsVue.ArrowRight
config.global.components.ArrowDown = ElementPlusIconsVue.ArrowDown
config.global.components.CircleClose = ElementPlusIconsVue.CircleClose
const getOptions = async () => {
  return new Promise((resolve, reject) => {
    resolve({
      data: optionData
    })
  })
}
describe('renderType: REGION', () => {
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
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-menu')[1].querySelectorAll('.el-cascader-node')[4].click()
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
    const regionElm = wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId(`${NAME.REGIONTYPE}`, 'id'))
    expect(regionElm.classes()).toContain('ERFILTER-ERROR')
    await regionElm.trigger('click')
    // expect(document.querySelector(utils.getTestId(`${NAME.REGIONTYPE}-popperClass`, 'id')).style.display).toBe('none')
    expect(document.querySelector(utils.getTestId(`${NAME.REGIONTYPE}-popperClass`, 'id')).querySelectorAll('.el-tab-pane')[0].querySelectorAll('li')[0].querySelector('.el-checkbox').className).not.toContain('is-checked')
    document.querySelector(utils.getTestId(`${NAME.REGIONTYPE}-popperClass`, 'id')).querySelectorAll('.el-tab-pane')[0].querySelectorAll('li')[0].querySelector('.el-checkbox').click()
    await nextTick()
    expect(document.querySelector(utils.getTestId(`${NAME.REGIONTYPE}-popperClass`, 'id')).querySelectorAll('.el-tab-pane')[0].querySelectorAll('li')[0].querySelector('.el-checkbox').className).toContain('is-checked')
    document.querySelector(utils.getTestId(`${NAME.REGIONTYPE}-popperClass`, 'id')).querySelectorAll('.el-tab-pane')[0].querySelectorAll('li')[0].click()
    await nextTick()
    expect(document.querySelector(utils.getTestId(`${NAME.REGIONTYPE}-popperClass`, 'id')).querySelectorAll('.el-tab-pane')[1].querySelectorAll('.el-checkbox.is-disabled').length).toBe(1)
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toMatchSnapshot()
  })
  test('operator: "style=one_of" && value is not empty', async () => {
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find('.Everright-filter-TriggerComponent').trigger('click')
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-node')[0].click()
    await nextTick()
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-menu')[1].querySelectorAll('.el-cascader-node')[4].click()
    await flushPromises()
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId('operator', 'id')).trigger('click')
    const selectOptions = getSelectOptions(utils.getTestId('operator-popperClass', 'id'))
    selectOptions[1].click()
    await nextTick()
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toEqual({})
    await new Promise(resolve => setTimeout(resolve, 100))
    const regionElm = wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId(`${NAME.REGIONTYPE}`, 'id'))
    expect(regionElm.classes()).toContain('ERFILTER-ERROR')
    await regionElm.trigger('click')
    // expect(document.querySelector(utils.getTestId(`${NAME.REGIONTYPE}-popperClass`, 'id')).style.display).toBe('none')
    expect(document.querySelector(utils.getTestId(`${NAME.REGIONTYPE}-popperClass`, 'id')).querySelectorAll('.el-tab-pane')[0].querySelectorAll('li')[0].querySelector('.el-checkbox').className).not.toContain('is-checked')
    document.querySelector(utils.getTestId(`${NAME.REGIONTYPE}-popperClass`, 'id')).querySelectorAll('.el-tab-pane')[0].querySelectorAll('li')[0].querySelector('.el-checkbox').click()
    await nextTick()
    expect(document.querySelector(utils.getTestId(`${NAME.REGIONTYPE}-popperClass`, 'id')).querySelectorAll('.el-tab-pane')[0].querySelectorAll('li')[0].querySelector('.el-checkbox').className).toContain('is-checked')
    document.querySelector(utils.getTestId(`${NAME.REGIONTYPE}-popperClass`, 'id')).querySelectorAll('.el-tab-pane')[0].querySelectorAll('li')[0].click()
    await nextTick()
    expect(document.querySelector(utils.getTestId(`${NAME.REGIONTYPE}-popperClass`, 'id')).querySelectorAll('.el-tab-pane')[1].querySelectorAll('.el-checkbox.is-disabled').length).toBe(1)
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toMatchSnapshot()
  })
  test('operator: "style=none"', async () => {
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find('.Everright-filter-TriggerComponent').trigger('click')
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-node')[0].click()
    await nextTick()
    document.querySelector(utils.getTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')).querySelectorAll('.el-cascader-menu')[1].querySelectorAll('.el-cascader-node')[4].click()
    await flushPromises()
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId('operator', 'id')).trigger('click')
    const selectOptions = getSelectOptions(utils.getTestId('operator-popperClass', 'id'))
    selectOptions[5].click()
    await nextTick()
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toMatchSnapshot()
  })
  test('Modifying the operatorStyle from tags to none', async () => {
    wrapper.findComponent({ ref: 'ERfilterRef' }).vm.setData({
      filters: [{
        conditions: [
          {
            operator: 'one_of',
            property: 'Region',
            value: [
              '110000',
              '120000'
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
    selectOptions[5].click()
    await nextTick()
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toMatchSnapshot()
  })
  test('Modifying the operatorStyle from none to tags', async () => {
    wrapper.findComponent({ ref: 'ERfilterRef' }).vm.setData({
      filters: [{
        conditions: [
          {
            operator: 'empty',
            property: 'Region'
          }
        ],
        logicalOperator: 'and'
      }],
      logicalOperator: 'and'
    })
    await new Promise(resolve => setTimeout(resolve, 100))
    await wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId('operator', 'id')).trigger('click')
    const selectOptions = getSelectOptions(utils.getTestId('operator-popperClass', 'id'))
    selectOptions[1].click()
    await nextTick()
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toEqual({})
    await new Promise(resolve => setTimeout(resolve, 100))
    const regionElm = wrapper.find(utils.getTestId(`${NAME.PICKERCOMPONENT}-0-0`)).find(utils.getTestId(`${NAME.REGIONTYPE}`, 'id'))
    expect(regionElm.classes()).toContain('ERFILTER-ERROR')
    await regionElm.trigger('click')
    // expect(document.querySelector(utils.getTestId(`${NAME.REGIONTYPE}-popperClass`, 'id')).style.display).toBe('none')
    expect(document.querySelector(utils.getTestId(`${NAME.REGIONTYPE}-popperClass`, 'id')).querySelectorAll('.el-tab-pane')[0].querySelectorAll('li')[0].querySelector('.el-checkbox').className).not.toContain('is-checked')
    document.querySelector(utils.getTestId(`${NAME.REGIONTYPE}-popperClass`, 'id')).querySelectorAll('.el-tab-pane')[0].querySelectorAll('li')[0].querySelector('.el-checkbox').click()
    await nextTick()
    expect(document.querySelector(utils.getTestId(`${NAME.REGIONTYPE}-popperClass`, 'id')).querySelectorAll('.el-tab-pane')[0].querySelectorAll('li')[0].querySelector('.el-checkbox').className).toContain('is-checked')
    document.querySelector(utils.getTestId(`${NAME.REGIONTYPE}-popperClass`, 'id')).querySelectorAll('.el-tab-pane')[0].querySelectorAll('li')[0].click()
    await nextTick()
    expect(document.querySelector(utils.getTestId(`${NAME.REGIONTYPE}-popperClass`, 'id')).querySelectorAll('.el-tab-pane')[1].querySelectorAll('.el-checkbox.is-disabled').length).toBe(1)
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData()).toMatchSnapshot()
  })
})
