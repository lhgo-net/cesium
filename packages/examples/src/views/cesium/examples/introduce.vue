<template>
    <div class="container">
        <v-card flat>
            <v-card-title>介绍</v-card-title>
            <v-card-text>
                <p>介绍：这个项目是一个WEBGIS案列展示系统，主要是对日常开发中常用到的案例,功能等进行封装</p>
                <p>开始时间：2024年</p>
                <p>技术栈：vue3,vue-router,vuetify,cesium,pnpm,nginx</p>

            </v-card-text>
        </v-card>
        <v-card flat>
            <v-card-title>静态文件</v-card-title>
            <v-card-text>
                <p>倾斜摄影：/GISFile/incline/xianggang_jiulong/tileset.json</p>
                
            </v-card-text>
        </v-card>
        <v-card flat>
            <v-card-title>联系</v-card-title>
            <v-card-text>
                <p><v-icon icon="mdi-email"></v-icon>：huaker_hk@163.com</p>
                <p><v-icon icon="mdi-github"></v-icon>：<a href="https://github.com/lhgo-net">https://github.com/lhgo-net</a></p>
            </v-card-text>
        </v-card>
    </div>
</template>

<style scoped>
.container{
    margin: 2vh 10vw;
}
</style>