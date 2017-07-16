var path = require("path");

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'bundle.js'
    },

    module: {
        loaders : [{
            test: /\.js$/, loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
    },
}