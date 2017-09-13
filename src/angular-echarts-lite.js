/**
 * Created by LeungZ on 2017/9/13.
 */
import angular from 'angular';
import echarts from 'echarts';
import controller from './controller';

class Directive {
    constructor() {
        this.replace = true;
        this.restrict = 'E';
        this.scope = {
            model:'=',
            config: '=',
            theme: '='
        };
        this.template = '<div></div>';
        this.controller = controller;
    }

    link(scope, element, attr, ctrl) {
        ctrl;
        echarts;
        // To do
    }

    static factory() {
        return new Directive();
    }
}

export default angular.module('angular-echarts-lite', []).directive('lzChart', Directive.factory);