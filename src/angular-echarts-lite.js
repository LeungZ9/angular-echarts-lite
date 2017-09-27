/**
 * Created by LeungZ on 2017/9/13.
 */
import angular from 'angular';
import echarts from 'echarts';

/**
 * Angular directive
 */
class Directive {
    constructor() {
        /** @return {directive properties} */
        return {
            restrict: 'A',
            scope: {
                config: '=',
                instance: '=?',
                theme: '=?'
            },
            link: this.link_
        };
    }

    /** @private  */
    link_(scope, element, attr) {
        /**
         * @param {echartsOptions} options
         * @private
         */
        function setOptions(options) {
            options = options || {};
            options.forceClear && chart.clear();
            if (options.series && options.series.length) {
                chart.hideLoading();
                chart.setOption(options, options.notMerge);
                chart.resize();
            } else {
                chart.showLoading('default', options.errorMsg || { text: '没有数据' });
            }
        }

        var chart = echarts.init(element[0], scope.theme);
        setOptions(scope.config);

        // Check for attribute "unwatch" whether to register scope watch
        if (!attr.hasOwnProperty('unwatch')) {
            scope.$watch(function () {
                return scope.config;
            }, function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    setOptions(newValue);
                }
            }, true);
            scope.$watch(function () {
                return scope.theme;
            }, function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    chart.dispose();
                    chart = echarts.init(element[0], newValue);
                    chart.setOption(scope.config);
                }
            }, true);
        }

        // Check for attribute "instance" whether to bind function
        // to get echarts instance
        if (attr.instance) {
            scope.$evalAsync(function () {
                scope.instance = /** @return {echartsInstance} */ function () {
                    return chart;
                };
            });
        }
    }

    /** @return {directive } */
    static factory() {
        return new Directive();
    }
}

export default angular.module('angular-echarts-lite', []).directive('lzChart', Directive.factory);