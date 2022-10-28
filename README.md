## Vue 3 + Typescript + Vite + pinia + vue-router

## Create project document how to bulid a project
  before create project, you should install node to promit npm and node command is standy.
  npm -v
  node -v<br />

    // 在想要创建的工程路径下执行以下命令，3到6秒就可以结束
    npm init vite@latest
    // 1.填写 g-home
    // 2.选择vue
    // 3.vue.ts
    
    cd g-home
    npm install

## vue-router
  
    npm install vue-router -S

## pinia
    // instand of vuex
    npm install pinia -S

## element-plus
    npm install element-plus -S

## js-cookie
    npm install js-cookie -S

## vite-plugin-mock

    // to enter the home page:
    localhost:3000/home?tenantId=XXX&account=YYY&token=ABCDEFG

## 环境配置
  添加了.env.development ebv.test .env.production  文件
  development: 
    开发环境，使用mock，不需要后台联动
  test:
    测试环境需要 后台java程序支持，同时需要百度第三方认证。
  prod:
    生产环境通过 jenkins cicd进行发布配置。

# 云服务器
  nginx as a veb server, i use the official image to build this app image.

## 发布
 - npm run build 生成dist 文件夹

## 百度网盘开放平台
https://pan.baidu.com/union/home?menuKey=union-home








  
