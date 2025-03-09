<template>
  <div id="bar"></div>
  <!-- <div w50rem h25rem flex="~ col" justify-center items-center bg-dark>
    <div>
      <dv-capsule-chart :config="config" style="height: 20rem" />
    </div>
  </div> -->
</template>
<script setup>
import { reactive, onMounted } from "vue";
import * as echarts from "echarts";

const config = reactive({
  data: [
    {
      name: "2023",
      value: 42.97,
    },
    {
      name: "2022",
      value: 42.51,
    },
    {
      name: "2021",
      value: 48.99,
    },
    {
      name: "2020",
      value: 51.75,
    },
    {
      name: "2019",
      value: 53.49,
    },
  ],
  colors: ["#e062ae", "#fb7293", "#e690d1", "#32c5e9", "#96bfff"],
  unit: "平方千米",
  labelNum: 8,
});

onMounted(() => {
  var chartDom = document.getElementById("bar");
  var myChart = echarts.init(chartDom);
  var data = [
    {
      name: "2023年",
      value: 42.97,
    },
    {
      name: "2022年",
      value: 42.51,
    },
    {
      name: "2021年",
      value: 48.99,
    },
    {
      name: "2020年",
      value: 51.75,
    },
    {
      name: "2019年",
      value: 53.49,
    },
  ];
  var xData = [],
    yData = [];
  var min = 50;
  data.map(function (a, b) {
    xData.push(a.name);
    if (a.value === 0) {
      yData.push(a.value + min);
    } else {
      yData.push(a.value);
    }
  });
  var option = {
    // backgroundColor: "#111c4e",
    color: ["#3398DB"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
        lineStyle: {
          opacity: 0,
        },
      },
      formatter: function (prams) {
        return "面积" + prams[0].data + "万平方千米";
      },
    },
    legend: {
      data: ["直接访问", "背景"],
      show: false,
    },
    grid: {
      left: "0%",
      right: "0%",
      bottom: "5%",
      top: "7%",
      height: "85%",
      containLabel: true,
      z: 22,
    },
    xAxis: [
      {
        type: "category",
        gridIndex: 0,
        data: xData,
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          lineStyle: {
            color: "#0c3b71",
          },
        },
        axisLabel: {
          show: true,
          color: "rgb(170,170,170)",
          fontSize: 16,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        gridIndex: 0,
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#0c3b71",
          },
        },
        axisLabel: {
          color: "rgb(170,170,170)",
          formatter: "{value} 万",
        },
      },
      {
        type: "value",
        gridIndex: 0,
        min: min,
        max: 100,
        splitNumber: 12,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"],
          },
        },
      },
    ],
    series: [
      {
        name: "面积",
        type: "bar",
        barWidth: "30%",
        xAxisIndex: 0,
        yAxisIndex: 0,
        itemStyle: {
          normal: {
            barBorderRadius: 30,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#00feff",
              },
              {
                offset: 0.5,
                color: "#027eff",
              },
              {
                offset: 1,
                color: "#0286ff",
              },
            ]),
          },
        },
        data: yData,
        zlevel: 11,
      },
      {
        name: "背景",
        type: "bar",
        barWidth: "50%",
        xAxisIndex: 0,
        yAxisIndex: 1,
        barGap: "-135%",
        data: [100, 100, 100, 100, 100, 100, 100],
        itemStyle: {
          normal: {
            color: "rgba(255,255,255,0.1)",
          },
        },
        zlevel: 9,
      },
    ],
  };
  option && myChart.setOption(option);
});
</script>

<style scoped>
#bar {
  /* width: ; */
  height: 95%;
}
</style>
