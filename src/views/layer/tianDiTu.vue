<template>
  <div class="container">
    <l-map>
      <div class="tool">
        <v-sheet></v-sheet>
        <v-sheet border rounded>
          <v-select
            v-model="data.selectImageLayer"
            :items="data.imageLayer"
            item-title="name"
            item-value="key"
            persistent-hint
            return-object
            single-line
            density
            @update:modelValue="onImageLayer"
          ></v-select>
          <v-select
            v-model="data.selectAnnotation"
            :items="data.annotation"
            item-title="name"
            item-value="key"
            persistent-hint
            return-object
            single-line
            density
            @update:modelValue="onLabelLayer"
          ></v-select>
        </v-sheet>
      </div>
    </l-map>
  </div>
</template>

<script setup>
import lMap from '@/components/map.vue'
import { onMounted, onUnmounted, reactive, toRaw } from 'vue'
import { provider } from '@/utils/ceisum.map'
import { TDT_IMAGE_W, tdtAnnotationW, TDT_IMAGE_C, tdtAnnotationC } from '@/config/default'

const data = reactive({
  imageLayer: [...TDT_IMAGE_W, ...TDT_IMAGE_C],
  annotation: [...tdtAnnotationW, ...tdtAnnotationC],
  selectImageLayer: { name: '全球影像底图(经纬度投影)', key: 'img_c' },
  selectAnnotation: { name: '全球矢量注记(经纬度投影)', key: 'cva_c' }
})

onMounted(() => {
  imageLayer()
})
onUnmounted(() => {
  remove()
})

function onImageLayer(item) {
  const obj = toRaw(item)
  data.imageLayer1 = provider(viewer, obj)
}

function onLabelLayer(item) {
  const obj = toRaw(item)
  data.imageLayer1 = provider(viewer, obj)
}

function remove() {
  viewer.imageryLayers.removeAll()
}

function imageLayer() {
  data.imageLayer1 = provider(viewer, {
    name: '影像底图',
    key: 'img_c'
  })
  data.annotation1 = provider(viewer, {
    name: '影像注记',
    key: 'cva_c'
  })
}
</script>

  <style scoped>
  .container {
    position: relative;

  }
  .tool{
    position: absolute;
    width: 250px;
    /* background: white; */
    left: 10px;
    top: 10px;
    padding: 10px;
    border-radius: 2px;
    z-index: 1000;
  }
  </style>
