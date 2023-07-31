<script>
import { ref, computed, nextTick, reactive, inject, defineExpose, defineComponent, watch } from 'vue'
import _ from 'lodash-es'
import hooks from '@ER/hooks'
import NAME from '@ER/filter/name.js'
export default {
  name: NAME.DayHourComponent,
  inheritAttrs: import.meta.env.MODE === 'test'
}
</script>
<script setup>
// default type: 1  1 = day 2 = hour 3 = day、hour
const props = defineProps(['modelValue', 'type', 'prependLabel', 'appendLabel', 'isRange'])
const emit = defineEmits(['update:modelValue', 'change'])
const ER = inject('Everright')
const ns = hooks.useNamespace('DayHourComponent')
const {
  t,
  lang
} = hooks.useI18n()
const state = reactive({
  visible: true,
  value0: null,
  value1: null,
  value2: 1,
  value3: 1
})
const options = computed(() => {
  return [
    {
      label: t('er.public.days').slice(0, 1),
      value: 1
    },
    {
      label: t('er.public.hours').slice(0, 1),
      value: 2
    }
  ]
})
const initialValue = (isRange) => {
  const result = {}
  if (isRange) {
    result.value = [
      null,
      null
    ]
  } else {
    result.value = null
  }
  switch (props.type) {
    case 1:
      result.type = 1
      break
    case 2:
      result.type = 2
      break
    case 3:
      result.type = 1
      break
  }
  return result
}
if (props.isRange) {
  emit('update:modelValue', initialValue(true))
} else {
  emit('update:modelValue', initialValue())
}
watch(() => props.modelValue, (val, oldVal) => {
  const newVal = val || initialValue(props.isRange)
  if (props.isRange) {
    state.value0 = newVal.value[0]
    state.value1 = newVal.value[1]
    state.value2 = state.value3 = newVal.type
  } else {
    state.value0 = newVal.value
    state.value2 = newVal.type
  }
}, {
  deep: true
})
const handleEvent = (type, val) => {
  const result = {}
  if (props.isRange) {
    if (type === 'select') {
      state.value2 = state.value3 = val
    }
    result.value = [state.value0, state.value1].sort((a, b) => a - b)
    if (result.value[0] === null || result.value[1] === null) {
      return false
    }
  } else {
    result.value = state.value0
    if (result.value === null) {
      return false
    }
  }
  result.type = state.value2
  emit('update:modelValue', result)
  emit('change', result)
}
</script>
<template>
  <div :class="[ns.b()]">
    <div :class="[ns.e('content')]">
      <span :class="[ns.e('prependLabel')]" v-if="prependLabel">{{ prependLabel }}</span>
      <div :class="[ns.e('wrap')]">
        <el-input-number
          v-model="state.value0"
          :min="1"
          :controls="false"
          @change="(val) => handleEvent('input', val)"
        />
        <span v-if="type === 1" :class="[ns.e('suffix')]">{{ t('er.public.days') }}</span>
        <span v-else-if="type === 2" :class="[ns.e('suffix')]">{{ t('er.public.hours') }}</span>
        <el-select
          v-else
          v-model="state.value2"
          :teleported="false"
          @change="(val) => handleEvent('select', val)"
          :class="[ns.e('suffix')]">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <span :class="[ns.e('appendLabel')]" v-if="appendLabel">{{ appendLabel }}</span>
    </div>
   <template v-if="isRange">
     <div style="padding: 10px 11px;">-</div>
     <div :class="[ns.e('content')]">
       <span :class="[ns.e('prependLabel')]" v-if="prependLabel">{{ prependLabel }}</span>
       <div :class="[ns.e('wrap')]">
         <el-input-number
           v-model="state.value1"
           :min="1"
           :controls="false"
           @change="(val) => handleEvent('input', val)"
         />
         <span v-if="type === 1" :class="[ns.e('suffix')]">{{ t('er.public.days') }}</span>
         <span v-else-if="type === 2" :class="[ns.e('suffix')]">{{ t('er.public.hours') }}</span>
         <el-select
           v-else
           v-model="state.value3"
           :teleported="false"
           @change="(val) => handleEvent('select', val)"
           :class="[ns.e('suffix')]">
           <el-option
             v-for="item in options"
             :key="item.value"
             :label="item.label"
             :value="item.value">
           </el-option>
         </el-select>
       </div>
       <span :class="[ns.e('appendLabel')]" v-if="appendLabel">{{ appendLabel }}</span>
     </div>
   </template>
  </div>
</template>
