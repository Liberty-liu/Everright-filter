import { inject, watch, computed, onBeforeUnmount, nextTick, getCurrentInstance, toRaw } from 'vue'
import NAME from '@ER/filter/name.js'
import _ from 'lodash-es'
import { useVuelidate } from '@vuelidate/core'
import { required, requiredIf } from '@vuelidate/validators'
const generateDaysOrHours = (type) => type === 1 ? 'days' : 'hours'
const generateTypeByDaysOrHours = (type) => type === 'days' ? 1 : 2
const includeNameRe = new RegExp(`^(${[NAME.PICKERCOMPONENT, NAME.NUMBERTYPE, NAME.TEXTTYPE, NAME.SELECTTYPE, NAME.TIMETYPE, NAME.DATETYPE, NAME.DATECOMPONENT, NAME.REGIONTYPE, NAME.CASCADERTYPE].join('|')})$`)
class Handle {
  constructor (name) {
    this.handle = ''
    this.state = {
      name,
      fn: new Promise((resolve, reject) => {
        this.handle = resolve
      })
    }
  }

  finished () {
    this.handle()
  }
}
const uniqueId = () => _.uniqueId('types_')
const isNull = (newValue) => (newValue === '' || newValue === null || newValue === undefined || (Array.isArray(newValue) && (!newValue.length || newValue.some(e => isNull(e)))))
export const useCommon = (name, state = {}) => {
  const ER = name === NAME.EVERRIGHTFILTER ? '' : inject('Everright')
  let getData = () => {}
  let setData = () => {}
  let clearData = () => {}
  let vuelidateRules = () => {}
  switch (name) {
    case NAME.EVERRIGHTFILTER:
      getData = (isValidate = true) => {
        if (isValidate) {
          if (!state.children.value.map(e => {
            // if (!e.validate()) {
            //   console.log(e.name)
            // }
            // return {
            //   name: e.name,
            //   state: e.validate()
            // }
            return e.validate()
          }).every(e => {
            // const val = !!e.state
            const val = !!e
            return val
          })) {
            return {}
          }
        }
        const result = {
          filters: state.itemRef.value.map(e => e.getData()).filter(e => e !== false),
          logicalOperator: state.logicalOperator.value
        }
        return result.filters.length ? _.cloneDeep(result) : {}
      }
      setData = (data) => {
        state.loading.value = true
        if (/^(linear|matrix)$/.test(state.props.type)) {
          setTimeout(() => {
            state.transitionName.value = ''
            state.store.value.filters = []
            nextTick(() => {
              const fn = ((data) => {
                const unidimensionalNodes = []
                const deepTraversal = (data, parentId) => {
                  let key = ''
                  let nodes = []
                  if (data.filters) {
                    key = 'filters'
                    nodes = data.filters
                  }
                  if (data.conditions) {
                    key = 'conditions'
                    nodes = data.conditions
                  }
                  if (_.get(data, 'constraint.props', false)) {
                    key = 'props'
                    nodes = data.constraint.props
                  }
                  nodes.forEach(e => {
                    const id = _.uniqueId()
                    unidimensionalNodes.push({
                      id,
                      parentId,
                      data: e
                    })
                    deepTraversal(e, id)
                  })
                }
                deepTraversal(data)
                return {
                  findData (id, type) {
                    let result = []
                    if (type === 'children') {
                      if (!id) {
                        result = unidimensionalNodes.filter(e => !e.parentId)
                      } else {
                        result = unidimensionalNodes.filter(e => e.parentId === id)
                      }
                    }
                    if (type === 'data') {
                      const node = _.find(unidimensionalNodes, { id })
                      return _.isEmpty(node) ? false : node
                    }
                    return result
                  }
                }
              })(data)
              state.remoteData.value = fn
              state.store.value.filters = fn.findData('', 'children').map(e => e.id)
              state.logicalOperator.value = data.logicalOperator
            })
          }, 100)
        }
        if (/^(quick-filter)$/.test(state.props.type)) {
          const pickers = state.children.value.filter(e => e.name === NAME.PICKERCOMPONENT)
          const conditionsData = _.get(data, 'filters[0].conditions', [])
          conditionsData.forEach(e => {
            const findPicker = _.find(pickers, {
              state: {
                property: e.property
              }
            })
            if (!_.isEmpty(findPicker)) {
              nextTick(() => {
                findPicker.state.componentRef.setData(e)
                if (/^(static|dynamic)$/.test(_.get(e, 'value.dateType', false))) {
                  findPicker.state.componentRef.Datecomponent.setData(e)
                }
              })
            }
          })
        }
      }
      break
    case NAME.FILTERITEM:
      getData = () => {
        let result = {
          conditions: state.ruleRef.value.map(e => e.getData()).filter(e => e !== false),
          logicalOperator: state.logicalOperator.value
        }
        if (!result.conditions.length) {
          result = false
        }
        return result
      }
      setData = (data) => {
        state.logicalOperator.value = data.logicalOperator
        // console.log(state.id.value)
        state.rules.value = ER.state.remoteData.findData(state.id.value, 'children').map(e => e.id)
      }
      break
    case NAME.FILTERRULE:
      getData = () => {
        let result = false
        const pickerData = state.pickerRef.value.getData()
        if (_.isObject(pickerData) && pickerData.value === false) {
          result = false
        } else {
          if (pickerData !== false) {
            result = Object.assign(pickerData, state.isShowConstraint.value ? state.constraintRef.value.getData() : {})
          }
        }
        return result
      }
      setData = (data) => {
        const constraint = _.get(data, 'constraint', false)
        state.isShowConstraint.value = !!constraint
      }
      break
    case NAME.CONSTRAINTCOMPONENT:
      getData = () => {
        const result = {}
        if (state.value0.value.indexOf('date') !== -1) {
          result.date = state.dateRef.value.getData()
          if (result.date === false) {
            delete result.date
          }
        }
        if (state.value0.value.indexOf('times') !== -1) {
          result.times = state.timesRef.value.getData()
          if (result.times === false) {
            delete result.times
          }
        }
        if (state.value0.value.indexOf('props') !== -1) {
          const conditions = state.itemRef.value.getData()
          result.props = conditions.conditions
          if (conditions === false) {
            delete result.props
          }
        }
        return _.isEmpty(result)
          ? false
          : {
              constraint: result
            }
      }
      setData = (data) => {
        const handle = new Handle(uniqueId())
        ER.readied.push(handle.state)
        // ER.readied.pause()
        if (data.constraint.times) {
          state.value0.value.push('times')
        }
        if (data.constraint.props) {
          state.value0.value.push('props')
          watch(state.options, (newVal) => {
            if (newVal.length) {
              handle.finished()
            }
          })
        } else {
          handle.finished()
        }
      }
      break
    case NAME.PICKERCOMPONENT:
      getData = () => {
        let result = {
          operator: state.operator.value[1]
        }
        if (!state.isConstraint.value) {
          result.property = state.property.value
        }
        if (state.isDateType.value) {
          result.dateOperator = state.operator.value[0]
        }
        if (!state.isShowOperator.value && !state.isConstraint.value && !/^quick-(search|filter)$/.test(ER.props.type)) {
          delete result.operator
        }
        if (state.operatorStyle.value !== 'none' && state.isShowComponent.value) {
          result.value = state.componentRef.value.getData()
          if (isNull(result.value)) {
            result = false
          }
        }
        return result
      }
      setData = (data) => {
        const handle = new Handle(uniqueId())
        ER.readied.push(handle.state)
        state.property.value = !state.isConstraint.value && data.property
        if (state.isDateType.value) {
          state.operator.value[0] = data.dateOperator
        }
        state.operator.value[1] = state.isConstraint.value ? data.constraint.times.operator : data.operator
        state.emit('listener', {
          type: 'change',
          data: {
            property: state.property.value,
            params: state.params.value,
            operatorStyle: state.operatorStyle.value,
            dateOperator: state.operator[0],
            isReRender: false
          }
        })
        handle.finished()
      }
      vuelidateRules = () => {
        let result = {}
        if (!state.isConstraint.value) {
          result = {
            property: {
              required
            }
          }
        }
        return result
      }
      break
    case NAME.NUMBERTYPE:
      clearData = () => {
        state.value0.value = state.value1.value = null
      }
      getData = () => {
        return state.isRange.value ? [state.value0.value, state.value1.value].sort((a, b) => a - b) : state.value0.value
      }
      setData = (data) => {
        const isTimes = _.get(getCurrentInstance(), 'parent.props.sign', false) === 'times'
        const handle = new Handle(uniqueId())
        const newData = isTimes ? data.constraint.times : data
        if (state.isRange.value) {
          state.value0.value = newData.value[0]
          state.value1.value = newData.value[1]
        } else {
          state.value0.value = newData.value
        }
        handle.finished()
      }
      vuelidateRules = () => {
        const result = {
          value0: {
            required
          }
        }
        if (state.isRange.value) {
          result.value1 = {
            required
          }
        }
        return result
      }
      break
    case NAME.TEXTTYPE:
      clearData = () => {
        state.value0.value = ''
        state.value1.value = []
      }
      getData = () => {
        return state.isTags.value ? state.value1.value : state.value0.value
      }
      setData = (data) => {
        const handle = new Handle(uniqueId())
        ER.readied.push(handle.state)
        if (state.isTags.value) {
          state.value1.value = data.value
        } else {
          state.value0.value = data.value
        }
        handle.finished()
      }
      vuelidateRules = () => {
        const result = {}
        if (state.isTags.value) {
          result.value1 = {
            required
          }
        } else {
          result.value0 = {
            required
          }
        }
        return result
      }
      break
    case NAME.SELECTTYPE:
      clearData = () => {
        state.value0.value = state.isMultiple.value ? [] : ''
      }
      getData = () => {
        return state.value0.value
      }
      setData = (data) => {
        const handle = new Handle(uniqueId())
        ER.readied.push(handle.state)
        state.value0.value = data.value
        handle.finished()
      }
      vuelidateRules = () => {
        return {
          value0: {
            required
          }
        }
      }
      break
    case NAME.TIMETYPE:
      clearData = () => {
        state.value0.value = state.isRange.value ? [] : ''
      }
      getData = () => {
        return state.value0.value
      }
      setData = (data) => {
        const handle = new Handle(uniqueId())
        ER.readied.push(handle.state)
        state.value0.value = data.value
        handle.finished()
      }
      vuelidateRules = () => {
        return {
          value0: {
            required
          }
        }
      }
      break
    case NAME.DATETYPE:
      clearData = () => {
        state.value0.value = state.value1.value = ''
      }
      getData = () => {
        let result = ''
        if (state.dateOperator.value === 'date') {
          result = state.Datecomponent.value.getData()
        } else {
          result = state.isRange.value ? [state.value0.value, state.value1.value].sort((a, b) => a - b) : state.value0.value
        }
        return result
      }
      setData = (data) => {
        const handle = new Handle(uniqueId())
        ER.readied.push(handle.state)
        if (state.dateOperator.value !== 'date') {
          if (state.isRange.value) {
            state.value0.value = data.value[0]
            state.value1.value = data.value[1]
          } else {
            state.value0.value = data.value
          }
        }
        handle.finished()
      }
      vuelidateRules = () => {
        let result = {}
        if (state.dateOperator.value !== 'date') {
          result = {
            value0: {
              required
            }
          }
          if (state.isRange.value) {
            result.value1 = {
              required
            }
          }
        }
        return result
      }
      break
    case NAME.REGIONTYPE:
      clearData = () => {
        state.value0.value = []
      }
      getData = () => {
        return state.value0.value
      }
      setData = (data) => {
        const handle = new Handle(uniqueId())
        ER.readied.push(handle.state)
        state.value0.value = data.value
        handle.finished()
      }
      vuelidateRules = () => {
        return {
          value0: {
            required
          }
        }
      }
      break
    case NAME.CASCADERTYPE:
      clearData = () => {
        state.value0.value = []
      }
      getData = () => {
        return state.value0.value
      }
      setData = (data) => {
        const handle = new Handle(uniqueId())
        ER.readied.push(handle.state)
        state.value0.value = data.value
        handle.finished()
      }
      vuelidateRules = () => {
        return {
          value0: {
            required
          }
        }
      }
      break
    case NAME.DATECOMPONENT:
      clearData = () => {
        state.staticDate.value = ''
        for (const key in state.dynamicDate.value) {
          state.dynamicDate.value[key] = ''
        }
        if (!(state.isRange.value === true && /^(quick-filter)$/.test(ER.props.type))) {
          nextTick(() => {
            state.absolute.value = false
          })
        }
      }
      getData = () => {
        let result = {}
        if (state.absolute.value) {
          result.dateType = 'static'
          result.value = state.staticDate.value
          if (isNull(result.value)) {
            result = false
          }
        } else {
          const dynamicDate = state.dynamicDate.value
          result.dateType = 'dynamic'
          if (dynamicDate.shortcut) {
            const shortcuts = state.shortcuts.value
            const [dateFrom, dateTo] = _.find(shortcuts, { value: dynamicDate.shortcut }).value.split('/')
            result.dateFrom = dateFrom
            result.dateTo = dateTo
          }
          if (dynamicDate.intervalBefore.value) {
            result.dateFrom = `- ${dynamicDate.intervalBefore.value} ${generateDaysOrHours(dynamicDate.intervalBefore.type)}`
            result.dateTo = `- ${state.hasToday.value ? '0' : '1'} ${generateDaysOrHours(dynamicDate.intervalBefore.type)}`
          }
          if (dynamicDate.afterBefore.value) {
            result.dateFrom = `+ ${state.hasToday.value ? '0' : '1'} ${generateDaysOrHours(dynamicDate.afterBefore.type)}`
            result.dateTo = `+ ${dynamicDate.afterBefore.value} ${generateDaysOrHours(dynamicDate.afterBefore.type)}`
          }
          if (dynamicDate.erenowBefore.value) {
            result.dateTo = `- ${dynamicDate.erenowBefore.value} ${generateDaysOrHours(dynamicDate.erenowBefore.type)}`
          }
          if (dynamicDate.intervalBetween.value && dynamicDate.intervalBetween.value.every(e => e !== null)) {
            result.dateFrom = `- ${dynamicDate.intervalBetween.value[1]} ${generateDaysOrHours(dynamicDate.intervalBetween.type)}`
            result.dateTo = `- ${dynamicDate.intervalBetween.value[0]} ${generateDaysOrHours(dynamicDate.intervalBetween.type)}`
          }
          if (isNull(result.dateFrom) || isNull(result.dateTo)) {
            result = false
          }
        }
        return result
      }
      setData = (data) => {
        const handle = new Handle(uniqueId())
        ER.readied.push(handle.state)
        let newData = {}
        if (state.isConstraint.value) {
          newData = {
            value: data.constraint.date
          }
        } else {
          newData = data
        }
        if (newData.value.dateType === 'static') {
          state.absolute.value = true
          state.staticDate.value = newData.value.value
          nextTick(() => {
            state.handleEvent('staticDate', '', false)
          })
        } else {
          const { dateFrom, dateTo } = newData.value
          const finding = _.find(state.shortcuts.value, { value: `${dateFrom}/${dateTo}` })
          if (finding) {
            state.handleEvent('shortcuts', finding)
          } else {
            const re = /^(\-|\+)\s{1}(\d+)\s{1}(days|hours)/
            // const re = /^\-\s{1}(\d+)\s{1}(days|hours)/
            const dynamicDate = state.dynamicDate.value
            nextTick(() => {
              // if (/^- \d+ (days|hours)$/.test(dateTo)) {
              if (dateTo.match(re)[1] === '-') {
                if (/^- (0|1) (days|hours)$/.test(dateTo)) {
                  dynamicDate.intervalBefore = {
                    value: Number(dateFrom.match(re)[2]),
                    type: generateTypeByDaysOrHours(dateFrom.match(re)[3])
                  }
                  state.isShowIncludeToday.value = dateFrom.match(re)[3] === 'days'
                  state.hasToday.value = dateTo === '- 0 days' ? 1 : 0
                } else if (!dateFrom) {
                  dynamicDate.erenowBefore = {
                    value: Number(dateTo.match(re)[2]),
                    type: generateTypeByDaysOrHours(dateTo.match(re)[3])
                  }
                } else {
                  dynamicDate.intervalBetween = {
                    value: [Number(dateTo.match(re)[2]), Number(dateFrom.match(re)[2])],
                    type: generateTypeByDaysOrHours(dateTo.match(re)[3])
                  }
                }
              }
              if (dateTo.match(re)[1] === '+') {
                dynamicDate.afterBefore = {
                  value: Number(dateTo.match(re)[2]),
                  type: generateTypeByDaysOrHours(dateFrom.match(re)[3])
                }
                state.isShowIncludeToday.value = dateFrom.match(re)[3] === 'days'
                state.hasToday.value = dateFrom === '+ 0 days' ? 1 : 0
              }
            })
          }
        }
        handle.finished()
      }
      vuelidateRules = () => {
        const result = {}
        // There is no good solution here because of the computed delay. Perhaps a good solution can be found later
        if (state.isShowSwitchButton.value) {
          result.dynamicDate = {
            required: {
              $required () {
                return state.buttonText.value !== '请选择...'
              }
            }
          }
          if (state.isShowSwitchButton.value && state.isRange.value && state.absolute.value) {
            result.staticDate = {
              required: {
                $required () {
                  return state.absolute.value ? !_.isEmpty(state.staticDate.value) : true
                }
              }
            }
          }
          if (state.isShowSwitchButton.value && state.isRange.value && !state.absolute.value) {
            result.staticDate = {
              required: {
                $required () {
                  return state.absolute.value ? !_.isEmpty(state.staticDate.value) : true
                }
              }
            }
          }
          if (state.isShowSwitchButton.value && !state.isRange.value && !state.absolute.value) {
            result.staticDate = {
              required: {
                $required () {
                  return state.absolute.value ? !_.isEmpty(state.staticDate.value) : true
                }
              }
            }
          }
          if (state.isShowSwitchButton.value && !state.isRange.value && state.absolute.value) {
            result.staticDate = {
              required: {
                $required () {
                  return true
                }
              }
            }
          }
        }
        if (!state.isShowSwitchButton.value && state.isRange.value && state.absolute.value) {
          result.staticDate = {
            required: {
              $required () {
                return !_.isEmpty(state.staticDate.value)
              }
            }
          }
        }
        return result
      }
      break
  }
  if (name !== NAME.EVERRIGHTFILTER) {
    if (!_.isEmpty(ER.state.remoteData)) {
      // setData(resolveData(ER, name, state))
      const remoteData = ER.state.remoteData
      let result = {}
      if (_.get(state, 'id.value', false)) {
        result = remoteData.findData(state.id.value, 'data').data
      }
      setData(result)
    }
  }
  const v$ = useVuelidate(computed(vuelidateRules), state)
  const validate = () => {
    const result = !v$.value.$invalid
    if (!result) {
      v$.value.$reset()
      setTimeout(() => {
        v$.value.$touch()
      }, 0)
    }
    return result
  }
  if (includeNameRe.test(name)) {
    const data = {
      name,
      validate,
      state,
      v$,
      clearData
    }
    ER.state.children.push(data)
    // ER.state.children.push(validate)
    onBeforeUnmount(() => {
      // ER.state.children.splice(ER.state.children.indexOf(validate), 1)
      ER.state.children.splice(ER.state.children.indexOf(data), 1)
    })
  }
  return {
    getData,
    setData,
    clearData,
    v$
  }
}
