require('./script/get_code_version');

const debug = process.env.NODE_ENV !== 'production';

module.exports = {
    runtimeCompiler: true,
    publicPath: '/',
    productionSourceMap: debug,
    css: {
        extract: !debug,
        sourceMap: debug
    },
    chainWebpack: config => {
        config.resolve.symlinks(true);
    },
    configureWebpack: config => {
        if (!debug) {
            return {
                optimization: {
                    minimize: true
                }
            };
        } else {
            config.devtool = 'source-map';
        }
    }
};
