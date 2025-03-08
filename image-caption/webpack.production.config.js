const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
module.exports = {
  entry: "./src/image-caption.js",
  output: {
    // contenthash is for cache busting
    filename: "[name].[contenthash].js",
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
  mode: "production",
  // for splitting the code and also dependencies
  optimization: {
    splitChunks: {
      chunks: "all",
      // for minifying the code. Above 3kb it will be split
      minSize: 3000,
    },
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
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
    ],
  },
  plugins: [
    // this plugin is for extracting the css into a separate file
    new MiniCssExtractPlugin({
      // contenthash is for cache busting
      filename: "[name].[contenthash].css",
    }),
    new CleanWebpackPlugin(),
    // use chunks for splitting the code
    // use htmlwebpack instance for multiple html files
    new HtmlWebpackPlugin({
      title: "Image caption",
      filename: "image-caption.html",
      meta: {
        description: "This is a description for image caption",
      },
      template: "./src/page-template.hbs",
      // for minifying the html. it should be true in production mode
      minify: false,
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
