<script>
import { ref, computed, nextTick, reactive, inject, unref, watch, toRefs } from 'vue'
import _ from 'lodash-es'
import NAME from '@ER/filter/name.js'
import hooks from '@ER/hooks'
export default {
  name: NAME.TEXTTYPE
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
const ns = hooks.useNamespace(NAME.TEXTTYPE)
const state = reactive({
  value0: '',
  value1: [],
  options: []
})
const isTags = computed(() => {
  return props.operatorStyle === 'tags'
})
const {
  getData,
  setData,
  clearData,
  v$
} = hooks.useCommon(NAME.TEXTTYPE, {
  ...toRefs(state),
  ...toRefs(props),
  isTags
})
watch(() => state.value1, (newVal) => {
  state.options = newVal.map(e => {
    return {
      value: e,
      label: e
    }
  })
}, {
  immediate: true
})
const handleCurrentChange = () => {
  if (/^quick-search$/.test(ER.props.type)) {
    ER.fireEvent('search')
  }
}
defineExpose({
  getData,
  setData,
  clearData
})
</script>
<template>
  <el-select
    :placeholder="t('er.public.PleaseEnter')"
    :class="[ns.e('width'), v$.value1.$error && ER.props.isShowValidateState && 'ERFILTER-ERROR' ]"
    v-model="state.value1"
    v-if="isTags"
    multiple
    filterable
    allow-create
    default-first-option
    collapse-tags
    clearable
    :options="state.options"
  >
    <el-option
      v-for="item in state.options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
  <el-input
    :placeholder="t('er.public.TypeIn')"
    clearable
    @change="handleCurrentChange"
    v-else
    :class="[ns.e('width'), v$.value0.$error && ER.props.isShowValidateState && 'ERFILTER-ERROR' ]"
    v-model="state.value0"/>
</template>
