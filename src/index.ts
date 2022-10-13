#!/usr/bin/env node

import { writePackageFile } from './utils/writePackageFile.js';
import { writeIndexFile } from './utils/writeIndexFile.js';
import { writeAppFile } from './utils/writeApp.js';
import { dirname} from 'path';
import { mkdir } from './utils/mkdir.js';
import inquirer from "inquirer";
import chalk from "chalk";
import {fileURLToPath} from 'url'
import shell from 'shelljs'
import logSymbols from "log-symbols";
import ora from "ora";

export const __dirname=dirname(fileURLToPath(import.meta.url))

async function questions(): Promise<{
  name: "koa-ts-project";
  moduleList: ["koa-cors","koa-body","koa-static","prisma"];
}|undefined> {
  try {
    const res = await inquirer.prompt([
      {
        name: "name",
        type: "input",
        default: "koa-ts-project",
        message: "Project name?:",
      },
      {
        name: "moduleList",
        type: "checkbox",
        choices: ["koa-cors","koa-body","koa-static","prisma"],
        message: "choose modules which you are needed",
      },
    ]);
    return res;
  } catch (error) {
    console.log(chalk.red(error));
  }
  
}

async function main(){
    //等待用户选择
    const res=await questions()
    if(!res)return
    const {name,moduleList}=res

    
    const spinner=ora('loading...').start()


    const dir=process.cwd()+'/'+name
    shell.rm('-rf',dir)
    mkdir(dir+'/src/router')
    writeAppFile(dir+'/src/app.ts',moduleList)
    writeIndexFile(dir+'/src/router/index.ts')
    writePackageFile(dir+'/package.json',moduleList)

    shell.cd(`./${name}`)
    
    if(!shell.which('pnpm')){
      shell.echo(chalk.red("sorry you don't install pnpm"))
      shell.exit(1)
    }

    //安装依赖
    let log1= shell.exec('pnpm install')
    if(log1.code==1){
      
      //初始化ts配置文件
      let log2=shell.exec('npx tsc --init')
      if(log2.code!==1){

        let log3=shell.exec('npx prisma init')
        if(log3.code!==1){
          console.log('\n\n')
          spinner.succeed(chalk.green('start ok'))
          console.log(chalk.green(`cd ${name}`))
          console.log(chalk.green(`npm run dev`))
        }else{
          shell.exec(chalk.yellow('prisma is not init,Please initialize manually'))
          console.log('\n\n')
          console.log(chalk.green(`cd ${name}`))
          console.log(chalk.green(`npm run dev`))
        }
        
      }
      

    }else{
      console.log(chalk.red(log1.stderr))
    }

    

    /* //初始化prisma
    if(moduleList.includes('prisma')){
      console.log(shell.exec('prisma init'))
    } */
}

main()