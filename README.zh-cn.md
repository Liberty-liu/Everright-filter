<p align="center"><img height="200px" src="https://github.com/Liberty-liu/Liberty-liu/assets/21301475/0d71a431-d2d4-4f67-b8bb-d230f7dc258b"></p>
<h1 align="center">Everright-filter</h1>

[English](./README.md) | 简体中文

[![vue](https://img.shields.io/badge/vue-%3E%3D%203-green.svg)](https://vuejs.org/)
[![element-plus](https://img.shields.io/badge/element--plus-%3E%3D%202.3.1-green.svg)](https://element-plus.gitee.io/)
[![@vant/area-data](https://img.shields.io/badge/@vant/area--data-%3E%3D%201.4.1-green.svg)](https://github.com/vant-ui/vant.git)
[![@vue/shared](https://img.shields.io/badge/@vue/shared-%3E%3D%203.2.45-green.svg)](https://github.com/vuejs/core.git)
[![lodash](https://img.shields.io/badge/lodash--es-%3E%3D%204.17.21-green.svg)](https://lodash.com/custom-builds)
[![async](https://img.shields.io/badge/async-%3E%3D%203.2.4-green.svg)](https://caolan.github.io/async/)
[![@vuelidate/core](https://img.shields.io/badge/@vuelidate/core-%3E%3D%202.0.0-green.svg)](https://github.com/vuelidate/vuelidate)
[![@vuelidate/validators](https://img.shields.io/badge/@vuelidate/validators-%3E%3D%202.0.0-green.svg)](https://github.com/vuelidate/vuelidate)
[![axios](https://img.shields.io/badge/axios-%3E%3D%201.3.4-green.svg)](https://github.com/axios/axios)
[![nzh](https://img.shields.io/badge/nzh-%3E%3D%201.0.8-green.svg)](https://github.com/cnwhy/nzh.git)
[![written-number](https://img.shields.io/badge/written--number-%3E%3D%200.11.1-green.svg)](https://github.com/yamadapc/js-written-number)
[![vite](https://img.shields.io/badge/vite-%3E%3D%203.2.5-green.svg)](https://github.com/vitejs/vite.git)
[![unplugin-vue-components](https://img.shields.io/badge/unplugin--vue--components-0.25.1-green.svg)](https://github.com/antfu/unplugin-vue-components)

**[中文主页](https://everright.site/filter/introduction.html)** | **[ENGLISH HOMEPAGE](https://everright.site/en/filter/introduction.html)**

Everright-filter是一个通过用户界面轻松生成任何类型的查询语句，使得筛选和过滤数据变得轻而易举。提供多种UI界面，赋能不同的业务场景。

![filter](https://github.com/Liberty-liu/Everright-filter/assets/21301475/2a55af5a-800a-49cd-9abe-e422cf42aabc)

## Features

* 1.支持多种数据类型的筛选，包括字符串、数字、下拉、级联、地区、日期和时间。无论你需要对不同类型的数据进行筛选，都能满足你的需求。
* 2.提供了丰富的操作符，如等于、不等于、大于、小于、区间等，让你能够根据具体条件灵活地定义筛选规则。
* 3.提供了极大的灵活性。它支持对日期、年、月和日进行筛选。还支持相对时间和绝对时间的选择，如今日、本周、本月、今年、过去N天/小时、未来N天/小时等。这使得日期筛选更加灵活，能够满足各种时间维度的需求。
* 4.支持条件的分组设置，可以通过使用逻辑运算符（AND/OR）组合多个条件，实现复杂的数据筛选逻辑。可以更精确地筛选出符合多个条件的数据，满足高级数据分析和挖掘的需求。
* 5.针对行为数据，支持设置起止时间、限制次数和限制属性。你可以精确地筛选出特定时间段内发生的行为，并根据次数和属性条件进行进一步过滤。
* 6.每个筛选类型单独抽离出来使用，可以轻松嵌入到不同的UI界面中。无论是搜索框、筛选面板还是表格的表头，everright-filter都能提供一致的功能和数据结构，无需为不同界面单独开发筛选功能，节省了开发资源和时间。
* 7.开发人员可以根据文档UI界面轻松配置所需功能的数据结构，节省了繁琐的手动编码和调试过程。
* 8.支持中文和英文

## Explanation of the different builds
In the [dist/ directory](https://unpkg.com/browse/everright-filter@1.1.0/dist/) of the npm package you will find the different builds

|   | Excludes element-plus(default)  | Includes element-plus(v2.3.3) |
| ------------- | ------------- | ------------- |
| UMD | EverrightFilter-without-element-plus.umd.cjs | EverrightFilter-with-element-plus.umd.cjs |
| ES | EverrightFilter-without-element-plus.js | EverrightFilter-with-element-plus.js |
| IIFE | EverrightFilter-without-element-plus.iife.js | EverrightFilter-with-element-plus.iife.js |
| css | EverrightFilter-without-element-plus.css | EverrightFilter-with-element-plus.css |

<details>
  <summary>点击查看element-plus哪些组件被包含其中</summary>

#### Includes element-plus(v2.3.3)
| element-plus components |
|------------------|
| ElButton         |
| ElCascader       |
| ElCheckbox       |
| ElCheckboxGroup  |
| ElDatePicker     |
| ElIcon           |
| ElInput          |
| ElInputNumber    |
| ElOption         |
| ElPopover        |
| ElScrollbar      |
| ElSelect         |
| ElSwitch         |
| ElTabPane        |
| ElTabs           |
| ElTag            |
| ElTimePicker     |
| ElTooltip        |
| vLoading         |

</details>

## Docs

+ [Get Started](https://everright.site/filter/started.html)
+ [Docs](https://everright.site/filter/doc.html)

## Examples

+ [linear](https://everright.site/demo/filter/linear.html?lang=zh-cn) `应用场景: 适用于数据筛选`
+ [matrix](https://everright.site/demo/filter/matrix.html?lang=zh-cn) `应用场景: 适用于数据筛选`
+ [quick-search](https://everright.site/demo/filter/quick-search.html?lang=zh-cn) `应用场景: 适用于搜索`
+ [quick-filter](https://everright.site/demo/filter/quick-filter.html?lang=zh-cn) `应用场景: 适用于在列表某一列筛选`

## Sample screenshot

### text
![text](https://github.com/Liberty-liu/Everright-filter/assets/21301475/f4c67762-60c0-44f1-bf6d-726660988309)

### number
![number](https://github.com/Liberty-liu/Everright-filter/assets/21301475/048b03a4-196d-49e0-b816-7c8ea525c50d)

### time
![time](https://github.com/Liberty-liu/Everright-filter/assets/21301475/65be8861-458b-423b-b50c-d34f97da431b)

### date
![date](https://github.com/Liberty-liu/Everright-filter/assets/21301475/c4669a5b-2a21-4d1b-b3c6-b390898ca3fd)

### cascader
![cascader](https://github.com/Liberty-liu/Everright-filter/assets/21301475/8ef740f5-f7bb-4e1d-8608-5a1bb7578e77)

### select
![cascader](https://github.com/Liberty-liu/Everright-filter/assets/21301475/c03357ae-73ce-43ff-b5dd-a65e4a4330b9)

### linear
![image](https://github.com/Liberty-liu/Everright-filter/assets/21301475/77194eeb-56dd-409e-9876-dbec7a332c11)

### matrix
![image](https://github.com/Liberty-liu/Everright-filter/assets/21301475/c0a5ff74-332a-4843-9ef8-29bd9f369bac)

### quick-search
![image](https://github.com/Liberty-liu/Everright-filter/assets/21301475/02ff7512-aa1c-43f2-8767-3cbd3837dfae)

### quick-filter
![image](https://github.com/Liberty-liu/Everright-filter/assets/21301475/a815d7fb-7425-4697-bf31-fb48899503e0)

