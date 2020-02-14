const path = require('path')

module.exports = {
    mode: 'production',
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
    },
    optimization: {
        minimize: false
    }
}