<script>
import { ref, computed, nextTick, reactive, inject, watch } from 'vue'
import _ from 'lodash-es'
import hooks from '@ER/hooks'
import NAME from '@ER/filter/name.js'
import utils from '@ER/utils'
export default {
  name: NAME.OPERATORCOMPONENT
}
</script>
<script setup>
const props = defineProps(['options', 'modelValue', 'isDateType', 'property'])
const emit = defineEmits(['update:modelValue'])
const ER = inject('Everright')
const ns = hooks.useNamespace(NAME.OPERATORCOMPONENT)
const state = reactive({
  value0: '',
  value1: ''
})
watch(state, () => {
  emit('update:modelValue', [state.value0, state.value1])
})
const {
  t,
  lang
} = hooks.useI18n()
watch(() => props.modelValue, (val, oldVal) => {
  state.value0 = val[0]
  state.value1 = val[1]
}, {
  immediate: true
})
// range
// tags
// noop
// none
</script>
<template>
  <template v-if="isDateType">
    <el-select
      :class="[ns.e('width'), utils.addTestId('dateOperator', 'id')]"
      :popperClass="utils.addTestId('dateOperator-popperClass', 'id')"
      v-model="state.value0"
      v-show="!(options[0].length === 1)"
      filterable>
      <el-option
        v-for="item in options[0]"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        v-bind="utils.addAttrs({
          value: item.value
        })"
      />
    </el-select>
  </template>
  <el-select
    v-model="state.value1"
    :class="[ns.e('width'), utils.addTestId('operator', 'id')]"
    :popperClass="utils.addTestId('operator-popperClass', 'id')"
    filterable>
    <el-option
      v-for="item in options[1]"
      :key="item.value"
      :label="utils.getLableByLang(item, lang)"
      :value="item.value"
      v-bind="utils.addAttrs({
        value: item.value
      })"
    />
  </el-select>
</template>
