var path = require('path');
var HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports ={
    entry:'./src/js/index.js',
    output:{
        path:__dirname + '/out',
        filename:'[name].bundle.js',
        publicPath:'http://localhost:8081/out/'
    },
    mode:'development',
    module:{
        rules:[
            {test:/.js$/,use:['babel-loader']},
            {
                /**
                 * 末尾 \?.* 匹配带 ? 资源路径
                 * 我们引入的第三方 css 字体样式对字体的引用路径中可能带查询字符串的版本信息
                 */
                test: /\.(jpg)|(gif)|(png)|(svg)|(woff2)|(woff)|(eot)|(ttf)|(otf)$/,
                loader: 'url-loader',
                options: {
                  limit: 10000
                }
              },
            {
                test: /.less$/,
                use: [
                  'style-loader', 
                  'css-loader', 
                  'less-loader'
                ]
              },
              {
                test: /.css$/,
                use: [
                  'style-loader', 
                  'css-loader', 
                ]
              },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'mobile.html'),
            filename:"index.html",
            inject:'body'
        })
    ]
}