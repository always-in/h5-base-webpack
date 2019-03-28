var webpack = require("webpack");
var path = require("path");
var htmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var TransferWebpackPlugin = require('transfer-webpack-plugin');//将src下的文件直接复制到dist下
module.exports = {
    entry: './src/index.js', /*{
       main: './src/scripts/main.js',   
       aaa: './src/scripts/aaa.js',
       bbb: './src/scripts/bbb.js',
       ccc: './src/scripts/ccc.js'
    }*/
    output: {
       path: path.resolve(__dirname,'./dist'),
       path: __dirname + '/dist',
       filename: 'js/[name]-bundle.js',
       // publicPath: 'http://cdn.com/'   //上线的绝对路径
    }, 
    //热部署
    devServer:{
        historyApiFallback:true,
        hot:true,
        inline:true,
        progress:true,
        port:9099 //端口你可以自定义
    },
    //插件
    plugins: [ 
       new htmlWebpackPlugin({       //根目录的index.html生成dist下的html，可以多个生成
          filename: 'index.html',
          template: 'index.html',   
          inject: 'body',           //script标签的放置
          //title: 'index title test',
          minify: {                    //html压缩
            removeComments: true,     //移除注释
            collapseWhitespace: true //移除空格
          }
          //chunks: ['main','aaa'],      //生成html页面后的script文件的引入
          //excludeChunks: ['bbb','ccc']  //排除没有用到的script文件，其他的都引进来，比chunks更好匹配
       }),
       new webpack.LoaderOptionsPlugin({
          options: {
             postcss: [     //浏览器自动补全前缀
                require("autoprefixer")({
                   browsers: ["last 5 versions"]
                })  
             ]     
          }   
       }),
       new ExtractTextPlugin("[name].css"),
       // 把src/test目录下的文件copy到build/test目录下
        new TransferWebpackPlugin([{
            from: 'images',
            to: 'images'
        }], path.resolve(__dirname, 'src'))
       /*,
       new htmlWebpackPlugin({       
          filename: 'b.html',
          template: 'index.html',   
          inject: 'body',          
          title: "this is b.html",
          //chunks: ['bbb'],
          //excludeChunks: ['aaa','ccc']
       }),
       new htmlWebpackPlugin({       
          filename: 'c.html',
          template: 'index.html',   
          inject: 'body',          
          title: "this is c.html",
          //chunks: ['ccc'],
          //excludeChunks: ['aaa','bbb']
       })*/
    ],
    module:{
       rules: [    //1.0的是loaders
          //处理js中的loader
          {
            test: /\.js$/,
            loader: 'babel-loader'
            // include: path.resolve(__dirname,'/src'),               //指定打包的文件
            // exclude: path.resolve(__dirname,'/node_modules')      //排除打包的文件，加速打包时间
          },
          //处理css中的loader
          // { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
          {
            test: /\.css$/,
            use:[
              {
                loader: 'style-loader'
              },
              {
                loader: 'css-loader'
              }
            ]
          },
          //处理sass中的loader
          {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!postcss-loader!sass-loader' 
          },
          //处理html模板中的loader
          {
            test: /\.html$/,
            loader: 'html-loader'
          },
           //处理ejs模板中的loader,以.tpl后缀结尾的
           {
             test: /\.tpl$/,
             loader: 'ejs-loader'
           },
           //处理图片中的loader,file-loader,url-loader,image-webpack-loader相互配合(图片格式转换base64 图片压缩)
           {
             test: /\.(png|jpg|gif|svg)$/i,  //模板中的图片放相对路径: src="${require('../imgs/aaa.jpg')}"
             use:[{
                    loader:'url-loader',
                    options: {
                        limit:500,//当图片小于这个值他会生成一个图片的url 如果是一个大于的他会生成一个base64的图片在js里展示
                        outputPath: 'images/',// 指定打包后的图片位置
                        name:'[name].[ext]?[hash]',//name:'[path][name].[ext]
                        publicPath:'images/'

                    }
             }]
           }
       ]
    },
    externals : {
        'jquery' : 'window.jQuery'
    }
    
}
