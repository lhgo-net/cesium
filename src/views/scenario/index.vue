<template>
  <div class="container">
    <!-- top -->
    <div class="content-top">
      <h2>
        水生态环境大数据应用平台
      </h2>
    </div>
    <div class="top-nav">
      <top-select @onChange="onChangeSectionDelamination"></top-select>
    </div>
    <!-- <top-select @onSwitch="onSwitch" @onLayerChage="onLayerChage" @onChangeSectionDelamination="onChangeSectionDelamination"></top-select> -->
    <div class="content-left">
      <div>
        <s-box :title="'全国水环境概况'">
          <div>
            <div class="water-title">断面数据量：{{}}</div>
            <div class="water-container">
              <div class="data">
                <div class="level">
                  <div>
                    <h2 style="color: aqua;">80%</h2>
                    <span>优良率</span>
                  </div>
                </div>
                <div class="water-text">
                  <span>目标</span>
                  <span style="color: aqua;text-indent: 20px;">12</span>
                </div>
                <div class="water-text">
                  <span>同比</span>
                  <span style="color: aqua;text-indent: 20px;">12</span>
                  <span class="icon-up"></span>
                </div>
              </div>
              <div class="data">
                <div class="level">
                  <div>
                    <h2 style="color: aqua;">80%</h2>
                    <span>优良率</span>
                  </div>
                </div>
                <div class="water-text">
                  <span>目标</span>
                  <span style="color: aqua;text-indent: 20px;">12</span>
                </div>
                <div class="water-text">
                  <span>同比</span>
                  <span style="color: aqua;text-indent: 20px;">12</span>
                  <span class="icon-up"></span>
                </div>
              </div>
            </div>
          </div>
        </s-box>
      </div>
      <div>
        <s-box :title="'水质统计'">
          <div id="pieChart"></div>
        </s-box>
      </div>
      <div>
        <s-box :title="'各流域水质情况'">
          <div id="barChart"></div>
        </s-box>
      </div>
    </div>
    <div class="content-right">
      <div>
        <side-right :show-section-delamination="sectionDelamination"></side-right>
      </div>
    </div>
    <div class="content-bottom">
    </div>
    <l-map @ready="ready"></l-map>
  </div>
</template>

