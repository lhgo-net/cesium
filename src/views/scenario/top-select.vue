<template>
  <div class="content-top-select">
    <div class="select-box">
      <water-select :data="data1" placeholder="区域选择"></water-select>
    </div>
    <div class="select-box">
      <a-date-picker dropdown-class-name="date" class="date" @change="onDateChange"></a-date-picker>
    </div>
    <div class="select-box">
      <water-select
        :data="layers"
        placeholder="图层"
        @onChage="onLayerChage"
      >
        <div style="padding:2px 4px;margin-top:5px">
          水系：<a-switch default-checked @change="onSwitch"></a-switch>
        </div>
      </water-select>
    </div>
    <div class="select-box box" @click="onChangeSectionDelamination(false)">
      <span>
        国控自动站
      </span>
    </div>
    <div class="select-box box" @click="onChangeSectionDelamination(true)">
      <span>
        采测分离断面
      </span>
    </div>
  </div>
</template>

<script>
import waterSelect from './select.vue'
export default {
  components: { waterSelect },
  data() {
    return {
      data1: [
        {
          label: '区域1',
          key: '1'
        },
        {
          label: '区域2',
          key: '2'
        },
        {
          label: '区域3',
          key: '3'
        }
      ],
      layers: [
        {
          label: '卫星图',
          key: 'img_w'
        },
        {
          label: '矢量图',
          key: 'vec_w'
        }
      ],
      sectionDelamination: false
    }
  },
  computed: {
    dropdownStyle() {
      return {
        background: 'url(\'../../assets/imgs/home/new/data-border.png\')', /* 设置伪元素的背景颜色 */
        backgroundSize: 'contain',
        backgroundRrepeat: 'no-repeat'
      }
    },
    dropdownMenuStyle() {
      return {
        color: 'white',
        background: 'url(\'../../assets/imgs/home/new/data-border.png\')', /* 设置伪元素的背景颜色 */
        backgroundSize: 'contain',
        backgroundRrepeat: 'no-repeat',
        border: '1px solid #0c7d86',
        boxShadow: '0 0 10px 3px #0c7d86'
      }
    }
  },
  provide() {
    return {
      sectionDelamination: this.sectionDelamination
    }
  },
  methods: {
    handleChange() {

    },
    onDateChange() {

    },
    onLayerChage(item) {
      this.$emit('onLayerChage', item)
    },
    onChangeSectionDelamination(val) {
      this.sectionDelamination = !this.sectionDelamination
      this.$emit('onChangeSectionDelamination', val)
    },
    onSwitch(item) {
      this.$emit('onSwitch', item)
    }
  }
}
</script>

<style scoped lang="less">
.content-top-select{
  cursor: pointer;
  position: absolute;
  z-index: 99;
  color: white;
  display: flex;
  gap: 10px;
  left: 50%;
  top: 10%;
  transform: translate(-50%, -10%);
  .select-box{
    height: 35px;
    width: 180px;
    background: url('../../assets/imgs/home/new/select-border.png');
    background-size: contain;
    background-repeat: no-repeat;
    padding: 0px 4px;
    .select-box:last-child{
      background: none;
    }
  }
}
.box{

}
.content-top-select .select-box:last-child,.content-top-select .select-box:nth-child(4){
  background: none;
  line-height: 35px;
  span{
    width: 100%;
    background: #223d48;
    padding: 2px 10px;
  }
}
.content-top-select .select-box:nth-child(4){
  line-height: 35px;
  background: none;
  border: 1px solid #06bcc6;
  border-radius: 3px;
}

</style>

<style lang="less">
.date .ant-calendar{
  background: rgba(12, 125, 134,0.5);
  border: 1px solid #06bcc6;
  box-shadow: 0 0 10px 10px #0c7d86;
  color: white;
}
.date .ant-input {
  background: transparent;
  color: white;
  border: none;
}
.date .ant-calendar-input{
  background: transparent;
  color: white;
}
.date .ant-calendar-year-select, .ant-calendar-header .ant-calendar-month-select{
  color: white;
}
.date .ant-calendar-date{
  color: white;
}
.date .ant-calendar-today-btn {
  color: white;
}
</style>
