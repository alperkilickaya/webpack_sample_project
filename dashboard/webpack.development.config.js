const path = require("path");
// we don't need this plugin in development mode
/* const TerserPlugin = require("terser-webpack-plugin"); */
// we don't need this plugin in development mode
/* const MiniCssExtractPlugin = require("mini-css-extract-plugin"); */
const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  entry: "./src/dashboard.js",
  output: {
    // contenthash is for cache busting. it is not needed in development mode
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    // for webpack5 default value is auto
    publicPath: "http://localhost:9000/",
    // this is built in plugin for cleaning the output folder
    clean: {
      // if it is true, it will not delete the files. it will just show the files that will be deleted
      dry: false,
      /* keep: /\.css$/, */
    },
  },
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "./dist"),
    },
    devMiddleware: {
      writeToDisk: true, // it will write the files to the disk
      index: "dashboard.html", // it will serve the index.html file
    },
    historyApiFallback: {
      index: "dashboard.html", // it will serve the index.html file for all the routes
    }, // it will serve the index.html file for all the routes
    port: 9000, // it will run the server on port 9000
    open: true, // it will open the browser automatically
    hot: true, // it will hot reload the page automatically
  },
  module: {
    rules: [
      {
        test: /\.txt/,
        type: "asset/source",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          // class properties are now supported in all browsers generally.
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    /*  new TerserPlugin(), */
    // this plugin is for extracting the css into a separate file. it is not needed in development mode
    /* new MiniCssExtractPlugin({
      // contenthash is for cache busting
      filename: "style.[contenthash].css",
    }), */
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Dashboard",
      filename: "dashboard.html",
    }),
    new ModuleFederationPlugin({
      name: "App",
      remotes: {
        HelloWorldApp: "HelloWorldApp@http://localhost:9001/remoteEntry.js",
        PatatoImageApp: "PatatoImageApp@http://localhost:9002/remoteEntry.js",
      },
    }),
  ],
};
