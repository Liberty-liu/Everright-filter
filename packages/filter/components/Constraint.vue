<script>
import { ref, computed, nextTick, reactive, inject, watch, provide, toRefs } from 'vue'
import _ from 'lodash-es'
import hooks from '@ER/hooks'
import NAME from '@ER/filter/name.js'
import DateComponent from './Date.vue'
import PickerComponent from './Picker.vue'
import Item from '../Item.vue'
export default {
  name: NAME.CONSTRAINTCOMPONENT
}
</script>
<script setup>
const props = defineProps(['params', 'id'])
const emit = defineEmits(['update:modelValue'])
const ER = inject('Everright')
const {
  t,
  lang
} = hooks.useI18n()
const ns = hooks.useNamespace(NAME.CONSTRAINTCOMPONENT)
const itemRef = ref()
const timesRef = ref()
const dateRef = ref()
const state = reactive({
  loading: true,
  value0: ['date'],
  value1: '',
  options: []
})
provide('EverrightConstraint', state)
const {
  getData,
  setData
} = hooks.useCommon(NAME.CONSTRAINTCOMPONENT, {
  ...toRefs(state),
  ...toRefs(props),
  itemRef,
  timesRef,
  dateRef
})
defineExpose({
  getData,
  setData
})
const constraintOptionsData = computed(() => {
  const result = [
    {
      value: 'date',
      label: t(`er.${NAME.CONSTRAINTCOMPONENT}.date`),
      disabled: true
    }
  ]

  const constraint = _.get(props, 'params.params.constraint', {})
  if (!_.isEmpty(_.find(constraint, { type: 'times' }))) {
    result.push(
      {
        value: 'times',
        label: t(`er.${NAME.CONSTRAINTCOMPONENT}.times`)
      }
    )
  }
  if (!_.isEmpty(_.find(constraint, { type: 'props' }))) {
    result.push(
      {
        value: 'props',
        label: t(`er.${NAME.CONSTRAINTCOMPONENT}.props`)
      }
    )
  }
  return result
})
const dataParams = computed(() => {
  const constraint = _.get(props, 'params.params.constraint', {})
  let result = {}
  const dataParams = _.find(constraint, { type: 'date' })
  if (!_.isEmpty(dataParams)) {
    result = dataParams
  }
  return result
})
const getRemoteData = () => {
  state.loading = true
  const params = {
    property: props.params.property
  }
  ER.api.getProps(params).then(({ data }) => {
    state.options = data
  }).finally(() => {
    state.loading = false
  })
}
// watch(() => state.value0, (newVal) => {
//   if (newVal.includes('props') && !state.options.length && !_.isEmpty(props.params.params)) {
//     getRemoteData()
//   }
// }, {
//   immediate: true
// })
watch([() => state.value0, () => state.options, () => props.params.params], (newVal) => {
  if (newVal[0].includes('props') && newVal[1].length === 0 && !_.isEmpty(newVal[2])) {
    getRemoteData()
  }
}, {
  immediate: true
})
// const isRender = computed(() => {
//   return !_.isEmpty(props.params.params)
// })
</script>
<template>
  <div :class="[ns.b()]">
    <el-checkbox-group v-model="state.value0">
      <el-checkbox v-for="item in constraintOptionsData" :key="item.value" :label="item.value" :disabled="item.disabled">
        {{ item.label }}
      </el-checkbox>
    </el-checkbox-group>
    <div :class="[ns.e('content')]">
      <TransitionGroup name="el-fade-in">
        <div v-if="state.value0.includes('date')">
          <div :class="[ns.e('contentLabel')]">{{constraintOptionsData[0].label}}</div>
          <div :class="[ns.e('item')]">
            <DateComponent
              :id="id"
              ref="dateRef"
              :isShowSwitchButton="true"
              :isRange="true"
              :isConstraint="true"
              defaultValue="intervalBefore"
              :params="dataParams"
            />
          </div>
        </div>
        <div v-if="state.value0.includes('times') && constraintOptionsData[1]">
          <div :class="[ns.e('contentLabel')]">{{constraintOptionsData[1].label}}</div>
          <div>
            <PickerComponent
              :id="id"
              sign="times"
              ref="timesRef"
              :parent="[]"
              :isConstraint="true"
            />
          </div>
        </div>
        <div v-if="state.value0.includes('props') && constraintOptionsData[2]" v-loading="state.loading">
          <div :class="[ns.e('contentLabel')]">{{constraintOptionsData[2].label}}</div>
          <div v-if="!state.loading">
            <Item
              :id="id"
              ref="itemRef"
            >
            </Item>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>
