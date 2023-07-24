<template>
    <div class="header-container">
        <v-app-bar density flat color="rgba(0,0,0,0)">
            <template #title>
                <h4 class="text">
                    世界之眼
                </h4>
            </template>

            <template #append>
                <div class="text">
                    {{ currentTime }}
                </div>
            </template>
        </v-app-bar>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import moment from "moment"
let currentTime = ref()
let timer = ref(null)

function getTime() {
    currentTime.value = moment(new Date()).format('YYYY年MM月DD日 HH:mm')
}

onMounted(() => {
    if (timer.value == null) {
        timer.value = setInterval(getTime, 1000)
    }
})



</script>

<style scoped lang="less">
@import "~/style/global.less";
header{
    background-image: linear-gradient(to bottom,  color, rgba(255, 0, 0, 0)) !important;
}
.text{
    color: white;
}
</style>