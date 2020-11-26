const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    proxy('/api/escort', {
      target: 'http://1111111111111',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    })
  )
}
