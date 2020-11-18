### 一.前言

1. 如何建立一个自己的博客？这是我的第一次尝试，属于学习版本
2. 项目所用技术栈： Vue + Node.js + MySQL
3. 项目包括： 前台博客展示页面 + 后台管理博客内容页面 + 数据库储存数据



### 二.项目初始化

1. 建立一个远程仓库（略）

2. 用 vue-cli 初始化项目，删除不必要的文件，添加 .prettierrc文件，解决提交空格问题

   ```
   .prettierrc 文件中:
   
   {
     "semi": false,
     "singleQuote": true,
     "printWidth": 200,
     "trailingComma": "none"
   }
   
   .eslintrc.js 文件 rules 节点 :
   
   'space-before-function-paren': 0
   ```

   

3. 将初始化项目推送到远程仓库（略）

4. 创建前台页面分支  20201118/fg_index

### 三.前台展示页面 index

1. 