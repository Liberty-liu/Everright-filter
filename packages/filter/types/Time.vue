<script>
import { ref, computed, nextTick, reactive, inject, unref, watch, toRefs } from 'vue'
import _ from 'lodash-es'
import NAME from '@ER/filter/name.js'
import hooks from '@ER/hooks'
import utils from '@ER/utils'
export default {
  name: NAME.TIMETYPE,
  inheritAttrs: false
}
</script>
<script setup>
const isTest = import.meta.env.MODE === 'test'
const props = defineProps(['id', 'operatorStyle', 'params', 'property'])
const ER = inject('Everright')
const {
  t,
  lang
} = hooks.useI18n()
const element = ref()
const state = reactive({
  value0: '',
  isChanged: true
})
const ns = hooks.useNamespace(NAME.TIMETYPE)
const isRange = computed(() => {
  return props.operatorStyle === 'range'
})
watch(isRange, (newVal) => {
  state.value0 = newVal ? [] : ''
  state.isChanged = false
  nextTick(() => {
    state.isChanged = true
  })
})
const {
  getData,
  setData,
  clearData,
  v$
} = hooks.useCommon(NAME.TIMETYPE, {
  ...toRefs(state),
  ...toRefs(props),
  isRange
})
defineExpose({
  getData,
  setData,
  clearData
})
</script>
<template>
  <el-time-picker
    :class="[ns.e('width'), v$.value0.$error && ER.props.isShowValidateState && 'ERFILTER-ERROR', utils.addTestId(`${NAME.TIMETYPE}-picker`, 'id') ]"
    :popperClass="utils.addTestId(`${NAME.TIMETYPE}-popperClass`, 'id')"
    v-if="state.isChanged"
    :is-range="isRange"
    v-model="state.value0"
    :format="params.format || 'HH:mm'"
    :arrow-control="!isTest"
    :placeholder="t('er.public.select')"
    :valueFormat="params.format"
  />
</template>
