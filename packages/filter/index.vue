<script>
import { defineProps, ref, reactive, computed, provide, getCurrentInstance, watch, nextTick, onMounted, isReactive, readonly, toRefs } from 'vue'
import LogicalOperatorComponent from './components/LogicalOperator.vue'
import _ from 'lodash-es'
import async from 'async'
import Item from './Item.vue'
import NAME from '@ER/filter/name.js'
import hooks from '@ER/hooks'
import utils from '@ER/utils'
import {
  useXhr
} from './xhr'
export default {
  name: NAME.EVERRIGHTFILTER
}
</script>
<script setup>
const emit = defineEmits(['listener'])
const props = defineProps({
  type: {
    type: String,
    default: 'linear',
    validator (value) {
      return /^(linear|matrix|quick-search|quick-filter)$/.test(value)
    }
  },
  httpPrams: {
    default () {}
  },
  isShowValidateState: {
    type: Boolean,
    default: true
  },
  lang: {
    type: String,
    default: 'zh-cn'
  },
  getOptions: {
    type: Function
  },
  getConditions: {
    type: Function
  },
  getProps: {
    type: Function
  },
  getPropValues: {
    type: Function
  },
  canAddRule: {
    type: Function,
    default: () => {}
  },
  ruleLimit: {
    type: Number,
    default: -1
  }
})
const {
  t,
  lang
} = hooks.useI18n(props)
const itemRef = ref()
const transitionName = ref('el-fade-in')
const state = reactive({
  loading: false,
  options: [],
  logicalOperator: 'and',
  store: {
    filters: utils.generateItems(1)
  },
  operators: {},
  Namespace: 'filter',
  children: [],
  remoteData: {},
  rulesState: {},
  showDels: {},
  pushRuleProperty: '',
  isShowAdd: /^(linear|matrix)$/.test(props.type)
})
const contentRef = ref()
const {
  getData,
  setData
} = hooks.useCommon(NAME.EVERRIGHTFILTER, {
  ...toRefs(state),
  transitionName,
  itemRef,
  props
})
const states = {}
const api = useXhr(props)
const readied = async.queue(function (task, callback) {
  states[String(task.name)] = {}
  task.fn.then(() => {
    callback()
    states[String(task.name)] = false
  })
})
readied.drain(function () {
  nextTick(() => {
    state.remoteData = {}
    transitionName.value = 'el-fade-in'
    state.loading = false
  })
})
let canFire = false
const fireEvent = (type, data) => {
  if (!canFire) {
    canFire = type === 'init'
  }
  if (canFire) {
    emit('listener', {
      type,
      data
    })
  }
}
const isShowAdd = computed(() => {
  // console.log(_.flatten(_.get(itemRef, 'value', []).map(e => e.state.rules)).length)
  return state.isShowAdd && props.ruleLimit === -1 ? true : _.flatten(_.get(itemRef, 'value', []).map(e => e.state.rules)).length < props.ruleLimit
})
provide('Everright', {
  state,
  api,
  readied,
  props,
  fireEvent,
  isShowAdd
})
const flatNodes = (nodes) => {
  return nodes.reduce((res, node) => {
    if (!node.children) {
      res.push(node)
    } else {
      res = res.concat(flatNodes(node.children))
    }
    return res
  }, [])
}
const initConfiguration = () => {
  nextTick(async () => {
    if (/^(linear|matrix)$/.test(props.type)) {
      state.loading = false
      fireEvent('init', _.cloneDeep(state.options))
      return false
    }
    if (props.type === 'quick-filter') {
      const pickers = state.children.filter(e => e.name === NAME.PICKERCOMPONENT)
      const nodes = _.cloneDeep(flatNodes(state.options))
      while (nodes.length) {
        itemRef.value[0].addRule()
        state.pushRuleProperty = nodes[0].value
        await nextTick()
        await nextTick()
        nodes.shift()
      }
      state.loading = false
      await nextTick()
      fireEvent('init', _.cloneDeep(state.options))
    }
    if (props.type === 'quick-search') {
      const pickers = state.children.filter(e => e.name === NAME.PICKERCOMPONENT)
      const nodes = _.cloneDeep(flatNodes(state.options))
      itemRef.value[0].addRule()
      state.loading = false
      await nextTick()
      fireEvent('init', _.cloneDeep(state.options))
    }
  })
}
const getRemoteData = async () => {
  state.loading = true
  try {
    const response = await api.getOptions()
    state.options = response.data.options
    state.operators = response.data.operators
    initConfiguration()
  } catch (e) {
  }
}
getRemoteData()
const pushData = (...arg) => {
  if (props.type === 'linear') {
    const isUniq = _.get(arg, '[1]', false)
    const pickers = state.children.filter(e => e.name === NAME.PICKERCOMPONENT)
    if (pickers.length === 1 && !pickers[0].state.property) {
      pickers[0].state.property = arg[0]
    } else {
      const findIndex = _.findIndex(pickers, {
        state: {
          property: arg[0]
        }
      })
      if (isUniq && findIndex !== -1) {
        return false
      }
      itemRef.value[0].addRule()
      state.pushRuleProperty = arg[0]
    }
  }
}
const typesRe = new RegExp(`^(${[NAME.NUMBERTYPE, NAME.TEXTTYPE, NAME.SELECTTYPE, NAME.TIMETYPE, NAME.DATETYPE, NAME.DATECOMPONENT, NAME.REGIONTYPE, NAME.CASCADERTYPE].join('|')})$`)
const clearData = (type) => {
  if (type === 'values') {
    const types = state.children.filter(e => typesRe.test(e.name))
    types.forEach(e => {
      e.clearData()
    })
  } else {
    state.store.filters = utils.generateItems(1)
    state.logicalOperator = 'and'
  }
}
defineExpose({
  getData,
  setData: (...arg) => {
    canFire = false
    state.loading = true
    setData(...arg)
    canFire = true
  },
  pushData,
  clearData
})
const ns = hooks.useNamespace('Main', state.Namespace)
const isShowOperator = computed(() => {
  return state.store.filters.length > 1
})
const addItem = () => {
  state.store.filters.push(...utils.generateItems(1))
}
const addGroupLabel = computed(() => {
  return `${t(`er.${NAME.EVERRIGHTFILTER}.addGroupLabel`)} ${lang.value === 'zh-cn' ? utils.digitalToChinese(state.store.filters.length + 1) : utils.digitalToEnglish(state.store.filters.length + 1)}`
})
</script>
<template>
  <div :class="[ns.b(), ns.e(props.type)]" v-loading="state.loading">
    <div v-if="type === 'matrix'" :class="['EverrightFilterOption']">
      <LogicalOperatorComponent
        v-if="isShowOperator"
        v-model="state.logicalOperator"
        :contentRef="contentRef"
      />
      <div v-if="state.options.length" :class="['EverrightFilterOptionContent']" ref="contentRef">
        <TransitionGroup :name="transitionName">
          <Item
            ref="itemRef"
            class="EverrightFilterItemSign"
            v-for="(item, index) in state.store.filters"
            :key="item"
            :id="item"
            @del="state.store.filters.splice(index, 1)"
            :parent="state.store.filters"
            :index="index"
          >
          </Item>
        </TransitionGroup>
        <el-button
          v-if="isShowAdd"
          :class="[ns.e('add')]"
          @click="addItem"
          link
        >{{ addGroupLabel }}</el-button>
      </div>
    </div>
    <div
      v-if="/^(linear|quick-search|quick-filter)$/.test(type)">
      <Item
        ref="itemRef"
        class="EverrightFilterItemSign"
        v-for="(item, index) in state.store.filters"
        :key="item"
        :id="item"
        @del="state.store.filters.splice(index, 1)"
        :parent="state.store.filters"
        :index="index"
      >
      </Item>
    </div>
  </div>
</template>
