import koa from 'koa'
import cors from 'koa-cors'
import bodyParser from 'koa-bodyparser'
//路由文件
import router from './routes/index'
//数据库连接文件
import query from './utils/query'

const app = new koa()

app.use(cors())
app.use(bodyParser())
app.use(router.routes())

app.listen(4000,()=>{
    console.log('node is OK')
})
