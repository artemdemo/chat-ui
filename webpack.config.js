var path = require('path');

module.exports = {
    entry: './source/index.js',
    devtool: 'source-map',
    output: {
        path: __dirname + '/lib/',
        filename: 'chat-ui.js',
        library: 'chat-ui',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/
            }
        ]
    },
    resolve: {
        root: path.resolve('./source'),
        extensions: ['', '.js']
    },
    plugins: []
};
