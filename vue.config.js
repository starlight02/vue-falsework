const debug = process.env.NODE_ENV !== 'production';

module.exports = {
    runtimeCompiler: true,
    publicPath: './',
    productionSourceMap: debug,
    css: {
        extract: true,
        sourceMap: debug
    },
    chainWebpack: config => {
        config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
            bypassOnDebug: true
        })
        .end();
        //解决热更新
        config.resolve.symlinks(true);
    },
    configureWebpack: config => {
        if (!debug) {
            return {
                optimization: {
                    minimize: true,
                    splitChunks: {
                        cacheGroups: {
                            vendor: {
                                chunks: 'all',
                                test: /node_modules/,
                                name: 'vendor',
                                minChunks: 1,
                                maxInitialRequests: 5,
                                minSize: 0,
                                priority: 100
                            },
                            common: {
                                chunks: 'all',
                                test: /[\\/]src[\\/]js[\\/]/,
                                name: 'common',
                                minChunks: 2,
                                maxInitialRequests: 5,
                                minSize: 0,
                                priority: 60
                            },
                            styles: {
                                name: 'styles',
                                test: /\.(sa|sc|c)ss$/,
                                chunks: 'all',
                                enforce: true
                            },
                            runtimeChunk: {
                                name: 'manifest'
                            }
                        }
                    }
                }
            };
        } else {
            config.devtool = 'source-map';
        }
    }
};
