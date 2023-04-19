<script setup>
import { ref, onMounted, getCurrentInstance, reactive, unref } from 'vue'
import { EverrightRegion } from '/packages/region'
const erRegin = ref(null)
const state = reactive({
  value0: [
    // ['CN', 'Anhui', 'Anqing']
    // ['CN', 'Anhui']
  ],
  value1: [
    // ['CN', 'Anhui', 'Anqing']
    // ['CN', 'Anhui']
  ]
})
// window.state = state
onMounted(() => {
  // erEditor.value.setData([data[4]])
  // erEditor.value.setData({
  //   list: data
  // })
  // console.log(data.slice(14, 16))
  // erEditor.value.setData(data.slice(15, 16))
})
</script>
<template>
  <EverrightRegion
    v-model="state.value1"
    ref="erRegin"/>
  <EverrightRegion
    multiple
    v-model="state.value0"
    ref="erRegin"/>
  <div>
<!--    {{JSON.stringify(state.value0, '', 2)}}-->
<!--    {{state.value0}}-->
  </div>
</template>
