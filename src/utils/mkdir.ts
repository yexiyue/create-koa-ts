import fs from 'fs'

export const mkdir=(path:string)=>{
    fs.mkdirSync(path,{recursive:true})
}