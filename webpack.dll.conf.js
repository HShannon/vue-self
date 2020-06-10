const path = require("path");
const webpack = require("webpack");
module.exports = {
  entry: {
    vendor: [
      'vue',
      "vue-router",
      "vuex",
      "axios",
      "element-ui",
      // "vue-awesome"
    ]
  },
  output: {
    path: path.join(__dirname, "./dll"),
    filename: "[name].dll.js",
    library: '[name]_library' // vendor.dll.js中暴露出的全局变量名
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, "dll", "[name]-manifest.json"),
      name: '[name]_library',
      context: __dirname
    })
  ]
};