module.exports = {
  plugins: {
    autoprefixer: {
    },
    "postcss-px-to-viewport":{
      viewportWidth: 320, //视窗的宽度，对应的是我们设计稿的宽度
      viewportHeight: 568, //视窗的高度, 对应的是设计稿的高度
      unitPrecision: 5, //指定'px'转换为视窗单位值的小数位数
      viewportUnit: 'vw', //指定需要转换成的视窗单位
      selectorBlackList: ["nav","wh","title","el-icon-search","singers","hot-search","el-icon-arrow-left","nav-bar","left","between","right","tab-item","tabActive","tab","bannerTop","scroll","order","songSheet-name","search-history","input-search","top-singers","playCount","el-icon-close","song"],//指定不需要转换的类
      minPixelValue: 1, //小于或等于'1px'不转换为视窗单位
      mediaQuery: false, //允许在媒体查询中转换'px'
      //exclude: [/TabBar/] //[]内为JS正则表达式
    }
  }
}
