module.exports = {
    presets: [
        [
            '@vue/cli-plugin-babel/preset',
            {
                corejs: {version: 3, proposals: true}
            }
        ]
    ],
    plugins: [
        '@babel/plugin-proposal-optional-chaining'
    ]
};
