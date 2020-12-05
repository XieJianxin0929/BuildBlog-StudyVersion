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

1. 导入elementui

2. 创建components文件，创建index.vue

3. 部署路由规则

4. 使用header,aside,main布局容器

5. 填充header，aside

   ```
   components/index 文件中:
   
   <template>
     <el-container>
       <el-header style="padding: 0;">
         <el-card class="box-card">
           <el-row>
             <el-col :span="12"><img src="../../public/logo.jpg" width="40" height="40" style="vertical-align: middle; margin-left: 5px;" /><span class="text item">解健鑫的博客</span></el-col>
             <el-col :span="4"><el-input placeholder="写点什么吧..." prefix-icon="el-icon-search" v-model="input1"> </el-input></el-col>
             <el-col :span="8"
               ><ul>
                 <li class="el-icon-s-home"><span style="margin-left: 5px;">主页</span></li>
                 <li class="el-icon-menu">
                   <el-dropdown>
                     <span class="el-dropdown-link" style="margin-left: 5px;">目录索引<i class="el-icon-arrow-down el-icon--right"></i> </span>
                     <el-dropdown-menu slot="dropdown">
                       <el-dropdown-item>黄金糕</el-dropdown-item>
                       <el-dropdown-item>狮子头</el-dropdown-item>
                       <el-dropdown-item>螺蛳粉</el-dropdown-item>
                       <el-dropdown-item>双皮奶</el-dropdown-item>
                       <el-dropdown-item>蚵仔煎</el-dropdown-item>
                     </el-dropdown-menu>
                   </el-dropdown>
                 </li>
                 <li class="el-icon-s-opportunity"><span style="margin-left: 5px;">时间线</span></li>
                 <li class="el-icon-chat-dot-square">
                   <el-dropdown>
                     <span class="el-dropdown-link" style="margin-left: 5px;">联系我<i class="el-icon-arrow-down el-icon--right"></i> </span>
                     <el-dropdown-menu slot="dropdown">
                       <el-dropdown-item>黄金糕</el-dropdown-item>
                       <el-dropdown-item>狮子头</el-dropdown-item>
                       <el-dropdown-item>螺蛳粉</el-dropdown-item>
                       <el-dropdown-item>双皮奶</el-dropdown-item>
                       <el-dropdown-item>蚵仔煎</el-dropdown-item>
                     </el-dropdown-menu>
                   </el-dropdown>
                 </li>
               </ul></el-col
             >
           </el-row>
         </el-card>
       </el-header>
       <el-container>
         <el-aside width="200px" style="padding-top: 30px;">
           <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
             <el-submenu index="1">
               <template slot="title">
                 <i class="el-icon-location"></i>
                 <span>导航一</span>
               </template>
               <el-menu-item-group>
                 <el-menu-item index="1-1">选项1</el-menu-item>
                 <el-menu-item index="1-2">选项2</el-menu-item>
               </el-menu-item-group>
             </el-submenu>
             <el-submenu index="2">
               <template slot="title">
                 <i class="el-icon-location"></i>
                 <span>导航二</span>
               </template>
               <el-menu-item-group>
                 <el-menu-item index="1-1">选项1</el-menu-item>
                 <el-menu-item index="1-2">选项2</el-menu-item>
               </el-menu-item-group>
             </el-submenu>
             <el-submenu index="3">
               <template slot="title">
                 <i class="el-icon-location"></i>
                 <span>导航三</span>
               </template>
               <el-menu-item-group>
                 <el-menu-item index="1-1">选项1</el-menu-item>
                 <el-menu-item index="1-2">选项2</el-menu-item>
               </el-menu-item-group>
             </el-submenu>
           </el-menu>
         </el-aside>
         <el-main>
           <router-view />
         </el-main>
       </el-container>
     </el-container>
   </template>
   
   <script>
   export default {
     data() {
       return {
         input1: ''
       }
     },
     methods: {
       handleOpen(key, keyPath) {
         console.log(key, keyPath)
       },
       handleClose(key, keyPath) {
         console.log(key, keyPath)
       }
     }
   }
   </script>
   
   <style lang="less" scoped>
   .text {
     margin-left: 25px;
     font-size: 18px;
     font-weight: 600;
   }
   
   .item {
     padding: 18px 0;
   }
   
   .box-card {
     width: 100%;
   
     ul {
       margin: 0;
       padding: 0;
   
       li {
         float: left;
         margin-top: 10px;
         margin-left: 30px;
         list-style: none;
   
         &:hover {
           cursor: pointer;
           color: #67c23a;
         }
       }
     }
   }
   
   .el-icon-arrow-down {
     font-size: 12px;
   }
   
     .el-dropdown-link:hover {
       cursor: pointer;
       color: #67c23a;
     }
   </style>
   
   ```

   

