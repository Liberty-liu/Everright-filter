<script>
import { ref, computed, nextTick, reactive, inject, unref, toRefs, watch } from 'vue'
import _ from 'lodash-es'
import NAME from '@ER/filter/name.js'
import hooks from '@ER/hooks'
import utils from '@ER/utils'
export default {
  name: NAME.CASCADERTYPE
}
</script>
<script setup>
const ERConstraint = inject('EverrightConstraint', '')
const isInConstraint = !!ERConstraint
const props = defineProps(['id', 'operatorStyle', 'params', 'property'])
const ER = inject('Everright')
const {
  t,
  lang
} = hooks.useI18n()
const element = ref()
const ns = hooks.useNamespace(NAME.CASCADERTYPE)
const state = reactive({
  loading: true,
  value0: '',
  isChanged: true,
  options: []
})
const isMultiple = computed(() => {
  return props.params.multiple || props.operatorStyle === 'tags'
})
watch(isMultiple, (newVal) => {
  state.value0 = []
  state.isChanged = false
  nextTick(() => {
    state.isChanged = true
  })
})
const cascaderProps = computed(() => {
  const result = {
    checkStrictly: isMultiple.value,
    multiple: isMultiple.value,
    emitPath: false
  }
  if (result.multiple) {
    result.disabled = (data, instance) => {
      let result = false
      if (instance.parent) {
        const parent = instance.parent
        result = parent.isDisabled || parent.checked
      }
      return result
    }
  }
  return result
})
const flatNodes = (nodes, leafOnly = false) => {
  return nodes.reduce((res, node) => {
    if (node.isLeaf) {
      res.push(node)
    } else {
      !leafOnly && res.push(node)
      res = res.concat(flatNodes(node.children, leafOnly))
    }
    return res
  }, [])
}
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
const {
  getData,
  setData,
  clearData,
  v$
} = hooks.useCommon(NAME.CASCADERTYPE, {
  ...toRefs(state),
  ...toRefs(props),
  isMultiple
})
defineExpose({
  getData,
  setData,
  clearData
})
const handleChange = (value) => {
  if (unref(isMultiple)) {
    const newValue = value
    newValue.forEach(e => {
      const selectedChildren = flatNodes([_.find(element.value.$refs.cascaderPanelRef.getCheckedNodes(), { valueByOption: e })]).map(e => e.valueByOption).filter(e1 => e1 !== e)
      const findChildren = _.intersectionBy(element.value.$refs.cascaderPanelRef.getCheckedNodes(), selectedChildren.map(e => { return { valueByOption: e } }), 'valueByOption')
      findChildren.forEach(e => {
        newValue.splice(newValue.indexOf(e.valueByOption), 1)
        element.value.$refs.cascaderPanelRef.handleCheckChange(e, false)
      })
    })
  }
}
const componentProps = computed(() => {
  const result = {
    placeholder: t('er.public.select'),
    clearable: true,
    filterable: true,
    'collapse-tags': true,
    checkStrictly: true,
    props: cascaderProps.value,
    onChange: handleChange
  }
  return _.merge(result, _.get(props, 'params.customProps', {}))
})
const filterMethod = (node, keyword) => {
  return node.text.toLowerCase().includes(keyword.toLowerCase())
}
</script>
<template>
  <div
    v-loading="state.loading">
    <el-cascader
      :filter-method="filterMethod"
      v-model="state.value0" :options="state.options"
      v-if="state.isChanged"
      collapseTagsTooltip
      :class="[ns.b(), ns.e('width'), v$.value0.$error && ER.props.isShowValidateState && 'ERFILTER-ERROR', utils.addTestId(`${NAME.CASCADERTYPE}`, 'id') ]"
      :popperClass="utils.addTestId(`${NAME.CASCADERTYPE}-popperClass`, 'id')"
      ref="element"
      v-bind="componentProps"
    />
<!--    <el-cascader-->
<!--      clearable-->
<!--      :placeholder="t('er.public.select')"-->
<!--      v-if="state.isChanged"-->
<!--      :class="[ns.b(), ns.e('width'), v$.value0.$error && ER.props.isShowValidateState && 'ERFILTER-ERROR' ]"-->
<!--      filterable-->
<!--      ref="element"-->
<!--      collapse-tags-->
<!--      collapse-tags-tooltip-->
<!--      :checkStrictly="true"-->
<!--      :props="cascaderProps"-->
<!--      v-model="state.value0" :options="state.options"-->
<!--      @change="handleChange"-->
<!--      v-bind="componentProps"-->
<!--    />-->
  </div>
</template>
