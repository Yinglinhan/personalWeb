module.exports ={
    entry:'./src/js/index.js',
    output:{
        path:__dirname + '/out',
        filename:'[name].bundle.js',
        publicPath:'./out'
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
                test: /\.(woff2|woff|eot|ttf|otf)(\?.*)?$/,
                /**
                 * url-loader
                 * 会配合 webpack 对资源引入路径进行复写，如将 css 提取成独立文件，可能出现 404 错误可查看 提取 js 中的 css 部分解决
                 * 会以 webpack 的输出路径为基本路径，以 name 配置进行具体输出
                 * limit 单位为 byte，小于这个大小的文件会编译为 base64 写进 js 或 html
                 */
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'static/fonts/[name].[hash:7].[ext]',
                }
              },
            {
                test: /\.less$/,
                use: [
                  'style-loader', 
                  'css-loader', 
                  'postcss-loader', 
                  'less-loader'
                ]
              }
        ]
    }
}