
import fs from 'fs'

export const writeIndexFile=(path:string)=>{
    fs.writeFileSync(path,`
    import Router from "koa-router";

    export const router=new Router()
    
    router.get('/',(ctx)=>{
        ctx.body='<h1>hello world</h1>'
    })
    `)
}