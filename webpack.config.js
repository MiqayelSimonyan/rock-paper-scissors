const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const outputPath = path.resolve(__dirname, "./dist");

const webpackConfig = {
  entry: {
    app: ["react-hot-loader/patch", path.resolve(__dirname, "./index.js")]
  },
  output: {
    path: outputPath,
    filename: "[name].js" // entry name (app)
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: "pre",
        use: "eslint-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          "style-loader", // add to dom
          "css-loader", // add to webpack graf
          "sass-loader" // sass compile to css
        ]
      },
      {
        test: /\.(gif|png|jpg|jpeg|svg)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "./assets/"),
        use: "url-loader?limit=10000&name=assets/[name]-[hash].[ext]"
      }
    ]
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./components"),
      containers: path.resolve(__dirname, "./containers"),
      containers: path.resolve(__dirname, "./middlewars"),
      assets: path.resolve(__dirname, "./assets")
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./assets/index.html"),
      filename: "index.html",
      path: outputPath
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname + "./dist"),
    port: 3030,
    historyApiFallback: true,
    inline: true,
    hot: true,
    host: "0.0.0.0"
  }
};

module.exports = webpackConfig;
