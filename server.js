const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const env = process.env.NODE_ENV;
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackConfig = require("./webpack.dev.config.js");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(
  "/2/tweets/search/",
  createProxyMiddleware({
    target: "https://api.twitter.com",
    changeOrigin: true,
  })
);

const DIST_DIR = webpackConfig.output.path;
let PORT = 8888;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (env === "production") {
  PORT = 8889;
  app.use(express.static("build"));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
} else {
  const compiler = webpack(webpackConfig);
  app.use(express.static("dll"));
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
    })
  );

  app.use(webpackHotMiddleware(compiler));
  app.get("*", (req, res, next) => {
    const filename = path.join(DIST_DIR, "index.html");

    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set("content-type", "text/html");
      res.send(result);
      res.end();
    });
  });
}

app.listen(PORT, () => {
  console.log("Loading: http://localhost:%s", PORT);
});
