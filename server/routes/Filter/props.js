export default (req, res) => {
  res.json({
    code: 0,
    data: [
      {
        label: '用户属性',
        en_label: 'user property',
        value: 'customer',
        children: [
          {
            label: 'province',
            renderType: 'TEXT',
            operatorKey: 'Text',
            value: 'province',
            zh_label: 'province'
          },
          {
            label: 'Gender',
            renderType: 'SELECT',
            operatorKey: 'Gender',
            value: 'Gender',
            zh_label: 'Gender',
            multiple: false,
            multipleLimit: 2
          },
          {
            operatorKey: 'Number',
            label: '评分',
            value: 'rating',
            // permission: false,
            renderType: 'NUMBER'
            // precision: 0,
            // min: 0,
            // max: 200,
            // step: 10
          },
          {
            operatorKey: 'Date',
            label: '日期',
            value: 'Date0',
            renderType: 'DATE',
            // excludeOperator: {
            //   dateOperator:['date', 'year', 'month', 'day'],
            //   operator: ['equal']
            // }
            datePanel: {
              excludeShortcuts: ['today_today'],
              excludeManuals: ['intervalBetween']
              // manualType: 3 default = 3
            }
          },
          {
            operatorKey: 'Time',
            label: '时间(时分)',
            value: 'time0',
            renderType: 'TIME',
            format: 'HH:mm'
          },
          {
            operatorKey: 'Time',
            label: '时间(时分秒)',
            value: 'time1',
            renderType: 'TIME',
            format: 'HH:mm:ss'
          }
        ]
      }
    ]
  })
}
