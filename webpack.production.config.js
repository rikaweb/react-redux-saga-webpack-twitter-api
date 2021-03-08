const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpackbar = require("webpackbar");

const PUBLIC_PATH = "/";

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "src", "index"),
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: PUBLIC_PATH,
    filename: "dist/[name].[chunkhash:8].js",
    chunkFilename: "dist/[name].[chunkhash:8].chunk.js",
  },
  stats: {
    children: false, 
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true, 
        terserOptions: {
          // https://github.com/terser/terser#minify-options
          compress: {
            warnings: false,
            drop_debugger: true,

            pure_funcs: ["console.log"],
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: path.resolve(__dirname, "src"),
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
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
    ],
  },
  plugins: [

    new CleanWebpackPlugin(),
    new webpackbar(),
    new AntdDayjsWebpackPlugin(), 

    new webpack.DefinePlugin({
      "process.env": "prod",
    }),

    new MiniCssExtractPlugin({
      filename: "dist/[name].[chunkhash:8].css",
    }),

    new HtmlWebpackPlugin({
      filename: "index.html", 
      template: "./public/index.html", 
      hash: false, 
      inject: true, 

      registerServiceWorker: `<script>
        if ("serviceWorker" in navigator) {
          window.addEventListener("load", () => {
            navigator.serviceWorker.register("./service-worker.js");
          });
        }
      </script>`,
    }),
    /**
     * https://github.com/webpack-contrib/copy-webpack-plugin
     * */
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

    //  https://github.com/itgalaxy/favicons#usage

    new FaviconsWebpackPlugin({
      logo: "./public/favicon.png",
      favicons: {
        appName: "ReactPWA",
        appShortName: "React",
        appDescription: "ReactPWA Demo",
        background: "#222222",
        theme_color: "#222222",
        appleStatusBarStyle: "black-translucent",
        display: "standalone",
        start_url: PUBLIC_PATH,
        logging: false,
        pixel_art: false,
        loadManifestWithCredentials: false,
        icons: {
          android: true,
          appleIcon: false,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: false,
          windows: false,
          yandex: false,
        },
      },
    }),

    new WorkboxPlugin.GenerateSW({
      skipWaiting: true,
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".css", ".wasm"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
