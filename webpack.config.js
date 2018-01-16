var path = require('path');
module.exports = {
    entry: {
        app: './src/app.ts',
        test: './test/NodeTest.ts',
    },
    output: {
        path: require("path").resolve("./dst/js/"),
        filename: '[name].js',
        devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    module: {
        loaders: [
            {
                exclude: /(node_modules)/,
                loaders: ["babel-loader", "ts-loader"]
            }
        ]
    },
    devtool: 'inline-source-map'
}