//连接数据库

//封装一个query方法,方便执行sql语句
import mysql from 'mysql'
import { db,dbName } from '../config'
import fs from 'fs'
import path from 'path'
let pool
const sqlContent = fs.readFileSync(path.resolve(__dirname,'..','./sql/zz_blog.sql'),'utf-8')
//第一次连接数据库的时候,没有指定数据库名称,这次连接的目的是能够创建一个zz_blog数据库
//并且将数据库文件执行,执行完毕后zz_blog数据库就有对应的表和数据了

const init = mysql.createConnection(db)
init.connect()
init.query('CREATE DATABASE zhen_blog',err=>{
    Object.assign(db,dbName)
    pool = mysql.createPool(db)
    if(err){
        console.log("数据库已存在")
    }else{
        query(sqlContent).then(res=>{
            console.log('数据库创建成功')
        }).catch(err=>{
            console.log(err)
        })
    }
})
init.end()


export default function query(sql, values){
    return new Promise((resolve,reject)=>{
        pool.getConnection(function(err,connection){
            if(err){
                reject(err);
            }else{
                connection.query(sql,values,(err,data)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(data);
                    }
                    connection.release()
                })
            }
        })
    })
}
