import angular from 'angular';
import 'angular-mocks';
import '../src/angular-echarts-lite';

angular.module('angular-echarts-lite.spec', ['angular-echarts-lite']);

describe('angular-echarts-lite.directive', () => {
    let $compile, $rootScope;

    // Load the myApp module, which contains the directive
    beforeEach(angular.mock.module('angular-echarts-lite.spec'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(angular.mock.inject((_$compile_, _$rootScope_) => {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        
        // Minimized configuration of echarts
        $rootScope.config = {
            xAxis: {
                name: 'x',
                data: []
            },
            yAxis: {
                name: 'y',
            },
            series: [
                {
                    type: 'line',
                    data: []
                }
            ]
        };
    }));

    it('should render correct contents', () => {
        // Compile a piece of HTML containing the directive
        const element = $compile('<lz-chart config="config"></lz-chart>')($rootScope);
        $rootScope.$digest();
        expect(element.attr('_echarts_instance_')).to.match(/^ec_\d{13}$/);
        expect(element.find('canvas').length).to.equal(1);
    });

    it('should return correct chart instance', () => {
        // Compile a piece of HTML containing the directive
        const element = $compile('<lz-chart config="config" instance="inst"></lz-chart>')($rootScope);
        $rootScope.$digest();
        expect($rootScope.inst().constructor.name).to.equal('ECharts');
        expect($rootScope.inst().id).to.equal(element.attr('_echarts_instance_'));
    });
});