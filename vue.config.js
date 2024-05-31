const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: 'source-map'
  },
})
// module.exports = merge(prodEnv, {
//   NODE_ENV: '"development"',
//   BASE_API: '"http://localhost:8081"' //配置为本地地址才会访问到本地虚拟的服务器，从而通过第1步中代理访问API服务，避免跨域
// })