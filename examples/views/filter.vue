<script setup>
import matrixData from './data/matrixData.json'
import linearData from './data/linearData.json'
import quickFilterData from './data/quickFilterData.json'
import quickFilterOptionsData from './data/quickFilterOptions.json'
import quickSearchOptionsData from './data/quickSearchOptionsData.json'
import { ref, onMounted, getCurrentInstance, reactive, unref, watch, nextTick, computed } from 'vue'
import { EverrightFilter } from '/packages/filter'
import uri from '@ER-examples/uri.js'
import hooks from '@ER/hooks'
import utils from '@ER/utils'

const httpPrams = {
  options: {
    url: uri.options,
    get: {
      query: {
        a: 20
      }
    }
  },
  conditions: {
    url: uri.ruleconditions,
    get: {
      query: {
        a: 20
      }
    }
  },
  props: {
    url: uri.props,
    get: {
      query: {
        a: 20
      }
    }
  },
  propValues: {
    url: uri.propValues,
    get: {
      query: {
        a: 50
      }
    }
  }
}
const getOptions = async () => {
  // return hooks.useFetch(uri.options)
  return new Promise((resolve, reject) => {
    try {
      // hooks.useFetch(uri.options).then(data => {
      //   resolve(data)
      // })
      let result = {}
      if (state.type === 'quick-filter') {
        result = quickFilterOptionsData
      }
      if (state.type === 'quick-search') {
        result = quickSearchOptionsData
      }
      resolve({
        data: result
      })
    } catch (e) {

    }
  })
}
const getConditions = async (params) => {
  // return hooks.useFetch(uri.options)
  return new Promise((resolve, reject) => {
    try {
      hooks.useFetch(...utils.apiParams('conditions', 'get', httpPrams, {
        params
      })).then(data => {
        resolve(data)
      })
    } catch (e) {
    }
  })
}
const lang = ref(localStorage.getItem('er-lang') || 'zh-cn')
const ERfilterRef = ref(null)
const state = reactive({
  value0: {},
  // type: 'quick-search'
  type: 'linear'
  // type: 'matrix'
  // type: 'quick-filter'
})
const isReRender = ref(true)
watch(() => state.type, () => {
  isReRender.value = false
  nextTick(() => {
    isReRender.value = true
  })
})
const isShowValidateState = computed(() => /^quick-(search|filter)$/.test(state.type))
const defaultOptions = computed(() => {
  let result = {}
  if (state.type === 'quick-filter') {
    result = quickFilterOptionsData
  }
  if (state.type === 'quick-search') {
    result = quickSearchOptionsData
  }
  return result
})
onMounted(() => {
  // erEditor.value.setData([data[4]])
  // erEditor.value.setData({
  //   list: data
  // })
  // console.log(data.slice(14, 16))
  // erEditor.value.setData(data.slice(15, 16))
})
const handleEvent = (type) => {
  switch (type) {
    case 1:
      if (state.type === 'matrix') {
        unref(ERfilterRef).setData(matrixData)
      }
      if (state.type === 'linear') {
        unref(ERfilterRef).setData(linearData)
      }
      if (state.type === 'quick-filter') {
        unref(ERfilterRef).setData(quickFilterData)
      }
      break
    case 2:
      unref(ERfilterRef).clearData()
      break
    case 3:
      // console.log(unref(ERfilterRef).getData(false))
      state.value0 = unref(ERfilterRef).getData(!isShowValidateState.value)
      break
    case 4:
      // state.value0 = unref(ERfilterRef).getData()
      unref(ERfilterRef).pushData('Gender11111')
      break
    case 5:
      // state.value0 = unref(ERfilterRef).getData()
      unref(ERfilterRef).clearData('values')
      break
    case 6:
      // unref(ERfilterRef).clearData()
      break
  }
}
const handleListener = ({ type, data }) => {
  // console.log(type)
  if (type === 'init') {
    handleEvent(1)
  }
  if (type === 'search') {
    handleEvent(3)
  }
}
const handleLang = (val) => {
  // lang.value = val
  localStorage.setItem('er-lang', val)
}
</script>
<template>
  <el-form label-width="120px">
    <el-form-item label="Lang">
      <el-radio-group v-model="lang" @change="handleLang">
        <el-radio label="zh-cn" size="large">中文</el-radio>
        <el-radio label="en" size="large">English</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="filter type">
      <el-radio-group v-model="state.type">
        <el-radio label="linear" size="large" border>Linear(一维)</el-radio>
        <el-radio label="matrix" size="large" border>Matrix(二维)</el-radio>
        <el-radio label="quick-search" size="large" border>Quick search(仅支持renderType=TEXT)</el-radio>
        <el-radio label="quick-filter" size="large" border>Quick filter</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
  <EverrightFilter
    :lang="lang"
    :httpPrams="httpPrams"
    v-if="isReRender"
    @listener="handleListener"
    :isFetchOptions="!isShowValidateState"
    :isShowValidateState="!isShowValidateState"
    :options="defaultOptions"
    :getOptions="isShowValidateState ? getOptions : ''"
    :getConditions="getConditions"
    :type="state.type"
    ref="ERfilterRef"/>
  <el-button v-if="!/^quick-(search)$/.test(state.type)" @click="() => handleEvent(1)" type="primary">Set Data</el-button>
  <el-button v-if="!/^quick-(search|filter)$/.test(state.type)" @click="() => handleEvent(2)" type="primary">Reset Data</el-button>
  <el-button @click="() => handleEvent(5)" type="primary">Clear Data</el-button>
  <el-button @click="() => handleEvent(3)" type="primary">Get Data</el-button>
  <el-button v-if="state.type === 'linear'" @click="() => handleEvent(4)" type="primary">手动添加一条</el-button>
  <el-input
    type="textarea"
    readonly
    :rows="15"
    placeholder="请输入内容"
    :model-value="JSON.stringify(state.value0, '', 2)"
  />
</template>
