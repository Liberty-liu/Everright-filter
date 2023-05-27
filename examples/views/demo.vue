<script setup>
import { ref } from 'vue'
import { EverrightFilter } from '/packages/filter'
const ERfilterRef = ref(null)
const lang = ref('en')
const handleListener = ({ type, data }) => {
}
const getOptions = async () => {
  return new Promise((resolve, reject) => {
    resolve({
      data: {
        options: [
          {
            label: '客户名称',
            en_label: 'Customer name',
            value: 'input_NYF_NaWIL1ezQeje19fO5',
            operatorKey: 'input',
            renderType: 'TEXT',
            includeOperator: {
              operator: [
                'contains'
              ]
            }
          },
          {
            label: '客户编号',
            en_label: 'Customer ID',
            value: 'input_4FbXNPc1ValSmbVZ4X03i',
            operatorKey: 'input',
            renderType: 'TEXT',
            includeOperator: {
              operator: [
                'contains'
              ]
            }
          },
          {
            label: '富文本编辑器',
            en_label: 'rich text editor',
            value: 'html_doavWMEKsA04CBVc2qkvB',
            operatorKey: 'input',
            renderType: 'TEXT',
            includeOperator: {
              operator: [
                'contains'
              ]
            }
          }
        ],
        operators: {
          input: [
            {
              value: 'contains',
              style: 'noop'
            }
          ]
        }
      }
    })
  })
}
</script>
<template>
  <div>
    <EverrightFilter
      :lang="lang"
      :getOptions="getOptions"
      type="quick-filter"
      @listener="handleListener"
      ref="ERfilterRef"/>
  </div>
</template>
