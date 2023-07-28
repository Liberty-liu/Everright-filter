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
  })
  test.only('method: pushData', async () => {
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
})
