/* eslint-disable */
const path = require("path");
const withCss = require("@zeit/next-css");

module.exports = withCss({
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style\/css.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === "function") {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === "function" ? [] : origExternals)
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: "null-loader"
      });
    }
    config.resolve.alias["components"] = path.join(__dirname, "components");
    config.resolve.alias["api"] = path.join(__dirname, "utils/api");
    config.resolve.alias["context"] = path.join(__dirname, "utils/context");
    config.resolve.alias["utils"] = path.join(__dirname, "utils");

    return config;
  },
  exportPathMap: function() {
    return {
      "/": { page: "/" },
      "/login": { page: "/login" },
      "/register": { page: "/register" },
      "/contact": { page: "/contact" },
      "/dashboard": { page: "/dashboard" },
      "/about": { page: "/about" }
    };
  }
});
