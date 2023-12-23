module.exports = {
    root: true,
    parser:"@babel/eslint-parser",
    globals: {
        viewer: true,
        Cesium: true
      },
    parserOptions:{
        ecmaVersion: 2015,
        sourceType:"module",
        requireConfigFile:false,
    }
}