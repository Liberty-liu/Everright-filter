<script>
import { ref, computed, nextTick, reactive, inject, defineExpose, defineComponent, unref, watch, toRefs, onMounted } from 'vue'
import _ from 'lodash-es'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import DayHourComponent from './DayHour.vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import NAME from '@ER/filter/name.js'
import hooks from '@ER/hooks'
export default {
  name: NAME.DATECOMPONENT
}
</script>
<script setup>
const props = defineProps(['isRange', 'params', 'isShowSwitchButton', 'defaultValue', 'id', 'isConstraint'])
const ER = inject('Everright')
const ns = hooks.useNamespace(NAME.DATECOMPONENT)
const staticDateRef = ref()
const state = reactive({
  hasToday: 1,
  isShowIncludeToday: false,
  absolute: false,
  staticDate: '',
  dynamicDate: {
    shortcut: '',
    intervalBefore: '',
    afterBefore: '',
    erenowBefore: '',
    intervalBetween: ''
  }
})
const buttonRef = ref()
const popoverRef = ref()
watch(() => props.isRange, (newVal) => {
  if (!props.isShowSwitchButton) {
    state.absolute = newVal
  }
}, {
  immediate: true
})
const shortcutsData = [
  {
    label: '今日',
    en_label: 'Today',
    active: false,
    value: '- 0 days/- 0 days',
    key: 'today_today'
  },
  {
    label: '本周',
    en_label: 'This Week',
    active: false,
    value: '- 0 weeks/- 0 weeks',
    key: 'today_thisWeek'
  },
  {
    label: '本月',
    en_label: 'This Month',
    active: false,
    value: '- 0 months/- 0 months',
    key: 'today_thisMonth'
  },
  {
    label: '今年',
    en_label: 'This Year',
    active: false,
    value: '- 0 years/- 0 years',
    key: 'today_thisYear'
  },
  {
    label: '上线至今',
    en_label: 'Released So Far',
    active: false,
    value: 'release_time/- 0 days',
    key: 'yesterday_onlineToday'
  },
  {
    label: '昨日',
    en_label: 'Yesterday',
    active: false,
    value: '- 1 days/- 1 days',
    key: 'yesterday_yesterday'
  },
  {
    label: '上周',
    en_label: 'Last Week',
    active: false,
    value: '- 1 weeks/- 1 weeks',
    key: 'yesterday_lastWeek'
  },
  {
    label: '上月',
    en_label: 'Last Month',
    active: false,
    value: '- 1 months/- 1 months',
    key: 'yesterday_lastMonth'
  },
  {
    label: '去年',
    en_label: 'Last Year',
    active: false,
    value: '- 1 years/- 1 years',
    key: 'yesterday_lastYear'
  }
]
const manualsData = ['intervalBefore', 'afterBefore', 'erenowBefore', 'intervalBetween']
const shortcuts = computed(() => {
  const excludeShortcuts = _.get(unref(props.params), 'datePanel.excludeShortcuts', [])
  return shortcutsData.map((e) => {
    e.active = state.dynamicDate.shortcut === e.value
    return e
  }).filter((e) => excludeShortcuts.indexOf(e.key) === -1)
})
const manuals = computed(() => {
  const excludeManuals = _.get(unref(props.params), 'datePanel.excludeManuals', [])
  return manualsData.filter((e) => excludeManuals.indexOf(e) === -1)
})
const manualType = computed(() => {
  return _.get(unref(props.params), 'datePanel.manualType', 3)
})
const dynamicDateSuffix = (type) => {
  return type === 1 ? '天' : '时'
}
const buttonText = computed(() => {
  let result = '请选择...'
  if (state.absolute) {
    result = '绝对时间'
  } else {
    const dynamicDate = state.dynamicDate
    for (const key in dynamicDate) {
      if (key === 'shortcut') {
        if (dynamicDate[key]) {
          result = _.find(unref(shortcuts), { value: dynamicDate.shortcut }).label
        }
      } else {
        if (dynamicDate[key].value) {
          switch (key) {
            case 'intervalBefore':
              result = `过去 ${dynamicDate[key].value} ${dynamicDateSuffix(dynamicDate[key].type)}`
              break
            case 'afterBefore':
              result = `未来 ${dynamicDate[key].value} ${dynamicDateSuffix(dynamicDate[key].type)}`
              break
            case 'erenowBefore':
              result = `${dynamicDate[key].value} ${dynamicDateSuffix(dynamicDate[key].type)} 前`
              break
            case 'intervalBetween':
              if (dynamicDate[key].value.every(e => e !== null)) {
                result = `过去 ${dynamicDate[key].value[0]} - ${dynamicDate[key].value[1]} ${dynamicDateSuffix(dynamicDate[key].type)}`
              }
              break
          }
        }
      }
    }
  }
  return result
})

