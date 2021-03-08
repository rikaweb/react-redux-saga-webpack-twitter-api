const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HappyPack = require("happypack");
const webpackbar = require("webpackbar");
const PUBLIC_PATH = "/";
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: "development",
  entry: [
    "webpack-hot-middleware/client?reload=true&path=/__webpack_hmr", 
    "./src/index.js",
  ],
  output: {
    path: __dirname + "/", 
    publicPath: PUBLIC_PATH, 
    filename: "bundle-[contenthash].js", 
  },
  devtool: "eval-source-map", 
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        enforce: "pre",
        use: ["eslint-loader"],
        include: path.resolve(__dirname, "src"),
      },
      {
        test: /\.js?$/,
        use: ["happypack/loader"],
        include: path.resolve(__dirname, "src"),
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(eot|woff|otf|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
        include: path.resolve(__dirname, "src"),
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/[name].[hash:4].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        include: path.resolve(__dirname, "src"),
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "assets/[name].[hash:4].[ext]",
            },
          },
        ],
      },
      {
        test: /\.wasm$/,
        include: path.resolve(__dirname, "src"),
        type: "webassembly/experimental",
      },
      {
        test: /\.xml$/,
        include: path.resolve(__dirname, "src"),
        use: ["xml-loader"],
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new webpackbar(),
    new webpack.HotModuleReplacementPlugin(),
    new AntdDayjsWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env": "dev",
    }),
    new HappyPack({
      loaders: ["babel-loader"],
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      favicon: "./public/favicon.png",
      template: "./public/index.html",
      inject: true,
    }),

    new CopyPlugin({
      patterns: [
        {
          from: "./public/**/*",
          to: "./",
          globOptions: {
            ignore: ["**/favicon.png", "**/index.html"],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".less", ".css", ".wasm"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
};
