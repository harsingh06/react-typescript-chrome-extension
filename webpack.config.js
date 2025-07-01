const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const packageJson = require('./package.json');

module.exports = {
  entry: {
    background: './src/background.ts',
    'content-google': './src/content-google.ts',
    'content-microsoft': './src/content-microsoft.ts',
    sidepanel1: './src/sidepanel1/index.tsx',
    sidepanel2: './src/sidepanel2/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/sidepanel1/index.html',
      filename: 'sidepanel1.html',
      chunks: ['sidepanel1'],
    }),
    new HtmlWebpackPlugin({
      template: './src/sidepanel2/index.html',
      filename: 'sidepanel2.html',
      chunks: ['sidepanel2'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/manifest.json',
          to: 'manifest.json',
          transform(content, path) {
            const manifest = JSON.parse(content.toString());
            manifest.name = packageJson.name;
            manifest.description = packageJson.description;
            manifest.version = packageJson.version;
            return JSON.stringify(manifest, null, 2);
          },
        },
      ],
    }),
  ],
};
