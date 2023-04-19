<script>
import hooks from '@ER/hooks'
import { ref, computed, nextTick, reactive, inject } from 'vue'
import _ from 'lodash-es'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
export default {
  name: 'LogicalOperatorComponent'
}
</script>
<script setup>
const {
  t,
  lang
} = hooks.useI18n()
const props = defineProps(['modelValue', 'height'])
const emit = defineEmits(['update:modelValue'])
const ns = hooks.useNamespace('LogicalOperatorComponent')
const value = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})
</script>
<template>
  <div :class="[ns.b()]" :style="{ height: height + 'px'}">
    <el-switch
      v-model="value"
      inline-prompt
      style="--el-switch-on-color: #FF7B48; --el-switch-off-color: #4176FF"
      :active-text="t('er.public.and')"
      active-value="and"
      :inactive-text="t('er.public.or')"
      inactive-value="or"
    />
  </div>
</template>
