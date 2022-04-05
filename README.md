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

# 云服务器的那些坑
    // node.js
    nodejs 官网直接下载tar.gz 解压到/usr/local/lib/nodejs
    
    // nginx
    nginx 这个坑就多了 同样是官网 下载tar.gz 二进制版本 需要编译,但是可能是版本比较新的缘故吧,在make那部出了好多错，最后一查都是云服务器的环境太老了导致的。
    
    // 首先是没有pcre 不用编译直接塞到 /usr/local/src/pcre-8.45 
    https://sourceforge.net/projects/pcre/files/pcre/8.45/ 
    
    // 然后又提示 aclocal-1.16: command not found，结果一查就是automake和autoconf的版本问题了
    
    // automake
    https://ftp.gnu.org/gnu/automake/ 下载
    ./configure
    make
    make install
    /usr/bin/autoconf -V

    http://ftp.gnu.org/gnu/autoconf/ 下载 
    ./configure --prefix=/usr/
    make
    make install
    到这才把nginx装完 

## 发布
 - npm run build 生成dist 文件夹
    把这个文件夹放到nginx的html文件夹下改名ghome
    nginx那个 location /ghome 也要有。










  
