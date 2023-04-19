<script>
import { computed, ref, reactive, provide, inject, toRefs, onMounted, watch } from 'vue'
import NAME from '@ER/filter/name.js'
import _ from 'lodash-es'
import hooks from '@ER/hooks'
import Rule from './Rule.vue'
import LogicalOperatorComponent from './components/LogicalOperator.vue'
import utils from '@ER/utils'
export default {
  name: NAME.FILTERITEM
}
</script>
<script setup>
const ER = inject('Everright')
const {
  t,
  lang
} = hooks.useI18n()
const ERConstraint = inject('EverrightConstraint', '')
const emit = defineEmits(['del'])
const props = defineProps({
  id: {
    type: String
  },
  index: {
    type: Number
  },
  parent: {
    type: Array
  }
})
const ns = hooks.useNamespace(NAME.FILTERITEM)
const ruleRef = ref()
const optionContentRef = ref()
const state = reactive({
  logicalOperator: 'and',
  rules: ER.props.type === 'quick-filter' ? [] : utils.generateItems(1)
})
const isShowOperator = computed(() => {
  return ER.props.type !== 'quick-filter' && state.rules.length > 1
})
const isInConstraint = !!ERConstraint
const {
  getData,
  setData
} = hooks.useCommon(NAME.FILTERITEM, {
  ...toRefs(state),
  ...toRefs(props),
  ruleRef
})
const addRule = () => {
  state.rules.push(...utils.generateItems(1))
}
defineExpose({
  getData,
  setData,
  addRule
})
const operatorHeight = ref(0)
const callback = (mutationsList) => {
  let curHeight = 0
  if (!optionContentRef.value) return false
  const nodes = optionContentRef.value.querySelectorAll(`.${ns.e('rule')}`)
  for (let i = 0; i < nodes.length - 1; i++) {
    const cur = nodes[i]
    curHeight += cur.offsetHeight
  }
  if (nodes.length > 1) {
    curHeight += 52
  }
  operatorHeight.value = curHeight
}
if (!isInConstraint) {
  onMounted(() => {
    const config = { attributes: false, childList: true, subtree: true }
    const observer = new MutationObserver(callback)
    observer.observe(optionContentRef.value, config)
  })
}
watch(state.rules, (newVal) => {
  if (!newVal.length) {
    emit('del')
  }
}, { deep: true })
const itemLabel = computed(() => {
  return lang.value === 'zh-cn' ? utils.digitalToChinese(props.parent.indexOf(props.id) + 1) : utils.digitalToEnglish(props.parent.indexOf(props.id) + 1)
})
</script>
<template>
  <div :class="[ns.b()]">
    <h2 v-if="!isInConstraint && ER.props.type === 'matrix'">{{ t('er.item.itemLabel') }} {{ itemLabel }}</h2>
    <div :class="['EverrightFilterOption']">
      <LogicalOperatorComponent
        v-if="!isInConstraint && isShowOperator"
        :height="operatorHeight"
        v-model="state.logicalOperator"/>
      <div
        ref="optionContentRef"
        :class="[ns.e('optionContent'), 'EverrightFilterOptionContent']">
        <TransitionGroup name="el-fade-in">
          <Rule
            ref="ruleRef"
            :class="!isInConstraint && ns.e('rule')"
            v-for="(item, i) in state.rules"
            :key="item"
            :id="item"
            :parentId="id"
            :parent="state.rules"
            :index="index + '-' + i"
          />
        </TransitionGroup>
        <el-button
          v-if="ER.state.isShowAdd"
          :class="[ns.e('add')]"
          @click="addRule"
          link
        >{{isInConstraint ? t('er.item.addProp') : t('er.item.addCondition')}}</el-button>
      </div>
    </div>
  </div>
</template>
