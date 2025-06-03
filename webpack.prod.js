import webpack from "webpack";
import { merge } from "webpack-merge";
import common from "./webpack.common.js";
import TerserPlugin from "terser-webpack-plugin";

export default merge(common, {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({})],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env.API_URL": JSON.stringify("/api/messages/unread"),
    }),
  ],
});
