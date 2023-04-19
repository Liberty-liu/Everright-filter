<script>
import { ref, computed, nextTick, reactive, inject, unref, watch, toRefs } from 'vue'
import _ from 'lodash-es'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import NAME from '@ER/filter/name.js'
import hooks from '@ER/hooks'
export default {
  name: NAME.NUMBERTYPE,
  inheritAttrs: false
}
</script>
<script setup>
const props = defineProps(['id', 'operatorStyle', 'params', 'property'])
const ER = inject('Everright')
const element = ref()
const ns = hooks.useNamespace(NAME.NUMBERTYPE)
const state = reactive({
  loading: true,
  value0: null,
  value1: null
})
const isRange = computed(() => {
  return props.operatorStyle === 'range'
})
const {
  getData,
  setData,
  clearData,
  v$
} = hooks.useCommon(NAME.NUMBERTYPE, {
  ...toRefs(state),
  isRange,
  ...toRefs(props)
})
// } = hooks.useCommon(NAME.NUMBERTYPE, state, {
//   isRange,
//   props: props
// })
defineExpose({
  getData,
  setData,
  clearData
})
</script>
<template>
  <el-input-number
    :class="[ns.e('width'), v$.value0.$error && ER.props.isShowValidateState && 'ERFILTER-ERROR', isRange && ns.is('range') ]"
    @blur="v$.value0.$touch()"
    v-model="state.value0"
    :max="params.max"
    :min="params.min"
    :step="params.step"
    :precision="params.precision"
    controls-position="right"/>
  <template v-if="isRange">
    <div>-</div>
    <el-input-number
      @blur="v$.value1.$touch()"
      :class="[ns.e('width'), v$.value1.$error && ER.props.isShowValidateState && 'ERFILTER-ERROR', isRange && ns.is('range') ]"
      v-model="state.value1"
      :max="params.max"
      :min="params.min"
      :step="params.step"
      :precision="params.precision"
      controls-position="right"/>
  </template>
</template>
