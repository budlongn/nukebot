const path = require('path')

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        server: './src/index.js'
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'index.js'
    },
    target: 'node',
    module: {
        rules: [
            {
                exclude: /node_modules/
            }
        ]
    }
}