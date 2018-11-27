import Router from 'koa-router'
import { base_API } from "../config"
//引入我们的登录注册控制器
import UserController from '../Controller/UserController'
//引入文章相关的控制器
import ArticleController from '../Controller/ArticleController'
//引入标签控制器
import TagController from '../Controller/TagController'
//引入阅读控制器
import ReadController from '../Controller/ReadController'
//引入概要控制器
import BriefsController from '../Controller/BriefsController'
//引入验证token合法性的方法
import checkToken from '../utils/checkToken'

const router = new Router()
router.get('/',async ctx=>{
    ctx.body = '欢迎使用vue-blog接口测试服务器!!!!!'
})
//所有的路由都写在这里就可以了
//前端所有的请求发过来的时候都是http://localhost:3000/api/.....
router.prefix(`${base_API}`)

//登录
router.post('/login',UserController.login)
//退出
//只要是登录后才能看到的内容都需要验证一下token的合法性.
router.get('/logout',checkToken,UserController.logout)

//获取所有的文章
router.get('/art',checkToken,ArticleController.getArt)
//添加一篇新的文章
router.post('/articles/add',checkToken,ArticleController.addArticle)
//查询一下最新发布的那片文章的详细信息
router.get('/articles/:id',checkToken,ArticleController.getOneArticle)
//更新一篇新的文章
router.post('/articles/update/:id',checkToken,ArticleController.updateArticle)
//删除一篇文章
router.delete('/articles/:id',checkToken,ArticleController.deleteArticle)
//发布文章
router.put('/articles/publish/:id',checkToken,ArticleController.publishArticle)

//获取所有的tags标签
router.get('/gettags',checkToken,TagController.getTags)
//删除选中的tags标签
router.post('/deletetetag/:id',checkToken,TagController.updatetags)
//修改选中的tags标签
router.post('/updatetag/:id',checkToken,TagController.updatetags)

//获取所有图书
router.get('/getbooks/',checkToken,ReadController.getBookList)
//删除图书
router.post('/deletebook/:id',checkToken,ReadController.deletebook)
//添加图书
router.post('/addbook',checkToken,ReadController.addbook)
//修改图书
router.post('/updatebook/:id',checkToken,ReadController.updatebook)

//获取我的页面数据
router.get('/briefs',checkToken,BriefsController.getBriefs)
//保存我的页面数据 updateAbout
router.post('/updates',checkToken,BriefsController.updateAbout)

//获取页面文章
router.get('/home',ArticleController.getArt)
//点击获取文章 article
router.get('/article/:id',ArticleController.getOneArticle)
//归档
router.get('/home',ArticleController.getArt)
//标签
router.get('/introductions',ArticleController.getArt)
//阅读列表
router.get('/books',ReadController.getBookList)
//关于我
router.get('/about',BriefsController.getBriefs)

export default router