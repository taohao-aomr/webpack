// 如果使用的是最新的postcss
// 在webpack里直接写options 或者 postcssOptions好像不行（也可能是我写错了）还没有仔细研究 下面是官方写法
module.exports = {
    plugins: [
      require('autoprefixer'),
    ],
  };
