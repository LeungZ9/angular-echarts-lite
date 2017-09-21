# Angular Echarts lite

AngularJS 1.2+ directive for baidu echarts v3

**[Demo](https://leungz9.github.io/angular-echarts-lite/)** (updated with every release)

## Quick start

Install the library

```
npm install --save angular-echarts-lite
```

Then simply include the correct file in a closing `<script>` tag after angularJS and echarts

```html
<script src="path/to/angular.min.js"></script>
<script src="path/to/echarts.min.js"></script>
<script src="node_modules/angular-echarts-lite/dist/angular-echarts-lite.min.js"></script>
```

Add dependency and declare a demo controller

```js
angular.module("demo", ['angular-echarts-lite'])
    .controller("DemoController", function () {
        this.config = {
            title: {
                text: '对数轴示例',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c}'
            },
            legend: {
                left: 'left',
                data: ['3的指数']
            },
            xAxis: {
                type: 'category',
                name: 'x',
                splitLine: { show: false },
                data: ['一', '二', '三', '四', '五', '六', '七', '八', '九']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            yAxis: {
                type: 'log',
                name: 'y'
            },
            series: [
                {
                    name: '3的指数',
                    type: 'line',
                    data: [1, 3, 9, 27, 81, 247, 741, 2223, 6669]
                }
            ]
        };
    })
```

Add this markup into page
```html
<div ng-controller="DemoController as vm">
    <lz-chart config="vm.config" style="width:480px;height:480px"></lz-chart>
</div>
```

That's all! Now you can get up and running the demo.

## Use angular echarts lite with webpack

You can obtain angular echarts lite directly in project via webpack

```js
require('angular-echarts-lite')
```

## Usage

```html
<lz-chart config theme instance unwatch></lz-chart>
```

You can find all possible attribute for the directive in the table below:

Attribute  | Usage
---        | ---
config     | `Object`, set the configuration of chart by using [echarts options](https://ecomfe.github.io/echarts-doc/public/en/option.html)<br>Here is some additional configuration:<br>**forceClear** `boolean`, whether to remove chart before update<br>**notMerge** `boolean`, whether not to merge with previous<br>**errorMsg** `Object`, configuration item while error, [more detail](https://ecomfe.github.io/echarts-doc/public/en/api.html#echartsInstance.showLoading)
theme      | `Object` or `string`,  set the theme of chart
instance   | Bind a function to get chart instance
unwatch    | Cancel scope watch for `config` and `theme` attribute

## Running the demo

Setup the repo:

```
git clone https://github.com/LeungZ9/angular-echarts-lite.git && cd angular-echarts-lite
npm i
```

Run the development server:

```
cd /path/to/angular-echarts-lite
npm run dev
```