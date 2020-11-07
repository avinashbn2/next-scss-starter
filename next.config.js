const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const withCSS = require('@zeit/next-css')
module.exports = withCSS({
  webpack(config, { dev }) {
    const PRODUCTION = true
    const customConfig = {
      ...config,
    }

    customConfig.module.rules.push(
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
      },

      // SASS / SCSS
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          PRODUCTION ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                auto: true,
                localIdentName: PRODUCTION ? '[hash:base64]' : '[path][name]__[local]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            // Set up postcss to use the autoprefixer plugin
            options: { plugins: () => [require('autoprefixer')] },
          },
          {
            loader: 'resolve-url-loader',
            options: {
              engine: 'postcss',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
	  // for loading fonts
      {
        test: /\.(ttf|woff|woff2)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }
    )

    customConfig.plugins.push(
      new MiniCssExtractPlugin({
        filename: PRODUCTION ? '[name].[hash].css' : '[name].css',
        chunkFilename: PRODUCTION ? '[id].[hash].css' : '[id].css',
      })
    )
    customConfig.optimization.minimizer.push(
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({})
    )
    return customConfig
  },
})
