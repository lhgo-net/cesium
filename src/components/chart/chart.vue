<template>
    <div class="chart" :id="props.id">
    </div>
</template>

<script setup>
import { onMounted,defineProps } from "vue"
import * as echarts from "echarts"

const props = defineProps({
    option:Object,
    id:String,
})

onMounted(() => {
    init()
})

function init() {
    const dom = document.querySelector(`#${props.id}`)
    const chart = echarts.init(dom)
    chart.setOption(props.option)
}
</script>

<style scoped>
.chart {
    height: 300px;
    width: 100%;
}
</style>