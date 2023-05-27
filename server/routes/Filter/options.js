export default (req, res) => {
  res.json({
    code: 0,
    data: {
      options: [
        {
          label: '属性',
          en_label: 'properties',
          value: 'customer',
          children: [
            {
              label: '级联(单选)',
              en_label: 'cascader(multiple = false)',
              renderType: 'CASCADER',
              operatorKey: 'Gender',
              value: 'cascader01'
            },
            {
              label: '级联(multiple = true)',
              en_label: 'cascader(multiple = true)',
              renderType: 'CASCADER',
              operatorKey: 'Gender',
              value: 'cascader02',
              multiple: true
            },
            {
              label: '下拉(multipleLimit = 2)',
              en_label: 'select(multipleLimit = 2)',
              renderType: 'SELECT',
              operatorKey: 'Gender',
              value: 'Gender',
              multiple: true,
              multipleLimit: 2
            },
            {
              label: '下拉(multiple = false)',
              en_label: 'select(multiple = false)',
              renderType: 'SELECT',
              operatorKey: 'Gender',
              value: 'Gender11111',
              multiple: false,
              multipleLimit: 2
            },
            {
              label: '地区',
              en_label: 'region',
              renderType: 'REGION',
              operatorKey: 'Gender',
              value: 'Region',
              multiple: false
              // selectType: 1 default 3
            },
            {
              label: '文本',
              en_label: 'text',
              renderType: 'TEXT',
              operatorKey: 'Text',
              value: 'text'
            },
            {
              operatorKey: 'Number',
              label: '数字',
              en_label: 'number',
              value: 'rating',
              renderType: 'NUMBER'
              // precision: 0,
              // min: 0,
              // max: 200,
              // step: 10
            },
            {
              operatorKey: 'Time',
              label: '时间(时分)',
              en_label: 'time(hour minute)',
              value: 'time0',
              renderType: 'TIME',
              format: 'HH:mm'
            },
            {
              operatorKey: 'Time',
              label: '时间(时分秒)',
              en_label: 'time(hour minute second)',
              value: 'time1',
              renderType: 'TIME',
              format: 'HH:mm:ss'
            },
            {
              operatorKey: 'Date',
              label: '日期(默认全部功能)',
              en_label: '日期(Default full function)',
              value: 'Date0',
              renderType: 'DATE'
              // excludeOperator: {
              //   dateOperator:['date', 'year', 'month', 'day'],
              //   operator: ['equal']
              // }
              // datePanel: {
              //   excludeShortcuts: ['today_today'],
              //   excludeManuals: ['intervalBetween'],
              //   manualType: 3 // default = 3; 1=days 2=hours 3 = can choose the hours or days
              // }
            },
            {
              operatorKey: 'Date',
              label: '日期(天manualType = 1)',
              en_label: 'data(天manualType = 1)',
              value: 'Date1',
              renderType: 'DATE',
              // excludeOperator: {
              //   dateOperator:['date', 'year', 'month', 'day'],
              //   operator: ['equal']
              // }
              datePanel: {
                // excludeShortcuts: ['today_today'],
                // excludeManuals: ['intervalBetween'],
                manualType: 1 // default = 3; 1=days 2=hours 3 = can choose the hours or days
              }
            },
            {
              operatorKey: 'Date',
              label: '日期(时manualType = 2)',
              value: 'Date2',
              renderType: 'DATE',
              // excludeOperator: {
              //   dateOperator:['date', 'year', 'month', 'day'],
              //   operator: ['equal']
              // }
              datePanel: {
                // excludeShortcuts: ['today_today'],
                // excludeManuals: ['intervalBetween'],
                manualType: 2 // default = 3; 1=days 2=hours 3 = can choose the hours or days
              }
            },
            {
              operatorKey: 'Date',
              label: '日期(时manualType = 3)',
              value: 'Date3',
              renderType: 'DATE',
              // excludeOperator: {
              //   dateOperator:['date', 'year', 'month', 'day'],
              //   operator: ['equal']
              // }
              datePanel: {
                // excludeShortcuts: ['today_today'],
                // excludeManuals: ['intervalBetween'],
                manualType: 3 // default = 3; 1=days 2=hours 3 = can choose the hours or days
              }
            },
            {
              operatorKey: 'Date',
              label: '日期(Exclude equal and date operators (date))',
              value: 'Date4',
              renderType: 'DATE',
              excludeOperator: {
                dateOperator: ['date'],
                operator: ['equal']
              },
              datePanel: {
                // excludeShortcuts: ['today_today'],
                // excludeManuals: ['intervalBetween'],
                manualType: 3 // default = 3; 1=days 2=hours 3 = can choose the hours or days
              }
            },
            {
              operatorKey: 'Date',
              label: '日期(only Exact Date)',
              value: 'Date5',
              renderType: 'DATE',
              // excludeOperator: {
              //   dateOperator: ['date'],
              //   operator: ['equal']
              // },
              datePanel: {
                excludeShortcuts: -1,
                excludeManuals: -1
                // manualType: 3 // default = 3; 1=days 2=hours 3 = can choose the hours or days
              }
            },
            {
              operatorKey: 'Date',
              label: '日期(dates)',
              value: 'Date6',
              renderType: 'DATE',
              datePanel: {
                excludeShortcuts: -1,
                excludeManuals: -1,
                pickerType: 'dates'
              }
            },
            {
              operatorKey: 'Date',
              label: '日期(datetime)',
              value: 'Date7',
              renderType: 'DATE',
              includeOperator: {
                dateOperator: ['date']
              },
              datePanel: {
                excludeShortcuts: -1,
                excludeManuals: -1,
                pickerType: 'datetime'
              }
            }
          ]
        },
        {
          label: '行为',
          en_label: 'behavior',
          value: 'behavior',
          children: [
            {
              label: '更新昵称',
              en_label: 'Update nickname',
              renderType: 'NONE',
              operatorKey: 'Gender',
              value: 'Gende111r',
              isShowOperator: false,
              constraint: [
                {
                  type: 'times'
                },
                {
                  type: 'date',
                  datePanel: {
                    excludeShortcuts: ['today_today'],
                    excludeManuals: ['intervalBetween'],
                    manualType: 1
                    // manualType: 3 default = 3
                  }
                },
                {
                  type: 'props'
                }
              ]
            },
            {
              label: '更新昵称(无props)',
              en_label: '更新昵称(No props)',
              renderType: 'NONE',
              operatorKey: 'Gender',
              value: 'Gende111r0',
              isShowOperator: false,
              constraint: [
                {
                  type: 'times'
                },
                {
                  type: 'date',
                  datePanel: {
                    excludeShortcuts: ['today_today'],
                    excludeManuals: ['intervalBetween'],
                    manualType: 1
                    // manualType: 3 default = 3
                  }
                }
              ]
            }
          ]
        }
      ],
      operators: {
        Gender: [
          {
            label: '等于',
            en_label: 'Equal',
            value: 'equal',
            style: 'noop'
          },
          {
            label: '等于其中之一',
            en_label: 'Equal to one of',
            value: 'one_of',
            style: 'tags'
          },
          {
            label: '不等于',
            en_label: 'Not equal',
            value: 'not_equal',
            style: 'noop'
          },
          {
            label: '包含',
            en_label: 'Contains',
            value: 'contains',
            style: 'noop'
          },
          {
            label: '不包含',
            en_label: 'Not contain',
            value: 'not_contain',
            style: 'noop'
          },
          {
            label: '为空',
            en_label: 'Empty',
            value: 'empty',
            style: 'none'
          },
          {
            label: '不为空',
            en_label: 'Not empty',
            value: 'not_empty',
            style: 'none'
          }
        ],
        Text: [
          {
            label: '等于',
            en_label: 'Equal',
            style: 'noop'
          },
          {
            label: '等于其中之一',
            en_label: 'Equal to one of',
            value: 'one_of',
            style: 'tags'
          },
          {
            label: '不等于',
            en_label: 'Not equal',
            value: 'not_equal',
            style: 'noop'
          },
          {
            label: '包含',
            en_label: 'Contains',
            value: 'contains',
            style: 'noop'
          },
          {
            label: '不包含',
            en_label: 'Not contain',
            value: 'not_contain',
            style: 'noop'
          },
          {
            label: '为空',
            en_label: 'Empty',
            value: 'empty',
            style: 'none'
          },
          {
            label: '不为空',
            en_label: 'Not empty',
            value: 'not_empty',
            style: 'none'
          }
        ],
        Number: [
          {
            label: '等于',
            en_label: 'Equal',
            value: 'equal',
            style: 'noop'
          },
          {
            label: '不等于',
            en_label: 'Not equal',
            value: 'not_equal',
            style: 'noop'
          },
          {
            label: '大于',
            en_label: 'Greater than',
            value: 'greater_than',
            style: 'noop'
          },
          {
            label: '大于等于',
            en_label: 'Greater than or equal to',
            value: 'greater_than_equal',
            style: 'noop'
          },
          {
            label: '小于',
            en_label: 'Less than',
            value: 'less_than',
            style: 'noop'
          },
          {
            label: '小于等于',
            en_label: 'Less than or equal to',
            value: 'less_than_equal',
            style: 'noop'
          },
          {
            label: '区间',
            en_label: 'Between',
            value: 'between',
            style: 'range'
          },
          {
            label: '为空',
            en_label: 'Empty',
            value: 'empty',
            style: 'none'
          },
          {
            label: '不为空',
            en_label: 'Not empty',
            value: 'not_empty',
            style: 'none'
          }
        ],
        Time: [
          {
            label: '等于',
            en_label: 'Equal',
            value: 'equal',
            style: 'noop'
          },
          {
            label: '不等于',
            en_label: 'Not equal',
            value: 'not_equal',
            style: 'noop'
          },
          {
            label: '大于',
            en_label: 'Greater than',
            value: 'greater_than',
            style: 'noop'
          },
          {
            label: '大于等于',
            en_label: 'Greater than or equal to',
            value: 'greater_than_equal',
            style: 'noop'
          },
          {
            label: '小于',
            en_label: 'Less than',
            value: 'less_than',
            style: 'noop'
          },
          {
            label: '小于等于',
            en_label: 'Less than or equal to',
            value: 'less_than_equal',
            style: 'noop'
          },
          {
            label: '区间',
            en_label: 'Between',
            value: 'between',
            style: 'range'
          },
          {
            label: '为空',
            en_label: 'Empty',
            value: 'empty',
            style: 'none'
          },
          {
            label: '不为空',
            en_label: 'Not empty',
            value: 'not_empty',
            style: 'none'
          }
        ],
        Date: [
          {
            label: '等于',
            en_label: 'Equal',
            value: 'equal',
            style: 'noop'
          },
          {
            label: '不等于',
            en_label: 'Not equal',
            value: 'not_equal',
            style: 'noop'
          },
          {
            label: '大于',
            en_label: 'Greater than',
            value: 'greater_than',
            style: 'noop'
          },
          {
            label: '大于等于',
            en_label: 'Greater than or equal to',
            value: 'greater_than_equal',
            style: 'noop'
          },
          {
            label: '小于',
            en_label: 'Less than',
            value: 'less_than',
            style: 'noop'
          },
          {
            label: '小于等于',
            en_label: 'Less than or equal to',
            value: 'less_than_equal',
            style: 'noop'
          },
          {
            label: '区间',
            en_label: 'Between',
            value: 'between',
            style: 'range'
          },
          {
            label: '为空',
            en_label: 'Empty',
            value: 'empty',
            style: 'none'
          },
          {
            label: '不为空',
            en_label: 'Not empty',
            value: 'not_empty',
            style: 'none'
          }
        ],
        TimesOperators: [
          {
            label: '至少一次',
            value: 'at_least_once',
            style: 'none'
          },
          {
            label: '无此行为',
            value: 'no_actions',
            style: 'none'
          },
          {
            label: '等于',
            value: 'equal',
            style: 'noop'
          },
          {
            label: '少于',
            value: 'less_than',
            style: 'noop'
          },
          {
            label: '多于',
            value: 'greater_than',
            style: 'noop'
          },
          {
            label: '多于或等于',
            value: 'greater_than_equal',
            style: 'noop'
          },
          {
            label: '介于',
            value: 'between',
            style: 'range'
          }
        ]
      }
    }
  })
}
