const { defineConfig } = require('@vue/cli-service')
const backend_api_url = process.env.VUE_APP_API_URL || 'http://localhost:3000';
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: backend_api_url,
        changeOrigin: true,
      }
    }
  }
})