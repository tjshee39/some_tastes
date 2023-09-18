const HtmlWebpackPlugin = require('html-webpack-plugin'); // 플러그인
const path = require('path'); // 해당 파일의 경로

module.exports = {
	// *==*==*==*==*==*==*==*
	// mode : Webpack mode
	mode: 'development',
	// *==*==*==*==*==*==*==*
	// entry : webpack의 최초 진입점. 웹 어플리케이션의 전반적인 구조 및 정보가 담겨있음
	entry: './src/index.tsx',
	// *==*==*==*==*==*==*==*
	// output: webpack의 빌드 결과
	output: {
		path: path.resolve(__dirname, 'dist'), // 해당 파일의 경로.
		filename: 'bundle.js', // 빌드 결과 파일의 이름
    publicPath: '/', 
	},
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
    host: '0.0.0.0',
    proxy: {
      '/api': {
          target: 'http://localhost:8000',
      },
    }
  },
  module: {
    rules: [
      {
        // module(loader)를 적용시킬 대상의 정규식
        test: /\.(js|jsx|ts|tsx)$/,
        // 제외 대상
        exclude: /node_modules/,
        // 사용할 loader
        loader: "babel-loader",     
      },
      {
        test: /\.css$/,
        // 사용할 모듈이 2개 이상일때. css-loader -> style-loader 순으로 작동
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      }, {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ['file-loader?name=[name].[ext]']
      }
        
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: "./public/index.html",
        favicon: "./public/favicon.ico",
        manifest: "./public/manifest.json",
        PUBLIC_URL: "static"
    }),      
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  }
}