module.exports = {
  configureWebpack: (config)=>{
    if(process.env.NODE_ENV === 'production'){
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  css: {
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    open: process.platform === 'darwin',
    host: '127.0.0.1',
    port: 8000,
    https: false,
    hotOnly: false,
    proxy: null, // 设置代理
    before: app => {}
}
};

