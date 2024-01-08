module.exports = {
    root: true,
    globals: {
        viewer: true,
        Cesium: true
      },
    parserOptions:{
        parser:"@babel/eslint-parser",
        ecmaVersion: 2015,
        sourceType:"module",
        requireConfigFile:false,
    }
}