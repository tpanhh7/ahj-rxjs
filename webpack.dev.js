import webpack from "webpack";
import { merge } from "webpack-merge";
import common from "./webpack.common.js";

export default merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    port: 8080,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],
});
