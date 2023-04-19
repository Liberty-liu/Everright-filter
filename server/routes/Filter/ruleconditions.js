export default (req, res) => {
  const { property } = req.query
  let result = []
  if (/^(cascader01|cascader02)$/.test(property)) {
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
  } else {
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
  }
  res.json({
    code: 0,
    msg: '',
    data: result
  })
}
