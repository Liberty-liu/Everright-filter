<p align="center"><img height="200px" src="https://github.com/Liberty-liu/Liberty-liu/assets/21301475/0d71a431-d2d4-4f67-b8bb-d230f7dc258b"></p>
<h1 align="center">Everright-filter</h1>

[简体中文](./README.zh-cn.md) | English

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

Everright-filter is a user interface that easily generates any type of query statement, making filtering and filtering data a breeze. Provide a variety of UI interfaces to enable different business scenarios.

![filter](https://github.com/Liberty-liu/Everright-filter/assets/21301475/2a55af5a-800a-49cd-9abe-e422cf42aabc)

## Features

* 1.Supports filtering of multiple data types, including string, number, dropdown, cascade, region, date and time. Whether you need to filter different types of data, it can meet your needs.
* 2.Provides a wealth of operators, such as equal to, not equal to, greater than, less than, interval, etc., allowing you to flexibly define filtering rules based on specific conditions.
* 3.Provides great flexibility. It supports filtering on date, year, month and day. It also supports the selection of relative time and absolute time, such as today, this week, this month, this year, past N days/hours, future N days/hours, etc. This makes date filtering more flexible and can meet the needs of various time dimensions.
* 4.Support conditional grouping settings, you can use logical operators (AND/OR) to combine multiple conditions to implement complex data filtering logic. Data that meets multiple conditions can be filtered out more precisely to meet the needs of advanced data analysis and mining.
* 5.For behavioral data, it supports setting start and end time, limit times and limit attributes. You can precisely filter out actions that occurred within a specific time period, and further filter based on frequency and attribute conditions.
* 6.Each filter type is extracted and used separately, and can be easily embedded into different UI interfaces. Whether it is a search box, a filter panel or a table header, everright-filter can provide consistent functions and data structures, eliminating the need to develop separate filter functions for different interfaces, saving development resources and time.
* 7.Developers can easily configure the data structure of the required functions according to the document UI interface, saving the tedious manual coding and debugging process.
* 8.Support Chinese and English

## Explanation of the different builds
In the [dist/ directory](https://unpkg.com/browse/everright-filter@1.1.0/dist/) of the npm package you will find the different builds

- `without-element-plus`(element-plus is required) `Default`
- `with-element-plus`(Built-in element-plus)

|   | Excludes element-plus(default)  | Includes element-plus(v2.3.3) |
| ------------- | ------------- | ------------- |
| UMD | EverrightFilter-without-element-plus.umd.cjs | EverrightFilter-with-element-plus.umd.cjs |
| ES | EverrightFilter-without-element-plus.js | EverrightFilter-with-element-plus.js |
| IIFE | EverrightFilter-without-element-plus.iife.js | EverrightFilter-with-element-plus.iife.js |
| css | EverrightFilter-without-element-plus.css | EverrightFilter-with-element-plus.css |

<details>
  <summary>Click Me to see which components are built in</summary>

#### Includes element-plus(v2.3.3)

Based on ES modules tree shaking

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

+ [Get Started](https://everright.site/en/filter/started.html)
+ [Docs](https://everright.site/en/filter/doc.html)

## Examples

+ [linear](https://everright.site/demo/filter/linear.html?lang=en) `Application Scenario: Suitable for data filtering`
+ [matrix](https://everright.site/demo/filter/matrix.html?lang=en) `Application Scenario: Suitable for data filtering`
+ [quick-search](https://everright.site/demo/filter/quick-search.html?lang=en) `Application Scenario: Suitable for search`
+ [quick-filter](https://everright.site/demo/filter/quick-filter.html?lang=en) `Application Scenario: Suitable for filtering in a column of the list`
+ [See examples on codepen](https://codepen.io/liberty-liu/pen/BaGvrjx) `linear、matrix`

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

