var webpack = require("webpack"),
  config = require("../webpack.config"),
  CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;

config.plugins = [new CleanWebpackPlugin()].concat(config.plugins);

delete config.chromeExtensionBoilerplate;

webpack(config, function (err) {
  if (err) throw err;
});
