module.exports = {
    devServer: {
        proxy: {
            '/api': {
                //target: 'http://126.62.77.31:3000',
                target: 'http://192.168.1.5:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}