const Router = require('koa-router')
const axios = require('axios')
const MemoryFS= require('memory-fs')
const webpack= require('webpack')
const path = require('path')
const fs = require('fs')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')

const serverConfig= require('../../build/webpack.config.server')

const serverCompiler= webpack(serverConfig)



const mfs= new MemoryFS()

serverCompiler.outputFileSystem = mfs /// 输出目录是mfs

let bundle
serverCompiler.watch({}, (err, stats) => {  // 检测 服务端 js 变化 重新生成 bundle.js
    if(err) throw err
    stats = stats.toJson()
    stats.errors.forEach(err => console.log(err))
    stats.warnings.forEach(warn => console.warn(warn))

    const bundlePath= path.join(
        serverConfig.output.path,
        'vue-ssr-server-bundle.json'
    )
    bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))

    console.log('new bundle generated')
})

const handleSSR = async (ctx) => {
    if(!bundle) {
       ctx.body= "waiting a minite"
        return
    }

    const clientManifestResp= await axios.get(
        "http://127.0.0.1:8000/public/vue-ssr-client-manifest.json"
    )
    const clientManifest = clientManifestResp.data
    const tempalte = fs.readFileSync(
        path.join(__dirname, "../server.template.ejs"),
        'utf-8'
    )

    const renderer = VueServerRenderer
        .createBundleRenderer(bundle, {
            inject: false,
            clientManifest // 将webpack-dev-server 打包出来的js  用 script  的方式引入到ejs  模板转化的html 中
        })

    await serverRender(ctx, renderer, tempalte)
}


const router = new Router()

router.get("*", handleSSR)

module.exports = router