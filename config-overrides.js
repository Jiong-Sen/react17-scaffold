const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackModuleRule,
  disableEsLint,
  addWebpackPlugin
} = require('customize-cra')

const path = require('path')
const { addReactRefresh } = require('customize-cra-react-refresh')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 添加打包进度条
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
// 颜色
const chalk = require('chalk')
//
if (process.env.NODE_ENV === 'development') {
  process.env.GENERATE_SOURCEMAP = 'true'
} else if (process.env.NODE_ENV === 'production') {
  process.env.GENERATE_SOURCEMAP = 'false'
}
// 打包配置
const addCustomize = () => (config) => {
  if (process.env.NODE_ENV === 'production') {
    // 关闭sourceMap
    config.output.publicPath = '/'
    config.devtool = false
    // 添加js打包gzip配置
    config.plugins.push(
      new CompressionWebpackPlugin({
        test: /\.js$|\.css$/,
        threshold: 1024
      })
    )
    config.plugins.push(
      //开启gzip 压缩
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true, //console
            pure_funcs: ['console.log'] //移除console
          }
        },
        cache: true, //开启缓存
        sourceMap: false, // 是否为压缩后的代码生成对应的Source Map, 默认不生成，开启后耗时会大大增加，一般不会将压缩后的代码的
        parallel: true //使用多进程并行运行来提高构建速度
      })
    )
  }
  return config
}
//
module.exports = override(
  // 热更新
  addReactRefresh(),
  // 配置打包
  addCustomize(),
  // 使用eslint配置
  // useEslintRc(),
  disableEsLint(),

  // 进度条
  addWebpackPlugin(
    new ProgressBarPlugin({
      complete: '█',
      format: `${chalk.green('编译中')} [ ${chalk.green(
        ':bar'
      )} ] ':msg:' ${chalk.magenta(chalk.bold('(:percent)'))}`,
      clear: true
    })
  )
)
