import LowCodeDb from '../models/LowCode.js'
import operators from './operators.js'
import _ from 'lodash-es'
export default {
  async getOptions (req, res) {
    const {
      objid
    } = req.query
    try {
      if (!objid) {
        res.json({
          code: 1,
          msg: 'objid is required'
        })
      } else {
        const data = await LowCodeDb.getAllFieldsData(objid)
        const result = {}
        result.options = data.content.map((e) => {
          const result = {
            label: e.label,
            value: e.key,
            operatorKey: e.type
          }
          switch (e.type) {
            case 'signature':
              result.renderType = 'NONE'
              break
            case 'input':
            case 'textarea':
            case 'html':
              result.operatorKey = 'input'
              result.renderType = 'TEXT'
              break
            case 'region':
              result.renderType = 'REGION'
              result.multiple = false
              break
            case 'select':
            case 'radio':
            case 'checkbox':
              result.operatorKey = 'select'
              result.renderType = 'SELECT'
              result.multiple = false
              result.multipleLimit = 2
              break
            case 'number':
            case 'rate':
            case 'slider':
              result.operatorKey = 'number'
              result.renderType = 'NUMBER'
              break
            case 'time':
              result.renderType = 'TIME'
              result.format = 'HH:mm:ss'
              break
            case 'date':
              result.renderType = 'DATE'
              break
            case 'switch':
              result.renderType = 'NONE'
              break
            case 'cascader':
              result.renderType = 'CASCADER'
              result.multiple = true
              result.operatorKey = 'select'
              break
            case 'uploadfile':
              result.renderType = 'NONE'
              result.operatorKey = 'signature'
              break
            case '':
              break
          }
          return result
        })
        result.operators = operators
        res.json({
          code: 0,
          data: result
        })
      }
    } catch (e) {
      res.json({
        code: 1,
        msg: e.toString()
      })
    }
  },
  async getRuleconditions (req, res) {
    const {
      objid,
      property
    } = req.query
    console.log(123123)
    try {
      if (!objid || !property) {
        res.json({
          code: 1,
          msg: 'Objid and property is required'
        })
      } else {
        const data = await LowCodeDb.getAllFieldsData(objid)
        let result = []
        const findProperty = _.find(data.content, { key: property })
        if (findProperty.type === 'select') {
          result = [
            {
              zh_label: '未知',
              label: '未知',
              en_label: 'Unknown',
              value: '0'
            },
            {
              zh_label: '男',
              label: '男',
              en_label: 'Male',
              value: '1'
            },
            {
              zh_label: '女',
              label: '女',
              en_label: 'Female',
              value: '2'
            }
          ]
        } else {
          result = [
            {
              value: 'any',
              label: '任意图文'
            },
            {
              value: 'name',
              label: '选择一个图文',
              children: [
                {
                  id: '153218',
                  label: '无小程序的多图文',
                  value: 'name#####153218',
                  children: [
                    {
                      value: 'name#####any',
                      label: '任意图文'
                    },
                    {
                      id: '152723',
                      label: '125|summary|微信建|多图文1----自动同步？ - Copy',
                      value: 'name#####152723'
                    }
                  ]
                }, {
                  id: '152725',
                  label: '成为大人的一瞬间 - [delete]',
                  value: 'name#####152725'
                }, {
                  id: '152724',
                  label: '130 linkcode',
                  value: 'name#####152724'
                }, {
                  id: '152705',
                  label: '130 linkcode',
                  value: 'name#####152705'
                }, {
                  id: '152707',
                  label: '130 linkcode - Copy',
                  value: 'name#####152707'
                }, {
                  id: '152723',
                  label: '125|summary|微信建|多图文1----自动同步？ - Copy',
                  value: 'name#####152723'
                }, {
                  id: '54589',
                  label: '125|summary|微信建|多图文1----自动同步？',
                  value: 'name#####54589'
                }, {
                  id: '152709',
                  label: 'qqqq',
                  value: 'name#####152709'
                }, {
                  id: '152708',
                  label: '图片位置问题',
                  value: 'name#####152708'
                }, {
                  id: '152706',
                  label: '触发',
                  value: 'name#####152706'
                }, {
                  id: '151687',
                  label: '128|阅读数|老数据',
                  value: 'name#####151687'
                }, {
                  id: '152435',
                  label: 'test910 - Copy',
                  value: 'name#####152435'
                }, {
                  id: '152618',
                  label: '非原创！！！！',
                  value: 'name#####152618'
                }, {
                  id: '152617',
                  label: '在白名单内 显示转载--测试真实预览有留言1',
                  value: 'name#####152617'
                }, {
                  id: '152616',
                  label: '在白名单内 显示转载--测试真实预览有留言1',
                  value: 'name#####152616'
                }, {
                  id: '152622',
                  label: '在白名单内 显示转载--测试真实预览有留言1',
                  value: 'name#####152622'
                }, {
                  id: '152621',
                  label: '在白名单内 显示转载--测试真实预览有留言1',
                  value: 'name#####152621'
                }, {
                  id: '152620',
                  label: '在白名单内 显示转载--测试真实预览有留言1',
                  value: 'name#####152620'
                }, {
                  id: '152619',
                  label: '在白名单内 显示转载--测试真实预览有留言1',
                  value: 'name#####152619'
                }, {
                  id: '152614',
                  label: '在白名单内 显示转载--测试真实预览有留言1',
                  value: 'name#####152614'
                }
              ]
            }
          ]
        }
        res.json({
          code: 0,
          data: result
        })
      }
    } catch (e) {
      res.json({
        code: 1,
        msg: e.toString()
      })
    }
  }
}
