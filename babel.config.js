process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
    presets: [
        [
            '@vue/app',
            {
                polyfills: [
                    'es6.promise',
                    'es6.symbol'
                ],
                // useBuiltIns: 'entry'
            }
        ]
    ]
};
