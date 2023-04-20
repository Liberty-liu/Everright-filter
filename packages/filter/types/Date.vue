<script>
import { ref, computed, nextTick, reactive, inject, unref, watch, toRefs } from 'vue'
import _ from 'lodash-es'
import { useVuelidate } from '@vuelidate/core'
import { helpers } from '@vuelidate/validators'
import DateComponent from '../components/Date.vue'
import NAME from '@ER/filter/name.js'
import hooks from '@ER/hooks'
export default {
  name: NAME.DATETYPE
}
</script>
<script setup>
const props = defineProps(['id', 'operatorStyle', 'params', 'property', 'dateOperator'])
const ER = inject('Everright')
const ns = hooks.useNamespace(NAME.DATETYPE)
const Datecomponent = ref()
const state = reactive({
  value0: '',
  value1: '',
  isChanged: true,
  Datecomponent
})
const isRange = computed(() => {
  return props.operatorStyle === 'range'
})
watch([isRange, () => props.dateOperator], (newVal) => {
  state.value0 = state.value1 = ''
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
} = hooks.useCommon(NAME.DATETYPE, {
  ...toRefs(state),
  ...toRefs(props),
  isRange
})
const {
  t,
  lang
} = hooks.useI18n()
defineExpose({
  getData,
  setData,
  clearData,
  Datecomponent
})
const options0 = computed(() => {
  let result = []
  if (props.dateOperator !== 'Date') {
    result = new Array(props.dateOperator === 'year' ? new Date().getFullYear() - 1899 : (props.dateOperator === 'month' ? 12 : 31)).fill('').map((e, i) => {
      const key = props.dateOperator === 'year' ? (1900 + i) : (i + 1)
      return {
        label: key,
        value: key
      }
    }).sort((a, b) => props.dateOperator === 'year' ? b.value - a.value : a.value - b.value)
  }
  return result
})
</script>
<template>
  <template v-if="dateOperator === 'date'">
    <DateComponent
      ref="Datecomponent"
      v-if="state.isChanged"
      :isRange="isRange"
      :isShowSwitchButton="!isRange"
      :params="params"
      :id="id"
    />
  </template>
  <template v-else>
    <el-select
      :placeholder="t('er.public.select')"
      v-if="state.isChanged"
      :class="[ns.e('width'), v$.value0.$error && ER.props.isShowValidateState && 'ERFILTER-ERROR', isRange && ns.is('range') ]"
      v-model="state.value0"
      filterable
      clearable
    >
      <el-option
        v-for="item in options0"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
    <template v-if="isRange">
      <span>-</span>
      <el-select
        :placeholder="t('er.public.select')"
        :class="[ns.e('width'), v$.value1.$error && ER.props.isShowValidateState && 'ERFILTER-ERROR', isRange && ns.is('range') ]"
        v-if="state.isChanged"
        v-model="state.value1"
        filterable
        clearable
      >
        <el-option
          v-for="item in options0"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
    </template>
  </template>
</template>
