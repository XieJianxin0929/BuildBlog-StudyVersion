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
                    <el-dropdown-item>暂未开放</el-dropdown-item>
                    <el-dropdown-item>暂未开放</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </li>
              <li class="el-icon-s-opportunity"><span style="margin-left: 5px;">时间线</span></li>
              <li class="el-icon-chat-dot-square">
                <el-dropdown>
                  <span class="el-dropdown-link" style="margin-left: 5px;">联系我<i class="el-icon-arrow-down el-icon--right"></i> </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>暂未开放</el-dropdown-item>
                    <el-dropdown-item>暂未开放</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </li>
            </ul></el-col
          >
        </el-row>
      </el-card>
    </el-header>
    <el-container>
      <el-aside width="300px" style="padding-top: 30px;">
        <el-menu class="el-menu-vertical-demo" text-color="#242424" router unique-opened :default-active="activePath">
          <el-submenu :index="item.my_aside_id + ''" v-for="item in asideInfo" :key="item.my_aside_id">
            <template slot="title">
              <i :class="item.my_aside_id === 1 ? 'el-icon-chat-dot-round' : 'el-icon-menu'"></i>
              <span>{{ item.my_aside_lv1 }}</span>
            </template>
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in JSON.parse(item.my_aside_lv2)" :key="subItem.path" @click="saveNavState('/' + subItem.path)">{{
              subItem.content
            }}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <keep-alive>
          <router-view :key="$route.fullPath" />
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import article from './article'

export default {
  data() {
    return {
      input1: '',
      asideInfo: [],
      activePath: '',
      pathInfo: []
    }
  },
  created() {
    this.getAsideInfo()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    async getAsideInfo() {
      const { data: res } = await this.$http.get('myblog/getAsideInfo')
      if (res.status !== 0) {
        return this.$message.error('获取侧边栏导航数据失败！')
      }
      this.asideInfo = res.data

      // 动态添加二级路由  +  keep-alive key值不同使相同组件不缓存
      res.data.forEach(element => {
        JSON.parse(element.my_aside_lv2).forEach(value => {
          this.pathInfo.push(value.path)
        })
      })
      var arr = []
      this.pathInfo.forEach(element => {
        arr.push({ path: '/' + element, component: () => import('../components/article.vue') })
      })
      this.$router.options.routes[3].children.push(...arr)
      this.$router.addRoutes(this.$router.options.routes)
    },
    // 当前激活的菜单
    saveNavState(path) {
      window.sessionStorage.setItem('activePath', path)
      this.activePath = path
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

.el-submenu:hover span {
  color: #67c23a;
}

.el-submenu span {
  font-size: 15px;
}

.el-submenu i {
  margin-top: 5px;
}

.el-menu-item.is-active {
  font-weight: 600;
  color: #3eaf7c;
  background: rgba(62, 175, 124, 0.15);
  border-right: 3px solid #3eaf7c;
}
</style>
