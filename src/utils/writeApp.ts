import fs from 'fs'
export const writeAppFile=(path:string,strArr:string[])=>{
    fs.writeFileSync(path,`
    ${strArr.includes('koa-body')?'import koaBody from "koa-body"':''}
    import Koa from 'koa'
    import { router } from './router/index';
    ${strArr.includes('koa-cors')?'import koaCors from "koa-cors"':''}
    ${strArr.includes('koa-static')?'import KoaStatic from "koa-static"':''}
    import {resolve} from 'path'
    const app=new Koa()
    ${strArr.includes('koa-cors')?'app.use(koaCors())':''}
    ${strArr.includes('koa-body')?`app.use(koaBody({
        multipart:true,
        formidable:{
            uploadDir:resolve(__dirname,'../public'),
            keepExtensions:true,
        }
    }))`:''}
    ${strArr.includes('koa-static')?`app.use(KoaStatic(resolve(__dirname,'../public')))`:''}
    app.use(router.routes())
    
    app.listen(3000,()=>{
        console.log('server is running at http://localhost:3000')
    })`)
}