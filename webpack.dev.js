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
      "/api": {
        target:
          "https://ahj-rxjs-dlmdfqpoy-tuan-anhs-projects-4110927b.vercel.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],
});
