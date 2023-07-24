<template>
    <div class="app-container">
        <l-header></l-header>
        <l-sider position="left">
            <!-- <v-sheet> -->
            <!-- <div>fsdafsda</div> -->
            <div class="chart-container">
                <l-line :option="option" id="chart1"></l-line>
            </div>
            <div class="chart-container">
                <l-line :option="option" id="chart2"></l-line>
            </div>
            <div class="chart-container">
                <l-line :option="option" id="chart3"></l-line>
            </div>
            <!-- </v-sheet> -->
        </l-sider>
        <l-sider position="right">
            <div class="chart-container">
                <l-line :option="option" id="chart4"></l-line>
            </div>
            <div class="chart-container">
                <l-line :option="option" id="chart5"></l-line>
            </div>
            <div class="chart-container">
                <l-line :option="option" id="chart6"></l-line>
            </div>
        </l-sider>
        <l-map></l-map>
        <l-nav>
            <div style="color:white;text-align: center;">
                <ul>
                    <li>地形观测</li>
                    <li>建筑模型</li>
                </ul>
            </div>
        </l-nav>
    </div>
</template>

<script setup>
import lMap from '@/components/map.vue'
import lHeader from '@/components/header.vue'
import lSider from '@/components/sider.vue'
import lNav from '@/components/nav.vue'
import lLine from '@/components/chart/chart.vue'

import * as echarts from "echarts"

const option = {
    title: {
        text: '未定义的数据',
        textStyle: {
            color: 'white'
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985',
            },
        },
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
                color: 'white'
            },
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
    ],
    yAxis: [
        {
            type: 'value',
            axisLabel: {
                color: 'white'
            }
        },
    ],
    series: [
        {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            smooth: true,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(128, 255, 165)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(1, 191, 236)'
                    }
                ])
            },
            emphasis: {
                focus: 'series',
            },
            data: [120, 132, 101, 134, 90, 230, 210],
        },
    ],
}
</script>

<style scoped lang="less">
.app-container {
    position: relative;
}

.chart-container {
    height: 30vh;
}
ul{
    margin: 0;
    padding: 0;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    li{
        list-style: none;
        padding: 5px;
    }
}
/* .right-container,.left-container{
    position: absolute;
    top: 64px;
} */
</style>