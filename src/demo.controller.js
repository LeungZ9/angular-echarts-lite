class Controller {
    constructor($timeout) {
        this.timeout_ = $timeout;
        this.init_();
    }

    init_() {
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
        this.configTxt = angular.toJson(this.config, true);
    }

    configTxtChange() {
        this.timeout_.cancel(timeoutInst);
        timeoutInst = this.timeout_(()=> {
            this.config = angular.fromJson(this.configTxt);
            // If not register scope watcher, update chart via API on chart instance
            if (this.unwatch) {
                if (!this.chartInst) {
                    this.chartInst = this.chartInst();
                }
                this.chartInst.setOption(this.config);
            }
        }, 300);
    }

    themeChange() {
        if (this.unwatch) {
            this.chartInst.dispose();
            this.chartInst = echarts.init(this.chartInst.getDom(), this.theme);
            this.chartInst.setOption(this.config);
        }
    }
}

export default Controller;