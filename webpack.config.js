const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require('merge');
const productionConfig = merge([
  {
    output: {

      publicPath: "/",


      // Tweak this to match your GitHub project name
      publicPath: "/arman-mart.github.io/",

    },
  },
]);

module.exports = {
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    historyApiFallback:true,
    hot:true
  },

  entry: "./src/app/app.ts",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader","css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
  ],
  watch: true,
};