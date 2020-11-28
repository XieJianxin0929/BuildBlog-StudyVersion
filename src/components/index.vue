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
