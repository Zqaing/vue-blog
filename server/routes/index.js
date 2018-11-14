import Router from 'koa-router'
import {base_API } from "../config"
import UserController from '../Controller/UserController'
import checkToken from '../utils/checkToken'
const router = new Router()
//前端所有的请求发过来的时候都是http://localhost:3000/api/......
router.get('/',async ctx=>{
    ctx.body = '欢迎使用vue-blog接口测试服务器'
})
//所有的路由都写在这里就可以了
//省略/api
router.prefix(`${base_API}`)

//登录
router.post('/login',UserController.login)
//退出
router.get('/logout',checkToken,UserController.logout)

export  default router