const handleEvent = (type, item, isAuto = true) => {
  if (type === 'shortcuts') {
    state.dynamicDate.shortcut = item.value
    unref(popoverRef) && unref(popoverRef).hide()
    reset('shortcut')
  } else if (type === 'staticDate') {
    state.absolute = true
    unref(popoverRef).hide()
    if (isAuto) {
      nextTick(() => {
        unref(staticDateRef).focus()
      })
    }
    reset('staticDate')
  } else {
    reset(type)
  }
  if (/^(intervalBefore|afterBefore)$/.test(type)) {
    state.isShowIncludeToday = state.dynamicDate[type].type === 1
    state.hasToday = 1
  } else {
    state.isShowIncludeToday = false
  }
}
const reset = (excludeKey) => {
  // if (/^(view)$/.test(excludeKey)) {}
  for (const key in state.dynamicDate) {
    if (key !== excludeKey) {
      state.dynamicDate[key] = ''
    }
  }
  if (excludeKey !== 'staticDate') {
    state.absolute = false
    state.staticDate = ''
  }
}
const {
  getData,
  setData,
  clearData,
  v$
} = hooks.useCommon(NAME.DATECOMPONENT, {
  ...toRefs(state),
  ...toRefs(props),
  buttonText,
  shortcuts,
  handleEvent
})
defineExpose({
  getData,
  setData,
  clearData
})
if (_.isEmpty(ER.state.remoteData)) {
  onMounted(() => {
    if (props.defaultValue) {
      state.dynamicDate.intervalBefore.value = 90
    }
  })
}
</script>
<template>
  <el-popover
    placement="bottom"
    :width="720"
    ref="popoverRef"
    trigger="click"
    :virtual-ref="buttonRef"
    virtual-triggering
  >
    <div :class="[ns.e('shortcuts')]">
      <el-button
        @click="() => handleEvent('shortcuts', item)"
        :class="[!!item.active && ns.is('active')]"
        v-for="(item, index) in shortcuts"
        :key="index"
        v-show="!item.isShow">
        {{item.label}}
      </el-button>
    </div>
    <div :class="[ns.e('manuals')]">
      <template v-for="item in manuals" :key="item">
        <DayHourComponent
          v-if="item === 'intervalBefore'"
          v-model="state.dynamicDate.intervalBefore"
          @change="() => handleEvent('intervalBefore')"
          prependLabel="过去"
          :type="manualType"/>
        <DayHourComponent
          v-if="item === 'afterBefore'"
          v-model="state.dynamicDate.afterBefore"
          @change="() => handleEvent('afterBefore')"
          prependLabel="未来"
          :type="manualType"/>
        <DayHourComponent
          v-if="item === 'erenowBefore'"
          appendLabel="前"
          v-model="state.dynamicDate.erenowBefore"
          @change="() => handleEvent('erenowBefore')"
          :type="manualType"/>
        <DayHourComponent
          v-if="item === 'intervalBetween'"
          prependLabel="过去"
          :isRange="true"
          v-model="state.dynamicDate.intervalBetween"
          @change="() => handleEvent('intervalBetween')"
          :type="manualType"/>
      </template>
      <div
        :class="[ns.e('includeToday')]"
        v-show="state.isShowIncludeToday">
        <el-checkbox
          v-model="state.hasToday" label="含今天" :true-label="1" :false-label="0" size="large" />
      </div>
    </div>
    <div :class="[ns.e('absolute')]">
      <el-button
        link
        text
        @click="() => handleEvent('staticDate')"
      >
        绝对时间<el-icon><Calendar /></el-icon>
      </el-button>
    </div>
  </el-popover>
  <el-button
    v-if="isShowSwitchButton || !isRange"
    :class="[ns.e('button'), v$.dynamicDate.$error && ER.props.isShowValidateState && 'ERFILTER-ERROR' ]"
    ref="buttonRef">
    {{buttonText}}<el-icon><Calendar /></el-icon>
  </el-button>
  <el-date-picker
    :class="[ns.e('width'), v$.staticDate.$error && ER.props.isShowValidateState && 'ERFILTER-ERROR' ]"
    ref="staticDateRef"
    :type="isRange ? 'daterange' : 'date'"
    v-if="state.absolute"
    clearable
    valueFormat="X"
    v-model="state.staticDate"
  />
</template>