<script>
import box from './box.vue'
// import topSelect from './top-select.vue'
import topSelect from './nav.vue'
import sideRight from './right/index.vue'
import * as Echart from 'echarts'
import { TDT_TOKEN, TDT_SUBBDOMAINS } from './config/index'
import gyPolygon from '@/assets/json/贵州省.json'
export default {
  components: {
    SBox: box,
    topSelect,
    sideRight
  },
  data() {
    return {
      sectionDelamination: false,
      viewer: null,
      waterDataSource: null
    }
  },
  methods: {
    ready(viewer) {
      this.viewer = viewer
      const promise = Cesium.GeoJsonDataSource.load(gyPolygon)
      promise.then(dataSource => {
        viewer.dataSources.add(dataSource)
        const entities = dataSource.entities.values

        for (let i = 0; i < entities.length; i++) {
          const entity = entities[i]
          entity.polygon.material = Cesium.Color.DEEPSKYBLUE.withAlpha(0.5)
          entity.polygon.outline = false
          entity.polygon.extrudedHeight = 5000
        }
      })
      // viewer.zoomTo(viewer.entities)
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(106.713478, 26.578343, 800000.0), // 设置高度
        orientation: {
          pitch: Cesium.Math.toRadians(-90), // 设置俯仰角
          heading: Cesium.Math.toRadians(0), // 设置偏航角
          roll: 0.0 // 设置滚转角
        }
      })
      this.onSwitch(true)
    },
    onSwitch(item) {
      // if (item) {
      //   this.waterDataSource = new Cesium.CustomDataSource('water')
      //   this.viewer.dataSources.add(this.waterDataSource)
      //   const promise = Cesium.GeoJsonDataSource.load(chinaNineWater)
      //   promise.then(dataSource => {
      //     this.viewer.dataSources.add(dataSource)
      //   })
      // } else {
      //   console.log(this.waterDataSource)
      //   this.viewer.dataSources.remove(this.waterDataSource)
      // }
    },
    onLayerChage(item) {
      const arr = item.key.split('_')
      const providerImage = new Cesium.ImageryLayer(
        new Cesium.WebMapTileServiceImageryProvider({
          url: `http://{s}.tianditu.com/${item.key}/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=${arr[0]}&tileMatrixSet=${arr[1]}&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=${TDT_TOKEN}`,
          layer: item.key,
          style: 'default',
          format: 'image/jpeg',
          tileMatrixSetID: 'GoogleMapsCompatible',
          subdomains: TDT_SUBBDOMAINS,
          minimumLevel: 0,
          maximumLevel: 18
        })
      )
      this.viewer.imageryLayers.add(providerImage)
    },
    onChangeSectionDelamination(val) {
      this.sectionDelamination = val
    },
    initPieChart() {
      const dom = document.querySelector('#pieChart')
      const chart = Echart.init(dom)
      const colors = ['rgba(92, 123, 217,.8)', 'rgba(145, 204, 117,.8)', 'rgba(250, 200, 88,.8)', 'rgba(238, 102, 102,.8)', 'rgba(115, 192, 222,.8)', 'rgba(59, 162, 114,.8)']
      const option = {
        legend: {
          top: 'top',
          icon: 'circle',
          align: 'right',
          textStyle: {
            color: '#fff'
          }
        },
        // toolbox: {
        //   show: true,
        //   feature: {
        //     mark: { show: true },
        //     dataView: { show: true, readOnly: false },
        //     restore: { show: true },
        //     saveAsImage: { show: true }
        //   }
        // },
        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [20, 80],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 2
            },
            data: [
              {
                value: 40,
                name: 'rose 1',
                itemStyle: {
                  color: colors[0],
                  borderColor: colors[0],
                  borderWidth: 4
                },
                label: {
                  backgroundColor: colors[0],
                  padding: 2,
                  borderRadius: 2,
                  color: 'white'
                }
              },
              {
                value: 38,
                name: 'rose 2',
                itemStyle: {
                  color: colors[1],
                  borderColor: colors[1],
                  borderWidth: 4
                },
                label: {
                  backgroundColor: colors[1],
                  padding: 2,
                  borderRadius: 2,
                  color: 'white'
                }
              },
              {
                value: 32,
                name: 'rose 3',
                itemStyle: {
                  color: colors[2],
                  borderColor: colors[2],
                  borderWidth: 4
                },
                label: {
                  backgroundColor: colors[2],
                  padding: 2,
                  borderRadius: 2,
                  color: 'white'
                }
              },
              {
                value: 30,
                name: 'rose 4',
                itemStyle: {
                  color: colors[3],
                  borderColor: colors[3],
                  borderWidth: 4
                },
                label: {
                  backgroundColor: colors[3],
                  padding: 2,
                  borderRadius: 2,
                  color: 'white'
                }
              },
              {
                value: 28,
                name: 'rose 5',
                itemStyle: {
                  color: colors[4],
                  borderColor: colors[4],
                  borderWidth: 4
                },
                label: {
                  backgroundColor: colors[4],
                  padding: 2,
                  borderRadius: 2,
                  color: 'white'
                }
              },
              {
                value: 26,
                name: 'rose 6',
                itemStyle: {
                  color: colors[5],
                  borderColor: colors[5],
                  borderWidth: 4
                },
                label: {
                  backgroundColor: colors[5],
                  padding: 2,
                  borderRadius: 2,
                  color: 'white'
                }
              }
            ]
          }
        ]
      }
      chart.setOption(option)
    },
    initBarChart() {
      const dom = document.querySelector('#barChart')
      const chart = Echart.init(dom)
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            textStyle: {
              color: '#fff'
            }
          }
        },
        grid: {
          borderWidth: 0,
          top: 20,
          bottom: 20,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          // x: '4%',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },

        calculable: true,
        xAxis: [
          {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              interval: 0
            },
            data: ['流域1', '流域1', '流域1', '流域1', '流域1', '流域1', '流域1', '流域1']
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0
            },
            splitArea: {
              show: false
            }
          }
        ],
        series: [
          {
            name: 'Ⅰ-Ⅲ类',
            type: 'bar',
            stack: '总量',
            barMaxWidth: 35,
            barGap: '10%',
            itemStyle: {
              normal: {
                color: 'rgba(80, 164, 253,255)',
                borderRadius: 2,
                label: {
                  show: false,
                  textStyle: {
                    color: '#fff'
                  },
                  position: 'inside',
                  formatter: function (p) {
                    return p.value > 0 ? p.value : ''
                  }
                }
              }
            },
            data: [54, 54, 87, 7, 35, 35, 98, 34]
          },

          {
            name: 'Ⅳ-Ⅴ类',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              normal: {
                color: 'rgba(238, 189, 21,255)',
                barBorderRadius: 2,
                label: {
                  show: false,
                  position: 'inside',
                  formatter: function (p) {
                    return p.value > 0 ? p.value : ''
                  }
                }
              }
            },
            data: [54, 6, 78, 7, 25, 45, 35, 35]
          },
          {
            name: '劣Ⅴ类',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              normal: {
                color: 'rgba(238, 59, 91,1)',
                barBorderRadius: 2,
                label: {
                  show: false,
                  position: 'inside',
                  formatter: function (p) {
                    return p.value > 0 ? p.value : ''
                  }
                }
              }
            },
            data: [54, 54, 87, 7, 35, 35, 98, 34]
          }
        ]
      }
      chart.setOption(option)
    }
  },
  mounted() {
    this.initBarChart()
    this.initPieChart()
  },
  // 计算属性
  computed: {
  }
}
</script>

