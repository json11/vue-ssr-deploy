


module.exports= (isDev) => {
    return {
        preserveWhiteSpace: true,
        extractCSS: !isDev,
        cssModules: {
            localIdentName: isDev?'[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
            camelCase: true, // 驼峰命名 会自动把css 里面-连接的命名 转化成 驼峰命名
        },
        // hotReload: false // 根据环境变量生成
    }
}