const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
          target: 'https://mjs-cosmic-chariots-app.herokuapp.com/',
          changeOrigin: true,
        })
    )
};