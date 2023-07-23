<template>
    <div class="app-container">
        <l-header></l-header>
        <l-sider position="left">
            <!-- <v-sheet> -->
            <!-- <div>fsdafsda</div> -->
            <l-line :option="option" id="chart1"></l-line>
            <l-line :option="option" id="chart2"></l-line>
            <l-line :option="option" id="chart3"></l-line>
            <!-- </v-sheet> -->
        </l-sider>
        <l-sider position="right">
            <l-line :option="option" id="chart4"></l-line>
            <l-line :option="option" id="chart5"></l-line>
            <l-line :option="option" id="chart6"></l-line>
        </l-sider>
        <l-map></l-map>
        <l-nav>
            <div>fsdafds</div>
        </l-nav>
    </div>
</template>

<script setup>
import lMap from "@/components/map.vue"
import lHeader from "@/components/header.vue"
import lSider from "@/components/sider.vue"
import lNav from "@/components/nav.vue"
import lLine from "@/components/chart/chart.vue"

const option = {
    title: {
        text: 'Stacked Area Chart'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
        },
    ]
}

</script>

<style scoped>
.app-container {
    position: relative;
}

/* .right-container,.left-container{
    position: absolute;
    top: 64px;
} */
</style>