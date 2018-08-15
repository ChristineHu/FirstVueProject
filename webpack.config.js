const path=require('path')
const webpack=require('webpack')
const HTMLPlugin=require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ExtractPlugin=require('extract-text-webpack-plugin')

const isDev=process.env.NODE_ENV==='development'

const config ={
    target: "web",
    entry: path.join(__dirname,'src/index.js'),
    output: {
        filename: "bundle.[hash:8]js",
        path: path.join(__dirname,'dist')
    },
    plugins: [
        new webpack.DefinePlugin({//通过配置了DefinePlugin，那么这里面的标识就相当于全局变量，你的业务代码可以直接使用配置的标识。
            'process.env':{
                NODE_ENV:isDev?'"development"':'"production"'
            }
        }),
        new VueLoaderPlugin(),
        new HTMLPlugin(),

    ],
    module: {
        rules: [
            {
                test:/\.vue$/,
                loader: "vue-loader"
            },
            {
                test:/\.jsx$/,
                loader: "babel-loader"
            },
            {
                test:/\.(gif|jpg|jpeg|svg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options: {
                            limit:1024,
                            name:'[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
};

if(isDev){
    config.module.rules.push(
        {
            test:/\.styl/,
            use:[
                'style-loader',
                'css-loader',
                {
                    loader:'postcss-loader',
                    options:{
                        sourceMap:true
                    }
                },
                'stylus-loader'
            ]
        }
    )
    config.devtool = '#cheap-module-eval-source-map' /*该选项控制是否以及如何生成源映射*/
    config.devServer = {
        port: 8080,
        host: '0.0.0.0',
        overlay: {
            errors: true,
        },
        hot: true
    }
    config.plugins.push( //热更新
        new webpack.HotModuleReplacementPlugin(), /*主要用于代码热替换*/
        new webpack.NoEmitOnErrorsPlugin()
    )
}else{
    config.entry={
        app:path.join(__dirname,'src/index.js'),
        vendor:['vue']
    }
    config.output.filename='[name].[chunkhash:8].js'
    config.module.rules.push(  {
        test:/\.styl/,
        use:ExtractPlugin.extract({
            fallback:'style-loader',
            use:[
                'css-loader',
                {
                    loader:'postcss-loader',
                    options:{
                        sourceMap:true
                    }
                },
                'stylus-loader'
            ]
        })
    })
    config.plugins.push(
        new ExtractPlugin('styles.[hash:8].css'),
    )
    config.optimization={
        splitChunks:{
            cacheGroups: {
                commons: {
                    chunks:'initial',
                    minChunks:2,
                    maxInitialRequests:5,
                    minSize:0
                },
                vendor:{
                    test:/node_modules/,
                    chunks:'initial',
                    name:'vendor',
                    priority:10,
                    enforce:true
                }
            }
        },
        runtimeChunk:true
    }

}

module.exports = config