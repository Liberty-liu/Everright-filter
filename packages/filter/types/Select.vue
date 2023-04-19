<script>
import { ref, computed, nextTick, reactive, inject, unref, watch, toRefs } from 'vue'
import _ from 'lodash-es'
import NAME from '@ER/filter/name.js'
import hooks from '@ER/hooks'
import utils from '@ER/utils'
export default {
  name: NAME.SELECTTYPE
}
</script>
<script setup>
const ERConstraint = inject('EverrightConstraint', '')
const isInConstraint = !!ERConstraint
const props = defineProps(['id', 'operatorStyle', 'params', 'property'])
const ER = inject('Everright')
const element = ref()
const {
  t,
  lang
} = hooks.useI18n()
const isMultiple = computed(() => {
  return props.params.multiple || props.operatorStyle === 'tags'
})
const ns = hooks.useNamespace(NAME.SELECTTYPE)
const state = reactive({
  loading: true,
  value0: '',
  options: [],
  isChanged: true
})
watch(isMultiple, (newVal) => {
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
} = hooks.useCommon(NAME.SELECTTYPE, {
  ...toRefs(state),
  ...toRefs(props),
  isMultiple
})
const newOptions = computed(() => {
  return utils.convertDataByLang(state.options, lang.value)
})
const getRemoteData = async () => {
  const params = {
    property: props.property
  }
  try {
    const { data } = await (isInConstraint ? ER.api.getPropValues(params) : ER.api.getConditions(params))
    state.options = data
  } finally {
    state.loading = false
  }
}
getRemoteData()
defineExpose({
  getData,
  setData,
  clearData
})
</script>
<template>
  <el-select
    v-loading="state.loading"
    v-if="state.isChanged"
    :class="[ns.e('width'), v$.value0.$error && ER.props.isShowValidateState && 'ERFILTER-ERROR' ]"
    v-model="state.value0"
    :multiple="isMultiple"
    :multiple-limit="params.multipleLimit || 200"
    filterable
    :placeholder="t('er.public.select')"
    clearable
    default-first-option
    collapse-tags
  >
    <el-option
      v-for="item in newOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"/>
  </el-select>
</template>
