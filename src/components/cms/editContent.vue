<template>
  <el-card class="box-card3">
    <h3>选择一篇文章</h3>
    <div class="block">
      <el-cascader v-model="value" :options="options" :props="{ expandTrigger: 'hover' }" @change="handleChange"></el-cascader>
    </div>
    <h3>所选文章详情</h3>
    <el-form ref="form" :model="form" label-width="80px" style="padding-top: 20px; border: 2px solid #F2F6FC">
      <el-form-item label="文章标题">
        <el-col :span="5">
          <el-input v-model="form.title"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="文章作者">
        <el-col :span="5">
          <el-input v-model="form.author"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="创作时间">
        <el-col :span="5">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.time" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="文章内容">
        <quill-editor v-model="form.content"></quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      value: [],
      options: [],
      form: {
        path: '',
        title: '',
        author: '',
        time: '',
        content: ''
      }
    }
  },
  created() {
    this.getCascaderInfo()
  },
  methods: {
    async getCascaderInfo() {
      const { data: res } = await this.$http.get('quanxian/getCascaderInfo')
      if (res.status !== 0) {
        return this.$message.error('获取联级选择器数据失败！')
      }

      // 调整后端返回的数据 符合联级选择器 options 的格式
      res.data.forEach(ele => {
        const obj = {}
        obj.value = ele.my_aside_lv1
        obj.label = ele.my_aside_lv1
        obj.children = []
        JSON.parse(ele.my_aside_lv2).forEach(element => {
          obj.children.push({
            value: element.path,
            label: element.content
          })
        })
        this.options.push(obj)
      })
    },

    // 根据联级选择器信息获取文章信息
    async handleChange(value) {
      const { data: res } = await this.$http.get('myblog/getArticleInfo?path=' + value[1])
      if (res.status !== 0) {
        return this.$message.error('获取文章数据失败！')
      }
      console.log(res)
      this.form.path = res.data[0].my_path
      this.form.title = res.data[0].my_title
      this.form.author = res.data[0].my_author
      this.form.time = res.data[0].my_time
      this.form.content = res.data[0].my_content
      console.log(this.form)
    },

    async onSubmit() {
      var obj = {}
      obj.my_path = this.form.path
      obj.my_title = this.form.title
      obj.my_author = this.form.author
      obj.my_time = this.form.time
      obj.my_content = this.form.content
      const { data: res } = await this.$http.post('quanxian/editArticleInfo', { obj })
      if (res.status !== 0) {
        return this.$message.error('修改文章数据失败！')
      }
      this.$message.success('修改文章成功！')
    }
  }
}
</script>

<style lang="less" scoped>
.box-card3 {
  margin-top: 10px;
  width: 100%;

  h3:nth-of-type(1) {
    margin-top: 0;
  }
}
</style>
