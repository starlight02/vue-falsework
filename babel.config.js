process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ]
};
