const Router = require('koa-router')

const userRouter = new Router({prefix: '/user'})

userRouter.post('/login', async (ctx) => {
    const user = ctx.request.body
    if(user.username === 'jsonp' && user.password === 'jsonp') {
        ctx.session.user = {
            username: 'jsonp'
        }
        ctx.body = {
            success: true,
            data: {
                username: 'jsonp'
            }
        }
    } else {
        ctx.status = 400
        ctx.body = {
            success: false,
            message: 'username or password error'
        }
    }
})

module.exports = userRouter