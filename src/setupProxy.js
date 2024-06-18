const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/auth",
    createProxyMiddleware({
      target: "https://trip-by-day-frontend.vercel.app",
      changeOrigin: true,
    })
  );
};
