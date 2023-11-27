<template>
  <div class="popup">
    <div class="popup-title">密云水库</div>
    <div class="popup-sub-title">
      <div>更新时间：2023-09</div>
      <div class="select"></div>
    </div>
    <div id="popupChart" class="popupChart"></div>
  </div>
</template>

<script>
import * as Echart from 'echarts'
export default {
  methods: {
    iniChart() {
      const dom = document.querySelector('#popupChart')
      const chart = Echart.init(dom)
      const option = {
        title: {
          text: '高钰酸盐指数趋势变化图',
          left: 'center',
          textStyle: {
            color: 'white'
          }
        },
        grid: {
          left: '30px',
          right: '10px',
          bottom: '80px'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255,255,255,0.1)'
            }
          }
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true,
            lineStyle: {
              color: '#15c4e2'
            },
            areaStyle: {
              opacity: 0.8,
              color: new Echart.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(0, 221, 255,1)'
                },
                {
                  offset: 1,
                  color: 'rgba(77, 119, 255,0)'
                }
              ])
            }
          }
        ]
      }
      chart.setOption(option)
    }
  },
  mounted() {
    this.iniChart()
  }
}
</script>

<style lang="less">
.popup{
    background: url('../../assets/img/dialog.png');
    height: 390px;
    width: 400px;
    padding: 40px 30px;
    color: white;
    background-size: cover;
    background-repeat: no-repeat;
    .popup-title{
        font-size: 26px;
        font-weight: 800;
        border-bottom: 2px solid transparent; /* 设置初始的边框，颜色设置为透明 */
        border-image: linear-gradient(to right, rgba(35, 68, 99,0), rgba(35, 68, 99,1),rgba(35, 68, 99,0)); /* 设置渐变边框 */
        border-image-slice: 2; /* 边框切片，可根据需要调整 */
    }
    .popup-sub-title{
        width: 100%;
        font-weight: 1000;
        font-size: 18px;
        margin-top: 10px;
        display: flex;
        .select{
            position: relative;
            // height: 35px;
            // width: 200px;
            // padding: 10px;
            background: url('../../assets/img/select-border.png');
            background-size: cover;
            background-repeat: no-repeat;
            div:nth-child(1){
                flex: 1;
            }
            div:nth-child(2){
                flex: 1;
            }
        }
    }

    .popupChart{
        // width: 200px;
        height: 300px;
    }
}
</style>