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

## 环境配置
  前后端分离，所以前端单独服务器，所以生产环境需要装node.js
  添加了.env.production .env.development 文件
  对vite.config.ts做了修改。

# 云服务器
  nginx as a veb server, i use the official image to build this app image.

## 发布
 - npm run build 生成dist 文件夹
    把这个文件夹放到nginx的html文件夹下改名ghome
    nginx那个 location /ghome 也要有。

## 百度网盘开放平台
https://pan.baidu.com/union/home?menuKey=union-home








  
