const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    // for webpack5 default value is auto
    publicPath: "dist/",
  },
  mode: "none",
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
        // each asset will be in a separate file. It makes the bundle.js file smaller bu t needs more requests to the server
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
    ],
  },
  plugins: [
    new TerserPlugin(),
    // this plugin is for extracting the css into a separate file
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
};
