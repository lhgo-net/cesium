<template>
  <a-dropdown style="width:180px" :overlay-style="{ 'width': '180px' }">
    <div style="color:white;width:180px;line-height:35px" @click="e => e.preventDefault()">
      {{ placeholder }} <a-icon type="down"></a-icon>
    </div>

    <template slot="overlay">
      <div class="select-option-container" style="width:180px;color: white;border: 1px solid #0c7d86;box-shadow: 0 0 10px 3px #0c7d86;border-radius:2px;">
        <div v-for="(item,index) in data" :key="item + index" class="select-option" @click="onChange(item)">{{ item.label }}</div>
        <slot></slot>
      </div>
    </template>
  </a-dropdown>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '请选择'
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {
    handleChange() {

    },
    onChange(item) {
      this.placeholder = item.label
      this.$emit('onChage', item)
    }
  }
}
</script>

<style scoped lang="less">
.select-option-container{
  background-color: rgba(18, 52, 62,0.5);
}
.select-option{
  margin-top: 5px;
  height: 30px;
  padding: 4px 6px;
  background: #12343e;
  cursor: pointer;
}
.select-option:hover{
  box-shadow: 0 0 10px 10px #0c7d86 inset;
}
</style>
