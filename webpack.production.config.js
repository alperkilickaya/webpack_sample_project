const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
/* const { CleanWebpackPlugin } = require("clean-webpack-plugin"); */
module.exports = {
  entry: {
    "hello-world": "./src/hello-world.js",
    "patato-image": "./src/patato-image.js",
  },
  output: {
    // contenthash is for cache busting
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    // for webpack5 default value is auto
    publicPath: "/static/",
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
        test: /\.(png|jpg|jpeg)$/,
        // this is auto type for webpack5. below 8kb it will be inline type otherwise it will be resource type
        type: "asset",
        parser: {
          dataUrlCondition: {
            // below 8kb it will be inline type otherwise it will be resource type
            maxSize: 8 * 1024,
          },
        },
        // each asset will be in a separate file. It makes the bundle.js file smaller but needs more requests to the server
        /* type: "asset/resource", */
        // inline type is for small files like svg. it will generate base64 string in the bundle.js file
        /*  type: "asset/inline", */
      },
      {
        test: /\.(txt)$/,
        type: "asset/source",
      },
      // css loader
      {
        test: /\.css$/,
        /* use: ["style-loader", "css-loader"], */
        use: [MiniCssExtractPlugin.loader, "css-loader"],
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
    // this plugin is for extracting the css into a separate file
    new MiniCssExtractPlugin({
      // contenthash is for cache busting
      filename: "[name].[contenthash].css",
    }),
    /*  new CleanWebpackPlugin(), */
    // use chunks for splitting the code
    // use htmlwebpack instance for multiple html files
    new HtmlWebpackPlugin({
      title: "Hello world",
      filename: "hello-world.html",
      chunks: ["hello-world"],
      meta: {
        description: "This is a description for hello world",
      },
      template: "./src/page-template.hbs",
      // for minifying the html. it should be true in production mode
      minify: false,
    }),
    new HtmlWebpackPlugin({
      title: "Patato image",
      filename: "patato-image.html",
      chunks: ["patato-image"],
      meta: {
        description: "This is a description for patato image",
      },
      template: "./src/page-template.hbs",
      // for minifying the html
      minify: false,
    }),
  ],
};
