// const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  productionSourceMap: false, // 生产打包时不输出map文件，增加打包速度
  outputDir: path.resolve(__dirname, 'public/static'),
  devServer: {
    port: 8099, // 端口号
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))

    config.plugin('html').tap(args => {
      args[0].template = path.resolve(__dirname, 'index.html')
      return args
    })
    if (process.env.NODE_ENV === 'production') {
      config.plugin('vendorDll')
        .use(webpack.DllReferencePlugin, [{
          context: __dirname,
          manifest: require(path.resolve(__dirname, './dll/vendor-manifest.json'))
        }])
      config.plugin('addAssetHtml')
        .use(AddAssetHtmlPlugin, [
          [
            {
              filepath: require.resolve(path.resolve(__dirname, './dll/vendor.dll.js')),
              outputPath: 'js',
              publicPath: 'js'
            },
          ]
        ])
        .after('html')
    }
  },
  configureWebpack: config => {
    config.module.noParse = /^(vue|vue-router|vuex|axios|element-ui|vue-awesome)$/
    if (process.env.NODE_ENV === 'production') {
      config.optimization.splitChunks.cacheGroups = {
        vendors: { // 打包两个页面的公共代码
          test: /[\\/]node_modules[\\/]/, // 表示默认拆分node_modules中的模块
          name: 'vendors', // 分离包的名字
          chunks: 'all'
        },
      };
      // config.optimization.minimizer.push(new ParallelUglifyPlugin({ // 多进程压缩
      //   cacheDir: '.cache/',
      //   uglifyJS: {
      //       output: {
      //           comments: false,
      //           beautify: false
      //       },
      //       compress: {
      //           warnings: false,
      //           drop_console: true,
      //           collapse_vars: true,
      //           reduce_vars: true
      //       }
      //   }
      // }));
    }
  },
  css: {
    //extract 为 true, 则css无法热更新， 所以要分环境变量处理
    extract: process.env.NODE_ENV === 'production'
  },
  transpileDependencies: [
    /\bvue-awesome\b/
  ],
  lintOnSave: false
}
