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
        /** @private  {boolean}*/
        this.replace = true;
        /** @private  {string}*/
        this.restrict = 'E';
        /** @private  {scope}*/
        this.scope = {
            config: '=',
            instance: '=?',
            theme: '=?'
        };
        /** @private  {string}*/
        this.template = '<div></div>';
    }

    /** @private  */
    link(scope, element, attr) {
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
                    const options = chart.getOption();
                    chart.dispose();
                    chart = echarts.init(element[0], newValue);
                    chart.setOption(options);
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
    static get factory() {
        return new Directive();
    }
}

export default angular.module('angular-echarts-lite', []).directive('lzChart', Directive.factory);