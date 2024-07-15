/**
 * @type {import('webpack').Configuration}
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyjsPlugin = require('uglifyjs-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

// 获取处理样式的Loaders
const getStyleLoaders = (preProcessor) => {
    return [
      MiniCssExtractPlugin.loader,
      {
        loader:  "css-loader",
        options: {
            modules: {
                localIdentName: '[local]--[hash:base64:5]'
            }
        },
      },
      {
        loader: "postcss-loader",
        options: {
          postcssOptions: {
            plugins: [
              "postcss-preset-env", // 能解决大多数样式兼容性问题
            ],
          },
        },
      },
      preProcessor,
    ].filter(Boolean);
  };

module.exports = {
	entry: path.resolve(__dirname, '../src/index.tsx'),
	output: {
		filename: 'static/js/[name].[hash:6].chunk.js',
		path: path.resolve(__dirname, '../dist'),
        chunkFilename: "static/js/[name].[hash:6].chunk.js", // 动态导入输出资源命名方式
        // assetModuleFilename: "static/media/[name].[hash][ext]", // 图片、字体等资源命名方式（注意用hash）
        clean: true,
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.less', '.css']
	},
	plugins: [
        new BundleAnalyzerPlugin(),
        new ESLintWebpackPlugin({
            // 指定检查文件的根目录
            context: path.resolve(__dirname, "../src"),
            exclude: "node_modules", // 默认值
            cache: true, // 开启缓存
            // 缓存目录
            cacheLocation: path.resolve(
                __dirname,
                "../node_modules/.cache/.eslintcache"
            ),
          }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[hash:6].chunk.css'
        }),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, '../public/index.html'),
			favicon: path.resolve(__dirname, '../public/favicon.ico'),
			hash: true,
            minify: {
                collapseWhitespace: true, // 折叠空白区域
                preserveLineBreaks: false,
                minifyCSS: true, // 压缩文内css
                minifyJS: true, // 压缩文内js
                removeComments: true, // 移除注释
              },
		}),
        new CleanWebpackPlugin({
			dry: false,
			cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, 'dist')],
		}),

	],
    module: {
		rules: [
			{
				test: /\.(js|ts)x?$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
                    options: {
                        cacheDirectory: true, // 开启babel编译缓存
                        cacheCompression: false, // 缓存文件不要压缩
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',	// 编译react
                            '@babel/preset-typescript',	// 编译ts
                        ],
                        plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                      },
				},
			},
            {
                test: /\.css$/,
                use: getStyleLoaders()
            },
            {
                test: /\.less$/,
                use: getStyleLoaders('less-loader'),
            },
            {
                test: /\.(jep?g|png|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name].[ext]',
                    },
                },
                generator:{
                    filename:'static/images/[name].[contenthash:8][ext]' // 加上[contenthash:8]
                  },
            },
            {
                test: /woff|ttf|eot|svg|otf/,
                use: {
                    loader: 'file-loader',
                },
                generator:{
                    filename:'static/fonts/[name].[contenthash:8][ext]', // 加上[contenthash:8]
                  },
            },
            {
                test: /\.jpe?g|png|gif/, // 图片在范围内使用url-loader处理，转化成base64，范围外使用file-loader处理
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100 * 1024,
                        name: `img/[name].[ext]`,
                    },
                },
                generator:{
                    filename:'static/images/[name].[contenthash:8][ext]' // 加上[contenthash:8]
                  },
            },
		],
	},
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new UglifyjsPlugin({
                uglifyOptions: {
                    output: {
                        beautify: false, // 不格式化
                        comments: false, // 不保留注释
                    },
                    compress: {
                        drop_console: true, // 去除打印语句
                    },
                },
            }),
        ],
    },

};