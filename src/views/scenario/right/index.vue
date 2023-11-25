<template>
  <div style="height: 100%;">
    <template v-if="showSectionDelamination">
      <div class="test">
        <div>
          <s-box :title="'水质状况排名'">
            <div class="table-container">
              <table>
                <thead class="thead">
                  <tr>
                    <th>城市名称</th>
                    <th>所属省份</th>
                    <th>综合水质指数</th>
                    <th>排名</th>
                  </tr>
                </thead>
                <tbody class="tbody">
                  <tr v-for="item in 40" :key="item + 'key'">
                    <td>城市{{ item }}</td>
                    <td>所属省份{{ item }}</td>
                    <td>综合水质指数{{ item }}</td>
                    <td>{{ item }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </s-box>
        </div>
        <div>
          <s-box :title="'水质状况排名变化'">
            <div class="table-container">
              <table>
                <thead class="thead">
                  <tr>
                    <th>城市名称</th>
                    <th>所属省份</th>
                    <th>排名变化</th>
                    <th>上月排名</th>
                  </tr>
                </thead>
                <tbody class="tbody">
                  <tr v-for="item in 40" :key="item + 'key'">
                    <td>城市{{ item }}</td>
                    <td>所属省份{{ item }}</td>
                    <td>综合水质指数{{ item }}</td>
                    <td>{{ item }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </s-box>
        </div>
      </div>
    </template>
    <template v-else>
      <s-box :title="'实时数据列表'">
        <div class="table-container">
          <table>
            <thead class="thead">
              <tr>
                <th>城市名称</th>
                <th>行政区划</th>
                <th>水质类别</th>
                <th>高锰酸盐指数</th>
                <th>氨氮</th>
              </tr>
            </thead>
            <tbody class="tbody">
              <tr v-for="item in 40" :key="item + 'key'">
                <td>城市{{ item }}</td>
                <td>行政区划{{ item }}</td>
                <td>
                  <div :style="{ border: `1px solid  ${getColor(item)}`,color: getColor(item) }">{{ item }}类</div>
                </td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </s-box>
    </template>
  </div>
</template>

<script>

import sBox from '../box.vue'

export default {
  components: {
    sBox
  },
  props: {
    showSectionDelamination: {
      type: Boolean
    }
  },
  // filters: {
  //   getColor(val) {
  //     const colors = ['#fff', '#91cc75', '#0dbc5a', '#fff', '#fff', '#fff', '#fff']
  //     console.log(colors[val])
  //     return colors[val]
  //   }
  // },
  // inject: ['sectionDelamination'],
  data() {
    return {
      // sectionDelamination: false
    }
  },
  methods: {
    getColor(val) {
      const colors = ['#fff', '#91cc75', '#0dbc5a', '#fff', '#fff', '#fff', '#fff']
      console.log(colors[val])
      return colors[val]
    }
  },
  mounted() {
  }
}
</script>

<style scoped lang="less">
.test{
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  div{
    flex: 1;
    overflow: hidden;
  }
}
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  text-align: center;
}
th{
  position: sticky;
  top: 0; /* 将表头固定在顶部 */
  z-index: 1; /* 使表头位于其他内容之上 */
}
.table-container{
  height: 100%;
  overflow-y: auto;
}
.table-container::-webkit-scrollbar {
      width: 8px;
}

.table-container::-webkit-scrollbar-thumb {
  background: linear-gradient(to right,#079ab0,#02ecdd);
  border-radius: 6px;
}

.table-container::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 6px;
}
.thead{
  height: 40px;
  background: url('../../../assets/img/list-head-border.png');
  background-repeat: no-repeat;
  background-size: cover;
}
.tbody{
  height: 100%;
  overflow-y: auto;
  tr{
    height: 35px;
    margin-bottom: 10px;
  }
  tr:hover{
    background: url('../../../assets/img/list-hover-border.png');
    background-size: cover;
  }
  tr:nth-child(even){
    background: url('../../../assets/img/list-one-border.png');
    background-size: cover;
    background-repeat: no-repeat;
  }
  tr:nth-child(odd){
    background: url('../../../assets/img/list-two-border.png');
    background-size: cover;
    background-repeat: no-repeat;
  }
}

// .list-container{
//   display: flex;
//   flex-direction: column;
//   .list-head{
//     flex: 1;
//     background: url('../../../assets/img/list-head-border.png');
//     background-repeat: no-repeat;
//     background-size: cover;
//     font-weight: 1000;
//     div{
//       display: flex;
//       height: 40px;
//       div{
//         width: 100px;
//         text-align: center;
//         padding: 2px 0;
//       }
//     }
//   }
//   .list-body{
//       // height: 335px;
//       flex: 1;
//   }
// }
//     ul{
//       height: 100%;
//       height: 100%;
//       overflow-y: auto;
//       li{
//         display: flex;
//         height: 40px;
//         margin: 2px 0;
//         font-size: 12px;
//         div{
//           width: 100px;
//           text-align: center;
//           line-height: 40px;
//           padding: 2px 5px;
//         }
//       }
//       li:hover{
//         background: url('../../../assets/img/list-hover-border.png');
//         background-size: cover;
//       }
//       li:nth-child(even){
//         background: url('../../../assets/img/list-one-border.png');
//         background-size: cover;
//         background-repeat: no-repeat;
//       }
//       li:nth-child(odd){
//         background: url('../../../assets/img/list-two-border.png');
//         background-size: cover;
//         background-repeat: no-repeat;
//       }
//     }
</style>
