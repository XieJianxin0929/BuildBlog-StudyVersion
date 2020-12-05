<template>
  <el-container>
    <el-header style="padding: 0;">
      <el-card class="box-card">
        <el-row>
          <el-col :span="12"><img src="../../..//public/logo.jpg" width="40" height="40" style="vertical-align: middle; margin-left: 5px;" /><span class="text item">解健鑫博客后台管理</span></el-col>
        </el-row>
      </el-card>
    </el-header>
    <el-container>
      <el-aside width="300px" style="padding-top: 30px;">
        <el-menu class="el-menu-vertical-demo" background-color="#F2F6FC" text-color="#242424" router unique-opened :default-active="cmsActivePath">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>编辑侧边栏</span>
            </template>
            <el-menu-item index="/editAsideLv"  @click="saveNavState('/editAsideLv')">编辑一级二级导航</el-menu-item>
            <el-menu-item index="/editContent"  @click="saveNavState('/editContent')">编辑文章内容</el-menu-item>
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
    //   asideInfo: [],
      cmsActivePath: ''
    }
  },
  created() {
    // this.getAsideInfo()
    this.cmsActivePath = window.sessionStorage.getItem('cmsActivePath')
  },
  methods: {
    // async getAsideInfo() {
    //   const { data: res } = await this.$http.get('myblog/getAsideInfo')
    //   if (res.status !== 0) {
    //     return this.$message.error('获取侧边栏导航数据失败！')
    //   }
    //   this.asideInfo = res.data
    // },
    // 当前激活的菜单
    saveNavState(path) {
      window.sessionStorage.setItem('cmsActivePath', path)
      this.cmsActivePath = path
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
  background-color: #F2F6FC;
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
