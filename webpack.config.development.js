import { fileURLToPath } from 'url'
import * as config from './webpack.config.js'
import { createRequire } from 'module'
// Define "require"
const require = createRequire(import.meta.url)

const { merge } = require('webpack-merge')
const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// const config = require('./webpack.config')

export default (merge(config.default, {
    mode: 'development',

    cache: false,

    devtool: 'inline-source-map',

    devServer: {
        static: path.resolve(__dirname, ''),
        devMiddleware: {
            writeToDisk: true
        },
        headers: {
            'Cache-Control': 'no-store'
        },
        // watchFiles: true,
        hot: false
    },

    output: {
        path: path.resolve(__dirname, 'public'),
    },

    plugins: [
        new CleanWebpackPlugin()
    ]
}))
