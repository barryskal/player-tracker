const resolve = require("path").resolve;
const DefinePlugin = require("webpack").DefinePlugin;

module.exports = {
  module: {
    rules: [
      {
        test: [
          /\.eot$/,
          /\.ttf$/,
          /\.woff$/,
          /\.woff2$/,
          /\.gif$/,
          /\.png$/,
          /\.jpg$/
        ],
        use: [
          {
            loader: "url-loader",
            query: {
              limit: 10000,
              name: "static/media/[name].[hash:8].[ext]"
            }
          }
        ]
      },

      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            query: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]__[local]___[hash:base64:5]"
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  }
};
