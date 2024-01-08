<template>
  <div class="horizontal-scrollbar-container nav-container">
    <div ref="scroll" class="scroll-wrapper">
      <div class="scroll-content" style="color: white">
        <slot></slot>
        <!-- <div class="scroll-item" v-for="index in 100" :key="index">{{index}}</div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BScroll from '@better-scroll/core'
import Scrollbar from '@better-scroll/scroll-bar'
BScroll.use(Scrollbar)
const scroll = ref()

onMounted(() => {
  initScroll()
})

function initScroll() {
  scroll.value = new BScroll('.scroll-wrapper', {
    scrollX: true,
    scrollY: false,
    click: true,
    probeType: 1,
    scrollbar: {
      fade: false,
      interactive: true,
      scrollbarTrackClickable: true,
      scrollbarTrackOffsetType: 'clickedPoint', // can use 'step'
    },
  })
}
</script>

<style scoped lang="less">
@import '@/style/global.less';
.nav-container {
  position: absolute;
  width: 100vw;
  bottom: 0;
  height: 64px;
  background-image: linear-gradient(to top, @color, rgba(255, 0, 0, 0)) !important;
}
.horizontal-scrollbar-container .scroll-wrapper {
  position: relative;
  display: flex;
  align-content: center;
  // width: 90%;
  // height: 100px;
  // margin: 80px auto;
  white-space: nowrap;
  border: 3px solid rgba(30, 80, 255, 0.3);
  border-radius: 5px;
  overflow: hidden;
  .scroll-content {
    display: flex;
    align-self: center;
    .scroll-item {
      opacity: 0.6;
      color: white;
      box-sizing: border-box;
      height: 50px;
      width: 50px;
      line-height: 50px;
      border-radius: 50%;
      font-size: 18px;
      display: inline-block;
      text-align: center;
      padding: 0 10px;
      margin: 0 10px;
    }
  }
}
</style>
//
<style lang="less" rel="stylesheet/stylus" scoped>
// .horizontal-scrollbar-container .scroll-wrapper {
//   position: relative;
//   display: flex;
//   align-content: center;
//   width: 90%;
//   height: 100px;
//   margin: 80px auto;
//   white-space: nowrap;
//   border: 3px solid rgba(30, 80, 255, 0.3);
//   border-radius: 5px;
//   overflow: hidden;
// }

// .scroll-content {
//   display: inline-block;
//   align-self: center;
// }

// .scroll-item {
//   opacity: 0.6;
//   color: white;
//   box-sizing: border-box;
//   height: 50px;
//   width: 50px;
//   line-height: 50px;
//   border-radius: 50%;
//   font-size: 18px;
//   display: inline-block;
//   text-align: center;
//   padding: 0 10px;
//   margin: 0 10px;
// }
//
</style>
