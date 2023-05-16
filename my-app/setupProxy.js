const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  console.log("proxy works!!!");
  app.use(
    "/storage", // Replace with your API endpoint
    createProxyMiddleware({
      target: "http://laravel.pd018.com", // Replace with your API URL
      changeOrigin: true,
    })
  );
};
