<script>
import { ref, computed, nextTick, reactive, inject, unref, toRefs, watch } from 'vue'
import _ from 'lodash-es'
import hooks from '@ER/hooks'
import NAME from '@ER/filter/name.js'
import TriggerComponent from './Trigger.vue'
import OperatorComponent from './Operator.vue'
import types from '../types'
import utils from '@ER/utils'
export default {
  name: NAME.PICKERCOMPONENT
}
</script>
<script setup>
const emit = defineEmits(['listener'])
const props = defineProps({
  id: {
    type: String
  },
  parent: {
    type: Array
  },
  // isShowDel: {
  //   type: Boolean,
  //   default: false
  // },
  isConstraint: {
    type: Boolean,
    default: false
  },
  sign: {
    type: String
  },
  index: {
    type: [String, Number]
  }
})
const ER = inject('Everright')
const {
  t,
  lang
} = hooks.useI18n()
const ERConstraint = inject('EverrightConstraint', '')
const isInConstraint = !!ERConstraint
const ns = hooks.useNamespace(NAME.PICKERCOMPONENT)
const trigger = ref()
const componentRef = ref()
const state = reactive({
  isChange: true,
  operator: [],
  property: '',
  loading: false
})
const isShowOperator = computed(() => {
  return !_.isEmpty(state.property) && _.get(params, 'value.isShowOperator', true) && /^(linear|matrix)$/.test(ER.props.type)
})
const options = computed(() => {
  return isInConstraint ? ERConstraint.options : ER.state.options
})
const getNodes = item => item.children && item.children.length > 0 ? item.children.map(m => getNodes(m)) : [item]
const params = computed(() => {
  let result = {}
  if (state.property) {
    const leafNodes = _.flattenDeep(unref(options).map(m => getNodes(m)))
    const node = _.find(leafNodes, { value: state.property })
    result = node
  }
  return result
})
const operatorOptions = computed(() => {
  return utils.convertDataByLang(ER.state.operators[!props.isConstraint ? unref(params).operatorKey : 'TimesOperators'], lang.value)
})
const renderType = computed(() => {
  let result = ''
  if (!props.isConstraint) {
    if (unref(params).renderType !== 'NONE') {
      result = types[`${_.capitalize(unref(params).renderType)}Type`]
    }
  } else {
    result = types.NumberType
  }
  return result
})
const isDateType = computed(() => {
  return unref(renderType) && `${_.capitalize(unref(params).renderType)}Type` === 'DateType'
})
const operatorStyle = computed(() => {
  const selectedOperator = _.find(unref(operatorOptions), { value: state.operator[1] })
  return _.get(selectedOperator, 'style', 'noop')
})
const isNone = (val) => /^(none)$/.test(val)
const isShowComponent = computed(() => {
  let result = false
  if ((state.property || props.isConstraint) && unref(params).renderType !== 'NONE') {
    result = true
    if (unref(operatorStyle) !== 'noop') {
      result = !isNone(unref(operatorStyle))
    }
  }
  return result
})
const dateOperatorOptions = computed(() => {
  return [
    {
      value: 'date',
      label: t('er.public.Date')
    },
    {
      value: 'year',
      label: t('er.public.year')
    },
    {
      value: 'month',
      label: t('er.public.month')
    },
    {
      value: 'day',
      label: t('er.public.day')
    }
  ]
})
const isShowDel = computed(() => {
  return (ER.state.store.filters.length > 1 ? true : (props.parent.length > 1 ? true : !_.isEmpty(state.property))) && !/^quick-(search|filter)$/.test(ER.props.type)
})
const handleClick = (val) => {
  if (ER.state.store.filters.length === 1 && props.parent.length === 1 && !_.isEmpty(state.property)) {
    state.property = ''
    emit('listener', {
      type: 'clear'
    })
  } else {
    props.parent.splice(props.parent.indexOf(props.id), 1)
  }
}
const operatorComponentData = computed(() => {
  const exDateOperator = _.get(unref(params), 'excludeOperator.dateOperator', [])
  const exOperator = _.get(unref(params), 'excludeOperator.operator', [])
  const includeDateOperator = _.get(unref(params), 'includeOperator.dateOperator', [])
  const includeOperator = _.get(unref(params), 'includeOperator.operator', [])
  return [
    dateOperatorOptions.value.filter((e) => {
      return includeDateOperator.length === 0 ? exDateOperator.indexOf(e.value) === -1 : includeDateOperator.indexOf(e.value) !== -1
    }),
    unref(operatorOptions).filter((e) => {
      return includeOperator.length === 0 ? exOperator.indexOf(e.value) === -1 : includeOperator.indexOf(e.value) !== -1
    })
  ]
})
const {
  getData,
  setData,
  v$
} = hooks.useCommon(NAME.PICKERCOMPONENT, {
  ...toRefs(state),
  ...toRefs(props),
  isDateType,
  operatorStyle,
  componentRef,
  isShowComponent,
  emit,
  params,
  isShowOperator
})
defineExpose({
  getData,
  setData
})
const setDefaultOperator = () => {
  if (_.isEmpty(ER.state.remoteData)) {
    // if (/^quick-(search|filter)$/.test(ER.props.type)) {
    //   state.operator[1] = ER.props.defaultOperator
    // } else {
    //   if (isDateType.value) {
    //     state.operator[0] = !state.operator[0] && operatorComponentData.value[0][0].value
    //   }
    //   state.operator[1] = !state.operator[1] && operatorComponentData.value[1][0].value
    // }
    if (isDateType.value) {
      state.operator[0] = !state.operator[0] && operatorComponentData.value[0][0].value
    }
    state.operator[1] = !state.operator[1] && operatorComponentData.value[1][0].value
  }
}
watch(() => state.property, (newVal) => {
  ER.fireEvent('triggerChange', {
    property: newVal,
    index: props.index,
    params: _.cloneDeep(params.value)
  })
  state.isChange = false
  state.operator = []
  if (newVal) {
    nextTick(() => {
      state.isChange = true
      setDefaultOperator()
      emit('listener', {
        type: 'change',
        data: {
          property: state.property,
          params: unref(params),
          operatorStyle: unref(operatorStyle),
          dateOperator: state.operator[0]
        }
      })
    })
  }
})
if (props.isConstraint) {
  setDefaultOperator()
} else {
  nextTick(() => {
    if (ER.state.pushRuleProperty) {
      state.property = ER.state.pushRuleProperty
      ER.state.pushRuleProperty = ''
    }
  })
}
//   , {
//   immediate: true
// }
if (/^quick-search$/.test(ER.props.type)) {
  state.property = options.value[0].value
}
</script>
<template>
  <div :class="[ns.b()]" v-bind="!props.isConstraint ? utils.addTestId(`${NAME.PICKERCOMPONENT}-${props.index}`) : {}">
    <div v-if="ER.props.type === 'quick-filter'">
      {{ lang === 'zh-cn' ? params.label : params.en_label}}
    </div>
    <TriggerComponent
      v-if="!isConstraint && ER.props.type !== 'quick-filter'"
      ref="trigger"
      :class="{ 'ERFILTER-ERROR': v$.property.$error && ER.props.isShowValidateState }"
      v-model="v$.property.$model"
      :options="options"
      :placeholder="t('er.public.select')"
    />
    <OperatorComponent
      v-model="state.operator"
      :options="operatorComponentData"
      :isDateType="isDateType"
      v-if="(!isConstraint ? (isShowOperator && state.isChange) : true)"
    />
    <template v-if="isShowComponent">
      <template v-if="ER.props.type === 'quick-filter'">
        <div :class="[ns.e('componentWrap')]">
          <component
            v-if="state.isChange"
            ref="componentRef"
            :is="renderType"
            :params="params"
            :property="state.property"
            :operatorStyle="operatorStyle"
            :dateOperator="state.operator[0]"
            :id="id"
          ></component>
        </div>
      </template>
      <template v-else>
        <component
          v-if="state.isChange"
          ref="componentRef"
          :is="renderType"
          :params="params"
          :property="state.property"
          :operatorStyle="operatorStyle"
          :dateOperator="state.operator[0]"
          :id="id"
        ></component>
      </template>
    </template>
    <el-button :class="[ns.e('searchButton')]" v-if="/^quick-search$/.test(ER.props.type)" type="primary" icon="Search"
    @click="ER.fireEvent('search')"
    />
    <el-button
      link
      v-if="isShowDel"
      @click="handleClick"
    >
      <el-icon><Delete /></el-icon>
    </el-button>
  </div>
</template>
