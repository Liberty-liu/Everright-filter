<script>
import { ref, computed, nextTick, reactive, inject, defineExpose } from 'vue'
import _ from 'lodash-es'
import NAME from '@ER/filter/name.js'
import hooks from '@ER/hooks'
export default {
  name: NAME.TRIGGERCOMPONENT
}
</script>
<script setup>
const props = defineProps(['options', 'modelValue'])
const emit = defineEmits(['update:modelValue'])
const ER = inject('Everright')
const element = ref()
const ns = hooks.useNamespace(NAME.TRIGGERCOMPONENT)
// const {
//   getData,
//   setData
// } = hooks.useCommon(NAME.TRIGGERCOMPONENT, {})
const handleChange = (val) => {
  emit('update:modelValue', val)
}
defineExpose({
  ref: element
})
</script>
<template>
  <el-cascader
    :class="[ns.b()]"
    ref="element"
    :checkStrictly="true"
    :model-value="modelValue"
    filterable
    @change="handleChange"
    :props="{
        emitPath: false
      }"
    :options="options" />
</template>
