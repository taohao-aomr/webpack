// type 编写时会有提示
/**
 * @type {import('@babel/core').TransformOptions}
 */
module.exports = {
	presets: [
		[
			'@babel/env',
			{
				useBuiltIns: 'usage',
				corejs: 3,
			},
		],
		'@babel/preset-react',
		'@babel/preset-typescript',
	],
    "plugins": [
        [
            "@babel/plugin-transform-runtime",
            {
                "corejs": 3,//  corejs 配置依赖的是 `@babel/runtime-corejs3`, 需安装 @babel/runtime-corejs3
                "helpers": true,
                "regenerator": true,
                "useESModules": false
            }
        ]
    ]
};