<style scoped lang="less">
.container{
  position: relative;
  height: 100%;
  width: 100%;
  .top-nav{
    position: absolute;
    // height: 30px;
    z-index: 10;
    width: 60%;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    padding: 5px;
  }
  .content-top,.content-left,.content-right{
    position: absolute;
    z-index: 999;
    padding: 10px;
    background: url('../../assets/img/sider-bg.png') 100% 100%;
  }
  .content-top {
      height: 91px;
      top: 0;
      left: 0;
      right: 0;
      background: url('../../assets/img/title-bg.png') 100% 100%;
      h2 {
          font-size: 30px;
          font-weight: 800;
          line-height: 70px;
          text-align: center;
          color: white;
          background-clip: text;
          -webkit-background-clip: text; /* 添加前缀 */
          // background: linear-gradient(to top, #ff7e5f, #feb47b, #ffcc94, #f3d4ab, #e8dcb8);
      }
  }
  .content-right{
    width: 420px;
    color: white;
    top: 75px;
    right: 5px;
    bottom: 5px;
    display: flex;
    flex-direction: column;
    div{
      flex:1;
      overflow: hidden;
    }

  }
}

// data
.content-left{
  width: 420px;
  display: flex;
  flex-direction: column;
  top: 75px;
  left: 5px;
  bottom: 5px;
  div:nth-child(1){flex:2;}
  div:nth-child(2){flex:2;}
  div:nth-child(3){flex:3;}
  .water-title{
    color: white;
    margin: 0 auto;
    width: 80%;
    height: 40px;
    line-height: 40px;
    position: relative;
    text-indent: 45px;
    font-size: 18px;
    font-weight: 900;
  }
  .water-title::before{
      content: "";  /* 伪元素需要设置 content 属性，即使为空 */
      position: absolute;
      top: 0;
      left: 0;
      width: 40px;
      height: 40px;
      background: url('../../assets/img/title-logo.png') 100% 100%; /* 设置伪元素的背景颜色 */
      z-index: -1;  /* 将伪元素放在元素底层，以确保内容在其上层显示 */
  }
  .water-container{
    margin-top: 20px;
    display:flex;
    gap: 10px;
    justify-content: space-around;
    .data{
      flex: 1;
      // width: 150px;
      // height: 150px;
      padding: 10px;
      color: white;
      background: url('../../assets/img/data-border.png'); /* 设置伪元素的背景颜色 */
      background-size: contain;
      background-repeat: no-repeat;
      .level{
        // width: 130px;
        height: 130px;
        margin: 0 auto;
        background: url('../../assets/img/logo-data.png'); /* 设置伪元素的背景颜色 */
        background-size: cover;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
      }
      .water-text{
        position: relative;
        height: 30px;
        line-height: 30px;
        padding-left: 45px;
      }
      .water-text::before{
        position: absolute;
        width: 10px;
        height: 10px;
        top: 50%;
        left: 15%;
        transform: translateY(-50%);
        content: '';
        border-radius: 50%;
        background-color: white;
      }
      .icon-up{
        display: inline-block;
        margin-left: 20px;
        width: 20px;
        height: 20px;
        background-image: url('../../assets/img/icon-down.png');
        background-size: contain;
      }
      .icon-down{
        display: inline-block;
        margin-left: 20px;
        width: 20px;
        height: 20px;
        background-image: url('../../assets/img/icon-down.png');
        background-size: contain;
      }
  }
}
  }

.content-bottom{
    position: absolute;
    width: 60%;
    bottom: 10px;
    z-index: 10;
    left: 50%;
    transform: translateX(-50%);
}
#pieChart,#barChart{
    height: 100%;
    width: 100%;
}
</style>
