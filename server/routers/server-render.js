const ejs = require("ejs")

module.exports= async (ctx, renderer, template) => {
    ctx.headers["Content-Type"]= "text/html"

    const context = {url: ctx.path, user: ctx.session.user}

    try {
        const appString = await renderer.renderToString(context)
        console.log('+++++++++++++++++', context.router.currentRoute.fullPath, ctx.path)
        if(context.router.currentRoute.fullPath !== ctx.path) {
            return ctx.redirect(context.router.currentRoute.fullPath)
        }

        const {
            title
        } = context.meta.inject()

        const html= ejs.render(template, {
            appString,
            style: context.renderStyles(),
            scripts: context.renderScripts(),
            title: title.text(),
            initalState: context.renderState()
        })

        ctx.body= html

    } catch (e) {
        console.log("render error", e)
        throw e
    }
}