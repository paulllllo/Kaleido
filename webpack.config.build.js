import { fileURLToPath } from 'url'
import * as config from './webpack.config.js'
import { createRequire } from 'module'
// Define "require"
const require = createRequire(import.meta.url)

const path = require('path')

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const { merge } = require('webpack-merge')
// const config = require('./webpack.config')

export default (merge(config.default, {
    mode: 'production',

    output: {
        path: path.join(__dirname, 'public')
    },

    plugins: [
        new CleanWebpackPlugin()
    ]
}))
