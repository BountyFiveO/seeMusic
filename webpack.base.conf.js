const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BUILD_PATH = path.resolve(__dirname, './build');
const ROOT_PATH = path.resolve(__dirname, './');
const SRC_PATH = path.resolve(__dirname, './src');

module.exports = {
    entry: './src/main.js',
    output: {
        //Generated static file storage path
        path: BUILD_PATH,
        // publicPath It is the replacement path in front of the packaged file when it is referenced src="publicPath/index_bundle.js"
        //There is a pit here, because the path is directly spliced ​​at the end, so the backslash must be added at the end!！
        publicPath: '/Server/build/',
        filename: '[name].[chunkhash:8].js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue',
            options: {
                autoprefixer: {
                    browsers: ['last 2 versions']
                },
                loaders: {
                    js: 'babel',
                    // css:'vue-style!css?souceMap',
                    // scss:'vue-style!css?souceMap!sass',
                    css: ExtractTextPlugin.extract({
                        use: 'css?souceMap',
                        fallback: 'vue-style'
                    }),
                    scss: ExtractTextPlugin.extract({
                        use: 'css?souceMap!sass',
                        fallback: 'vue-style'
                    }),
                }
            }
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url?limit=8192',
            options: {
                name: '[name].[ext]?[hash:6]'
            }
        }, {
            test: /\.s[a|c]ss$/,
            // loader:'style!css?souceMap!sass!postcss'
            loader: ExtractTextPlugin.extract({
                use: "css?souceMap!sass!postcss",
                fallback: "style"
            })
        }, {
            test: /\.css$/,
            // loader:'style!css?souceMap!postcss'
            loader: ExtractTextPlugin.extract({
                use: "css?souceMap!postcss",
                fallback: "style"
            })
        }, { //A set of loaders that support font awesome
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=application/octet-stream"
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file"
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=image/svg+xml"
        }]
    },
    resolveLoader:{
        moduleExtensions:["-loader"]
    },
// Use webpack code spliting technique to split code to load on demand, because main.js is too big! !
// https://webpack.js.org/guides/code-splitting/
    resolve: {
        extensions: [
            '.js', '.vue'
        ],
        alias: {
            'vue$': 'vue/dist/vue',
            'root': ROOT_PATH,
            'src': SRC_PATH,
            'assets': SRC_PATH + '/assets',
            'css': SRC_PATH + '/css',
            'api': SRC_PATH + '/api',
            'components': SRC_PATH + '/components',
            'store': SRC_PATH + '/store',
            'node_modules': ROOT_PATH + '/node_modules',
        }
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                // Add autoprefixer to postcss 
                context: __dirname,
                postcss: [autoprefixer]
            },
            vue: {
                //Configure so that styles in all vue components are piped through postcss
                postcss: [require('autoprefixer')()]
            }
        }),
        new ExtractTextPlugin({
            filename: 'style.[chunkhash:8].css',
            // disable:true
            // allChunks: true
        })
    ]
};
