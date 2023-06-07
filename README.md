# Vue3 + Vite + Cesium

个人案列库

## cesium静态文件

node_modules/cesium/Build/Cesium/Workers
node_modules/cesium/Build/Cesium/ThirdParty
node_modules/cesium/Build/Cesium/Assets
node_modules/cesium/Build/Cesium/Widgets

以上需要使用到的静态文件暂时托管在public文件夹下
在生产环境下可以使用nginx来进行托管

若不托管在public文件下，地球会出不来，控制台报一堆404

暂时没有找到较好的方法在vite.config.js里配置
