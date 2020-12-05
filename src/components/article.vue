<template>
  <el-card class="box-card" shadow="hover">
    <h3>{{ my_title }}</h3>
    <div class="author">
      <span style="margin-right: 20px"><i class="el-icon-user-solid" style="margin-right: 5px"></i>{{ my_author }}</span>
      <span> <i class="el-icon-date" style="margin-right: 5px"></i>{{ my_time | dateFormat }} </span>
    </div>
    <div v-html="my_content"></div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      Info: [],
      my_title: '',
      my_author: '',
      my_time: '',
      my_content: ''
    }
  },
  created() {
    var path = this.$route.path.split('/')[1]
    this.getArticleInfo(path)
  },
  methods: {
    async getArticleInfo(path) {
      const { data: res } = await this.$http.get('myblog/getArticleInfo?path=' + path)
      if (res.status !== 0) {
        return this.$message.error('获取前台页面数据失败！')
      }
      this.Info = res.data
      this.my_title = this.Info[0].my_title
      this.my_author = this.Info[0].my_author
      this.my_time = this.Info[0].my_time
      this.my_content = this.Info[0].my_content
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