### 四.建立数据服务层

 1. 建立数据库 myblog_db

 2. 建表 my_aside, 用于存放侧边栏一级导航和二级导航

 3. 建立一个远程仓库，用于存放服务层代码

 4. 创建app.js，用于生成服务器，下载express，建立服务器，测试，将代码推送到远程仓库

 5. 创建router文件，分发路由，router_handle路由处理文件，下载mysql，创建db连接数据库

 6. 解决跨域问题，下载并引入 cors

    ```
    app.js 文件中:
    
    const express = require("express")
    const cors = require("cors")
    const asideRouter = require('./router/aside')
    
    const app = express()
    app.use(cors())
    
    app.use((req, res, next) => {
      res.cc = function (err, status = 1) {
        res.send({
          status,
          message: err instanceof Error ? err.message : err
       })
      }
      next()
    })
    
    app.use("/myblog", asideRouter)
    
    app.listen(80, () => {
      console.log("服务器已启动~")
    })
    ```

    ```
    router/aside 文件中:
    
    const express = require("express")
    const aside_handler = require('../router_handler/aside')
    
    const router = express.Router()
    
    router.get("/getAsideInfo", aside_handler.getAsideInfo)
    
    
    module.exports = router
    
    ```

    ```
    router_handle/aside 文件中:
    
    const db = require('../db/index')
    
    // 获取侧边栏导航数据的处理函数
    exports.getAsideInfo = (req, res) => {
        const sql = 'select * from my_aside'
        db.query(sql, (err, results) => {
            // 1. 执行 SQL 语句失败
            if (err) return res.cc(err)
    
            // 2. 执行 SQL 语句成功
            res.send({
                status: 0,
                message: '获取侧边栏导航数据成功！',
                data: results,
            })
        })
    
    }
    ```

    

### 五.前台页面获取侧边栏数据并渲染

 1. 下载axios, 挂载到vue原型上

    ```
    main.js 文件中:
    
    import axios from 'axios'
    Vue.prototype.$http = axios
    ```

    

	2. 服务器保持启动状态，在methods中定义方法，created 钩子函数中获取侧边栏数据，将获取的数据存放到data中

    ```
    methods 节点中:
    
    sync getAsideInfo() {
          const { data: res } = await this.$http.get('myblog/getAsideInfo')
          if (res.status !== 0) {
            return this.$message.error('获取侧边栏导航数据失败！')
          }
          this.asideInfo = res.data
        },
    
    created 钩子函数中:
    
    this.getAsideInfo()
    
    data 节点中:
    
    asideInfo: []
    ```

	3. 将获取的数据渲染在虚拟dom上

    ```
    el-aside 节点中:
    
    <el-menu class="el-menu-vertical-demo" text-color="#242424" unique-opened :default-active="activePath">
              <el-submenu :index="item.my_aside_id" v-for="item in asideInfo" :key="item.my_aside_id">
                <template slot="title">
                  <i :class="item.my_aside_id === '1' ? 'el-icon-chat-dot-round' : 'el-icon-menu'"></i>
                  <span>{{ item.my_aside_lv1 }}</span>
                </template>
                <el-menu-item :index="'/' + subItem.path" v-for="subItem in JSON.parse(item.my_aside_lv2)" :key="subItem.path" @click="saveNavState('/' + subItem.path)">{{
                  subItem.content
                }}</el-menu-item>
              </el-submenu>
            </el-menu>
    ```

	4. 优化侧边栏菜单，保证刷新后默认打开上次访问的模块

    ```
    methods 节点中:
    
    // 当前激活的菜单
        saveNavState(path) {
          window.sessionStorage.setItem('activePath', path)
          this.activePath = path
        }
        
    created 钩子中:
    
    this.activePath = window.sessionStorage.getItem('activePath') || '/qianyan'
    
    data 节点中:
    
    activePath: ''
    ```

    

### 六.主体内容展示

1. 开启侧边栏路由模式，在componens文件下创建writeBefore，buildBlog文件夹，在	    writeBefore文件下创建 qianyan.vue，在buildBlog下创建fg.vue,bg.vue,配置路由规则，测试

2. 建表my_qianyan存储前言的标题，作者，时间，内容等信息

3. 在服务层书写qianyan模块的接口逻辑

4. 在qianyan.vue中调用接口获取前言模块数据，渲染到虚拟dom上

5. 封装content.vue组件，用来展示main区域的内容

   ```
   content.vue 文件中:
   
   <template>
     <el-card class="box-card" shadow="hover">
       <h3>{{ qianyanInfo[0].my_qianyan_title }}</h3>
       <div class="author">
         <span style="margin-right: 20px"><i class="el-icon-user-solid" style="margin-right: 5px"></i>{{ qianyanInfo[0].my_qianyan_author }}</span>
         <span> <i class="el-icon-date" style="margin-right: 5px"></i>{{ qianyanInfo[0].my_qianyan_time | dateFormat }} </span>
       </div>
       <div class="content">
         <div v-for="item in JSON.parse(qianyanInfo[0].my_qianyan_content)" :key="item.titlelv2">
           <h4>{{ item.titlelv2 }}</h4>
           <p>{{ item.content }}</p>
         </div>
       </div>
     </el-card>
   </template>
   
   <script>
   export default {
     name: 'my-content',
     props: {
       qianyanInfo: {
         type: Array
       }
     }
   }
   </script>
   
   <style scoped lang="less">
   .box-card {
     margin-top: 10px;
     width: 100%;
   
     h3 {
       font-weight: 500;
       font-size: 30px;
     }
   
     .author {
       font-size: 16px;
       color: #7f7f7f;
     }
   }
   </style>
   
   
   qianyan.vue 文件中:
   
   <template>
     <my-content :qianyanInfo="qianyanInfo"></my-content>
   </template>
   
   <script>
   import myContent from '../content'
   
   export default {
     components: {
       myContent
     },
     data() {
       return {
         qianyanInfo: []
       }
     },
     created() {
       this.getQianyanInfo()
     },
     methods: {
       async getQianyanInfo() {
         const { data: res } = await this.$http.get('myblog/getQianyanInfo')
         if (res.status !== 0) {
           return this.$message.error('获取前言数据失败！')
         }
         this.qianyanInfo = res.data
         console.log(this.qianyanInfo)
       }
     }
   }
   </script>
   
   <style scoped lang="less"></style>
   ```

   

   ### 七.创建后台页面处理数据库中的数据

   1. 











