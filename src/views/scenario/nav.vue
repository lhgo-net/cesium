<template>
  <div class="nav-box">
    <div>
      <ul class="main-menu">
        <li>
          <div>区域选择</div>
          <ul class="sub-menu">
            <li class="menu-item">
              <span>区域1</span>
              <div class="sub-menu-item">
                <div class="sub-menu-item-title">
                  <div>按行政区</div>
                  <div>按流域</div>
                </div>
                <div class="sub-menu-item-main"></div>
              </div>
            </li>
            <li class="menu-item"><span>区域2</span></li>
            <li class="menu-item"><span>区域3</span></li>
          </ul>
        </li>
        <li></li>
        <li>
          <div>图层</div>
          <ul class="sub-menu">
            <li class="menu-item"><span>图层1</span></li>
            <li class="menu-item"><span>图层2</span></li>
          </ul>
        </li>
      </ul>
    </div>
    <div>
      <ul class="right">
        <li v-for="(item,index) in data" :key="item.key + index" :style="{ border: active === index ? '2px solid rgb(5, 177, 172)' : '' }" @click="onChange(item,index)">
          <div>
            {{ item.label }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, toRaw } from 'vue'

const data = ref([
  { label: '国控', key: '国控', active: false },
  { label: '断面层', key: '断面层', active: true }
])
const active = ref(0)
const emit = defineEmits(['onChange', 'delete'])

function onChange(item, index) {
  active.value = index
  const obj = toRaw(item)
  emit('onChange', obj.active)
}

</script>

<style lang="less">
.nav-box{
    width: 100%;
    height: 100%;
    display: flex;
    color: white;
    justify-content: space-around;
    /* 基本样式 */
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 10px;
    }
    .right{
        li{
            width: 250px;
            padding: 10px;
            div{
                background-color: rgb(35, 64, 75);
                padding: 2px 5px;
                text-shadow: 0 0 10px rgba(5, 177, 172, 0.8)
            }
        }

    }

/* 主菜单样式 */
.main-menu>li {
    display: inline-block;
    position: relative;
    // height: 35px;
    width: 250px;
    padding: 10px;
    background: url('../../assets/img/select-border.png');
    background-size: cover;
    background-repeat: no-repeat;
}

/* 子菜单样式 */
.sub-menu {
    display: none;
    position: absolute;
    width: 100%;
    top: 100%;
    left: 0;
    background-color: rgba(16, 37, 46,0.5);
    box-shadow: 0 0 10px 10px rgba(9, 144, 148, 0.5);
}

/* 当鼠标悬停在主菜单项上时显示子菜单 */
.main-menu>li:hover .sub-menu {
    display: block;
}
.sub-menu-item{
  display: none;
  position: absolute;
  cursor: pointer;
  width: 300px;
  top: 10px;
  left: 90%;
  padding: 10px;
  background-color: #22485b;
  border: 2px solid rgb(5, 177, 172);
  // box-shadow: 0 0 10px 10px rgba(9, 144, 148, 0.5);
  .sub-menu-item-title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    div{
      flex: 1;
      text-align: center;
    }
  }
  .sub-menu-item-main{
    min-height: 200px;
  }
}
.main-menu>li>.sub-menu:hover .sub-menu-item{
  display: block;
}
/* 菜单项样式 */
.menu-item {
    padding: 10px;
    margin: 5px 0;
    background-color: rgba(16, 37, 46,0.8);
    // border-bottom: 1px solid #ccc;
}
.menu-item:hover{
    box-shadow: 0 0 10px 10px rgba(9, 144, 148, 0.5) inset;
    border: 2px solid rgb(5, 177, 172);
}
}
</style>