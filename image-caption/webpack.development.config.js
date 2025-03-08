const path = require("path");
// we don't need this plugin in development mode
/* const TerserPlugin = require("terser-webpack-plugin"); */
// we don't need this plugin in development mode
/* const MiniCssExtractPlugin = require("mini-css-extract-plugin"); */
const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  entry: "./src/image-caption.js",
  output: {
    // contenthash is for cache busting. it is not needed in development mode
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    // for webpack5 default value is auto
    publicPath: "http://localhost:9003/",
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
      index: "image-caption.html", // it will serve the index.html file
    },
    port: 9003, // it will run the server on port 9000
    open: true, // it will open the browser automatically
    hot: true, // it will hot reload the page automatically
  },
  module: {
    rules: [
      {
        test: /\.txt/,
        type: "asset/source",
      },
      // css loader
      {
        test: /\.css$/,
        /* use: ["style-loader", "css-loader"], */
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          // class properties are now supported in all browsers generally.
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.hbs$/,
        use: ["handlebars-loader"],
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
      title: "Image caption",
      filename: "image-caption.html",
      meta: {
        description: "This is a description for image caption",
      },
      template: "./src/page-template.hbs",
    }),
    new ModuleFederationPlugin({
      name: "ImageCaptionApp",
      filename: "remoteEntry.js",
      exposes: {
        "./ImageCaption": "./src/components/image-caption/image-caption.js",
      },
    }),
  ],
};
