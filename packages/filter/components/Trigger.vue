<script>
import { ref, computed, nextTick, reactive, inject, defineExpose } from 'vue'
import _ from 'lodash-es'
import NAME from '@ER/filter/name.js'
import hooks from '@ER/hooks'
import utils from '@ER/utils'
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
const {
  t,
  lang
} = hooks.useI18n()
// const {
//   getData,
//   setData
// } = hooks.useCommon(NAME.TRIGGERCOMPONENT, {})
const newOptions = computed(() => {
  return utils.convertDataByLang(props.options, lang.value)
})
const handleChange = (val) => {
  emit('update:modelValue', val)
}
defineExpose({
  ref: element
})
const filterMethod = (node, keyword) => {
  return node.text.toLowerCase().includes(keyword.toLowerCase())
}
</script>
<template>
  <el-cascader
    :class="[ns.b(), utils.addTestId(NAME.TRIGGERCOMPONENT, 'id')]"
    ref="element"
    :checkStrictly="true"
    :model-value="modelValue"
    filterable
    :filter-method="filterMethod"
    :popperClass="utils.addTestId(`${NAME.TRIGGERCOMPONENT}-popperClass`, 'id')"
    @change="handleChange"
    :props="{
        emitPath: false
      }"
    :options="newOptions"/>
</template>
