const path = require('path');

module.exports = {
	entry: path.resolve('./../src/js/main.js'),
	output: {
		path: path.resolve(__dirname, './../build/assets/js'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env'],
					plugins: ['@babel/plugin-proposal-class-properties']
				}
			}
		]
	},
	devtool: 'source-map'
};
