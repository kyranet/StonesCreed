const CopyWebpackPlugin = require('copy-webpack-plugin');
const production = process.env.NODE_ENV === 'production';

module.exports = {
	mode: production ? 'production' : 'development',
	devtool: production ? 'none' : 'source-map',
	entry: './src/lib/main.ts',
	output: {
		filename: 'js/bundle.min.js'
	},
	resolve: {
		// Add `.ts` and `.tsx` as a resolvable extension.
		extensions: ['.ts', '.tsx', '.js']
	},
	plugins: [
		new CopyWebpackPlugin([{ from: 'static', context: __dirname }])
	],
	module: {
		rules: [
			// all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
			{ test: /\.tsx?$/, loader: 'ts-loader' }
		]
	}
}
