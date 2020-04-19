/**
 * webpack基本配置
 */
// 引入路径模块
const path = require('path')
// 每次打包前先清空
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 将打包后的js文件自动添加到html模板
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 解析vue文件
const vueLoaderPlugin = require('vue-loader/lib/plugin')
// 将js中的css提取出来
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// 将loader解析转换操作分解到多个子进程中去执行
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
// 增强代码压缩
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
// 判断是开发环境还是生产环境
const devMode = process.argv.indexOf('--mode=production') === -1;

module.exports = {
  // 入口文件
  entry:{
    main:path.resolve("@babel/polyfill",path.resolve(__dirname,'../src/main.js'))
  },
  // 打包输出
  output:{
    path:path.resolve(__dirname,'../dist'),
    filename:'js/[name].[hash:8].js',
    chunkFilename:'js/[name].[hash:8].js'
  },
  // 配置loader
  module:{
    rules:[
      {
        test:/\.js$/,
        // 把js文件处理交给id为happyBabel的实例执行
        use:[{
          loader: 'happypack/loader?id=happyBabel'
        }],
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              preserveWhitespace: false
            }
          }
        }],
        // include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [{
          loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          options: {
            publicPath: "../dist/css/",
            hmr: devMode
          }
        }, 'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: [require('autoprefixer')]
          }
        }]
      },
      {
        test: /\.less$/,
        use: [{
          loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          options: {
            publicPath: "../dist/css/",
            hmr: devMode
          }
        }, 'css-loader', 'less-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: [require('autoprefixer')]
          }
        }]
      },
      {
        test: /\.(jep?g|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10240,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'img/[name].[hash:8].[ext]'
              }
            }
          }
        },
        include: [path.resolve(__dirname, 'src/assets/imgs')],
        exclude: /node_modules/
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10240,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'media/[name].[hash:8].[ext]'
              }
            }
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10240,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'media/[name].[hash:8].[ext]'
              }
            }
          }
        }
      }
    ]
  },
  resolve: {
    // 别名配置，直接告诉webpack去哪个路径下查找
    alias:{
      'vue$': 'vue/dist/vue.runtime.esm.js',
      ' @': path.resolve(__dirname,'../src'),
      'assets': path.resolve('src/assets'),
      'components': path.resolve('src/components')
    },
    // 扩展名
    extensions: ['*','.js','.json','.vue']
  },
  optimization: {
    minimizer: [
      new ParallelUglifyPlugin({
        cacheDir: '.cache/',
        uglifyJS: {
          output: {
            comments: false,
            beautify: false
          },
          compress: {
            drop_console: true,
            reduce_vars: true
          }
        }
      })
    ]
  },
  // 配置插件
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new vueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    }),
    new HappyPack({
      // 与loader对应的id标识
      id: 'happyBabel',
      // 用法和loader的配置一样,这里是loaders
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true
          }
        }
      ],
      // 共享进程池
      threadPool: happyThreadPool
    })
  ]
}
