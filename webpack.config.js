import { fileURLToPath } from 'url'
import { createRequire } from 'module'
// Define "require"
const require = createRequire(import.meta.url)

const path = require('path')
const webpack = require('webpack')

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const IS_DEVELOPMENT = process.env.NODE_ENV === 'dev'

const dirApp = path.join(__dirname, 'app')
const dirShared = path.join(__dirname, 'shared')
const dirStyles = path.join(__dirname, 'styles')
const dirNode = 'node_modules'

// const ESOptions = {
//     extensions: [`js`, `jsx`],
//     exclude: [
//       `/node_modules/`,
//       `/bower_components/`,
//        VIRTUAL_MODULES_BASE_PATH,
//     ]
// }

export default ({
    entry: [
        path.join(dirApp, 'index.js'),
        path.join(dirStyles, 'index.scss')
    ],

    // output: {assetModuleFilename: 'images/[name][ext]'},

    resolve: {
        modules: [
            dirApp,
            dirShared,
            dirStyles,
            dirNode
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            IS_DEVELOPMENT
        }),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './shared',
                    to: ''
                }
            ]
        }),

        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),

        // new ImageMinimizerPlugin({
        //     minimizer: {
        //         // Implementation
        //         implementation: ImageMinimizerPlugin.sharpMinify,
        //         // Options
        //         options: {
        //             encodeOptions: {
        //                 jpeg: {
        //                     quality: 90
        //                 }
        //             }
        //         }
        //     }
        // }),

        new ESLintPlugin({
            extensions: ['js', 'jsx'],
            exclude: [
                '/node_modules/'
                // VIRTUAL_MODULES_BASE_PATH
            ]
        })
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: ''
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },

            // {
            //     test: /\.(png|svg|jpg|jpeg|gif)$/i,
            //     type: 'asset/resource'
            // },

            {
                test: /\.(jpe?g|png|gif|svg|woff2?|fnt|webp)$/,
                loader: 'file-loader',
                options: {
                    name (file) {
                        return '[name].[ext]'
                    }
                }
            },

            {
                test: /\.(jpe?g|png|gif|svg|webp)$/i,
                use: [
                    {
                        loader: ImageMinimizerPlugin.loader
                    }
                ]
            },

            {
                test: /\.(glsl|frag|vert)$/,
                loader: 'raw-loader',
                exclude: /node_modules/
            },

            {
                test: /\.(glsl|frag|vert)$/,
                loader: 'glslify-loader',
                exclude: /node_modules/
            }
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
    }
})
