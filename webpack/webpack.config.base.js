const path = require("path");
var webpack = require('webpack');

module.exports = {
  watch: false,
  entry: {
    main: "./src/assets/js/app.js"
  },
  output: {
    path: path.resolve(__dirname, "../dist/assets/js"),
    filename: "app.js"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    alias: {
      jquery: 'jquery/dist/jquery.min'
    },
  }, 
  plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    })
  ], 
};
