const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


const base = {
    mode:'development',
    
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
        ],
      },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
}


const serverConfig = {
  target: 'node',
  entry: path.resolve(__dirname, 'app/server/app.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
  },
  ...base,
};

const clientConfig = {
  target: 'web', 
  entry: path.resolve(__dirname, 'app/client/index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist/client'),
    filename: 'index[hash].js',
  },
  plugins: [new CleanWebpackPlugin()],
  ...base,
};

module.exports = [serverConfig, clientConfig];