import fs from 'fs';
export const writePackageFile = (path, strArr) => {
    fs.writeFileSync(path, `
    {
        "name": "react-news-mange-system-server",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "scripts": {
          "test": "echo Error: no test specified && exit 1",
          "dev": "nodemon ./src/app.ts"
        },
        "keywords": [],
        "author": "",
        "license": "ISC",
        "dependencies": {
          "koa": "^2.13.4",
          ${strArr.includes('koa-body') ? '"koa-body": "^5.0.0",' : ''}
          ${strArr.includes('koa-cors') ? '"koa-cors": "^0.0.16",' : ''}
          ${strArr.includes('koa-static') ? '"koa-static": "^5.0.0",' : ''}
          "koa-router": "^12.0.0",
          ${strArr.includes('prisma') ? '"prisma": "^4.4.0"' : ''}
        },
        "devDependencies": {
          "@types/koa": "^2.13.5",
          ${strArr.includes('koa-cors') ? '"@types/koa-cors": "^0.0.2",' : ''}
          ${strArr.includes('koa-static') ? '"@types/koa-static": "^4.0.2",' : ''}
          "@types/koa-router": "^7.4.4",
          "typescript": "^4.8.4",
          "ts-node": "^10.9.1",
          "nodemon": "^2.0.20"
        }
      }      
    `);
};
