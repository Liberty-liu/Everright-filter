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
describe('type: matrix', () => {
  let wrapper = {}
  const handleListener = vi.fn()
  beforeAll(() => {
    wrapper = _mount(`
      <everright-filter
        type="matrix"
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
      }, {
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
    await new Promise(resolve => setTimeout(resolve, 1000))
    expect(wrapper.findAll('.Everright-filter-FilterItem')[0].find(utils.getTestId(`${NAME.LOGICALOPERATORCOMPONENT}`)).exists()).toBe(true)
    wrapper.findAll('.Everright-filter-FilterItem')[0].find(utils.getTestId(`${NAME.LOGICALOPERATORCOMPONENT}`)).find('.el-switch__core').trigger('click')
    expect(_.get(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData(), 'filters.0.logicalOperator', 'and')).toBe('or')
    expect(wrapper.find(utils.getTestId(`${NAME.LOGICALOPERATORCOMPONENT}`)).exists()).toBe(true)
    wrapper.find(utils.getTestId(`${NAME.LOGICALOPERATORCOMPONENT}`)).find('.el-switch__core').trigger('click')
    expect(wrapper.findComponent({ ref: 'ERfilterRef' }).vm.getData().logicalOperator).toBe('or')
  })
})
