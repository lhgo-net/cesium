<template>
  <div class="box">
    <div class="title">
      {{ title }}
    </div>
    <slot></slot>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.box{
  width: 100%;
  height: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
}
.title{
  height: 45px;
  width: 100%;
  color: white;
  font-size: 13px;
  font-weight: 900;
  text-indent: 50px;
  padding-top: 11px;
  background: url('../../assets/img/box-title-bg.png');
  background-size: contain;
  background-repeat: no-repeat;
  margin-bottom: 10px;
}
</style>
