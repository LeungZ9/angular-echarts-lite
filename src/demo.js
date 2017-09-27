import angular from 'angular';
import echarts from 'echarts';
import 'echarts/theme/vintage';
import 'echarts/theme/dark';
import 'echarts/theme/macarons';
import 'angular-echarts-lite';

angular.module('demo', ['angular-echarts-lite'])
    /*eslint angular/file-name: [off]*/
    .controller('DemoController', ['$timeout', function ($timeout) {
        var timeout, chartInst, vm = this;
        
        vm.config = { //Init echarts option
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
        vm.configTxt = angular.toJson(vm.config, true);

        vm.configTxtChange = function(){
            $timeout.cancel(timeout);
            timeout = $timeout((function(){
                try {
                    vm.config = angular.fromJson(vm.configTxt);
                } catch(e) {
                    alert(e);
                }
                
                // If not register scope watcher, update chart via API on chart instance
                if(vm.unwatch){
                    if(!chartInst){
                        chartInst = vm.chartInst();
                    }
                    chartInst.setOption(vm.config);
                }
            }), 300);
        };

        // If not register scope watcher, update chart via API on chart instance
        vm.themeChange = function(){
            if(vm.unwatch){
                chartInst.dispose();
                chartInst = echarts.init(chartInst.getDom(), vm.theme);
                chartInst.setOption(vm.config);
            }
        };

        vm.chartInit = function () {
            $timeout((function () {
                chartInst = vm.chartInst();
            }), 0, false);
        };
    }]);