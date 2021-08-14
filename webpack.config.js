const path = require('path')
const HTLMplugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
module.exports ={
    entry:'./source/script.js',
    output : {
        filename : 'bundle.[chunkhash].js',
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
      port : 3000
      },
    plugins : [
        new HTLMplugin({
            template : './source/index.html'
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
          {
            test: /\.s[ac]ss$/i,
            use: [
              // Creates `style` nodes from JS strings
            { loader : "style-loader"},
              // Translates CSS into CommonJS
            { loader :  "css-loader"},
              // Compiles Sass to CSS
            { loader:  "sass-loader"},
            ],
          },
        ],
      },
}