const path = require('path')
const withCSS = require('@zeit/next-css')

module.exports = (phase) => {
  return withCSS({
    env: {
      TODO_API_URL: process.env.TODO_API_URL,
    },
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            include: ['node_modules'],
            limit: 100000,
            name: '[name].[ext]',
          },
        },
      })

      config.module.rules.forEach((rule) => {
        if (rule.test !== undefined && rule.test.source.includes('|svg|')) {
          rule.test = new RegExp(rule.test.source.replace('|svg|', '|'))
        }
      })

      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      })

      config.resolve.alias = {
        ...config.resolve.alias,
        pages: path.resolve(__dirname, 'pages'),
        store: path.resolve(__dirname, 'store'),
        styles: path.resolve(__dirname, 'styles'),
        components: path.resolve(__dirname, 'components'),
        assets: path.resolve(__dirname, 'public/assets'),
      }

      return config
    },
  })
}
