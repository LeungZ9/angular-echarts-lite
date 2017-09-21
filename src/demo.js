import angular from "angular";
import "angular-echarts-lite";
import controller from "demo.controller"

angular.module("demo", ['angular-echarts-lite']).controller("DemoController", controller);
