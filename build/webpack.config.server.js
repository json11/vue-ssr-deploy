const path = require('path')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')
const merge =  require('webpack-merge')
const baseConfig= require('./webpack.config.base')
const VueServerPlugin= require('vue-server-renderer/server-plugin')

let config

config= merge(baseConfig, {
        target: 'node', // 打包出来的js 执行环境
        entry: path.join(__dirname, '../client/server-entry.js'),
        devtool: 'source-map',
        output: {
            libraryTarget: 'commonjs2', // 以modules.exports = 的方式导出文件
            filename: 'server-entry.js',
            path: path.join(__dirname, '../server-build')
        },
        externals: Object.keys(require('../package.json').dependencies),  /// 不要打包dependencies里面的文件
        module: {
            rules: [
                {
                    test: /\.styl/,
                    use: ExtractPlugin.extract({
                        fallback: 'vue-style-loader',
                        use: [
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true,
                                }
                            },
                            'stylus-loader'
                        ]
                    })
                }
            ]
        },
        plugins: [
            new ExtractPlugin('styles.[contentHash:8].css'),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
                'process.env.NODE_ENV': '"server"'
            }),
            new VueServerPlugin()
        ]
    })

config.resolve = {
    alias: {
        'model': path.join(__dirname, '../client/model/server-model.js')
    }
}

module.exports = config
