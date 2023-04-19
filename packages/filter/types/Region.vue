<script>
import { ref, computed, nextTick, reactive, inject, unref, watch, toRefs } from 'vue'
import _ from 'lodash-es'
import NAME from '@ER/filter/name.js'
import hooks from '@ER/hooks'
import { EverrightRegion } from '@ER/region'
export default {
  name: NAME.REGIONTYPE,
  inheritAttrs: false
}
</script>
<script setup>
const props = defineProps(['id', 'operatorStyle', 'params', 'property'])
const ER = inject('Everright')
const element = ref()
const {
  t,
  lang
} = hooks.useI18n()
const state = reactive({
  value0: [],
  isChanged: true
})
const ns = hooks.useNamespace(NAME.REGIONTYPE)
const isMultiple = computed(() => {
  return props.operatorStyle === 'tags'
})
watch(isMultiple, (newVal) => {
  state.value0 = []
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
} = hooks.useCommon(NAME.REGIONTYPE, {
  ...toRefs(state),
  ...toRefs(props)
})
defineExpose({
  getData,
  setData,
  clearData
})
</script>
<template>
  <EverrightRegion
    :class="[ns.e('width'), v$.value0.$error && ER.props.isShowValidateState && 'ERFILTER-ERROR' ]"
    v-if="state.isChanged"
    v-model="state.value0"
    :multiple="isMultiple"
    clearable
    :placeholder="t('er.public.select')"
    ref="erRegin"/>
</template>
