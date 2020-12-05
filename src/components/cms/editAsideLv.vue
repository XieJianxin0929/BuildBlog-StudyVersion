<template>
  <el-card class="box-card2">
    <h3>现有的一级导航和二级导航</h3>
    <div>
      <el-row :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']" v-for="(item1, i1) in asideInfo" :key="item1.my_aside_id">
        <!-- 渲染一级 -->
        <el-col :span="6">
          <el-tag closable @click="editLv1(i1)" @close="handleCloseLv1(item1.my_aside_id)">{{ item1.my_aside_lv1 }}</el-tag>
          <i class="el-icon-caret-right"></i>
        </el-col>
        <!-- 渲染二级 -->
        <el-col :span="18">
          <el-row
            :class="[i2 === 0 ? '' : 'bdtop', 'vcenter', i2 === JSON.parse(item1.my_aside_lv2).length - 1 ? 'bdbottom' : '']"
            v-for="(item2, i2) in JSON.parse(item1.my_aside_lv2)"
            :key="item2.path"
          >
            <el-col :span="6">
              <el-tag type="success" closable @close="handleCloseLv2(item1.my_aside_id, item2.path)">{{ item2.content }}</el-tag>
            </el-col>
          </el-row>
          <el-input
            class="input-new-tag"
            v-if="inputVisible[i1]"
            v-model="inputValue[i1]"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm(i1, item1.my_aside_lv1, item1.my_aside_id)"
            @blur="handleInputConfirm(i1, item1.my_aside_lv1, item1.my_aside_id)"
          >
          </el-input>
          <el-button v-else type="success" plain class="button-new-tag" size="small" @click="showInput(i1)">+ New Tag</el-button>
        </el-col>
      </el-row>
    </div>
    <h3>添加新的一级导航和二级导航</h3>
    <div>
      <el-input class="input-new-tag" v-if="inputVisibleAdd" v-model="inputValueAdd" ref="saveTagInputAdd" size="small" @keyup.enter.native="handleInputConfirmAdd" @blur="handleInputConfirmAdd">
      </el-input>
      <el-button v-else type="primary" plain class="button-new-tag" size="small" @click="showInputAdd">+ New Tag</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      asideInfo: [],
      inputVisible: [],
      inputValue: [],
      inputVisibleAdd: false,
      inputValueAdd: ''
    }
  },
  created() {
    this.getAsideInfo()
  },
  methods: {
    // 获取侧边栏一级导航和二级导航
    async getAsideInfo() {
      const { data: res } = await this.$http.get('myblog/getAsideInfo')
      if (res.status !== 0) {
        return this.$message.error('获取侧边栏导航数据失败！')
      }
      this.asideInfo = res.data
      res.data.forEach(element => {
        this.inputVisible.push(false)
        this.inputValue.push('')
      })
    },

    // 删除一级导航
    async handleCloseLv1(id) {
      const { data: res } = await this.$http.get('quanxian/deleteAsideLv1?id=' + id)
      if (res.status !== 0) {
        return this.$message.error('删除一级导航失败！')
      }
      this.$message.success('删除一级导航成功！')
      this.getAsideInfo()
    },

    // 编辑一级导航 未做
    editLv1(i) {
      console.log(i)
    },

    // 显示添加二级导航的输入框
    showInput(index) {
      // this.inputVisible[index] = true
      this.$set(this.inputVisible, index, true)
      this.$nextTick(_ => {
        this.$refs.saveTagInput[0].$refs.input.focus()
      })
    },

    // 添加二级导航 并添加文章path
    async handleInputConfirm(index, lv1, id) {
      var inputValue = this.inputValue[index].trim()
      if (inputValue.length === 0) {
        this.$set(this.inputVisible, index, false)
        this.$set(this.inputValue, index, '')
        return
      }

      // 获取二级导航数据判断是否为null
      const { data: res } = await this.$http.get('quanxian/getAsideLv2Info?id=' + id)
      if (res.status !== 0) {
        return this.$message.error('获取二级导航数据失败！')
      }

      var arr = []
      // 为null
      if (res.data[0].my_aside_lv2 === null) {
        arr = [
          {
            path: lv1.slice(0, 2) + inputValue.slice(0, 3),
            content: inputValue
          }
        ]
      } else {
        // 不为null
        arr = JSON.parse(res.data[0].my_aside_lv2)
        arr.push({
          path: lv1.slice(0, 2) + inputValue.slice(0, 3),
          content: inputValue
        })
      }

      // 添加二级导航
      var str = JSON.stringify(arr)
      var obj = {
        id: id,
        lv2: str
      }
      const { data: res2 } = await this.$http.post('quanxian/addAsideLv2', { obj })
      if (res2.status !== 0) {
        return this.$message.error('添加二级导航数据失败！')
      }
      this.$message.success('添加二级导航成功！')
      this.getAsideInfo()
      // this.inputVisible[index] = false
      // this.inputValue[index] = ''
      this.$set(this.inputVisible, index, false)
      this.$set(this.inputValue, index, '')

      // 添加新的文章path
      var obj1 = {
        path: lv1.slice(0, 2) + inputValue.slice(0, 3),
        title: inputValue
      }
      await this.$http.post('quanxian/addArticlePath', { obj1 })
    },

    // 删除二级导航 并删除文章path
    async handleCloseLv2(id, path) {
      // 获取二级导航数据
      const { data: res } = await this.$http.get('quanxian/getAsideLv2Info?id=' + id)
      if (res.status !== 0) {
        return this.$message.error('获取二级导航数据失败！')
      }
      // 过滤当前点击的二级导航
      var arr = JSON.parse(res.data[0].my_aside_lv2)
      var newArr = arr.filter(ele => ele.path !== path)

      // 更新二级导航
      var str = JSON.stringify(newArr)
      var obj = {
        id: id,
        lv2: str
      }
      const { data: res2 } = await this.$http.post('quanxian/addAsideLv2', { obj })
      if (res2.status !== 0) {
        return this.$message.error('更新二级导航数据失败！')
      }
      this.$message.success('删除二级导航成功！')

      // 删除点击的二级导航的文章记录
      const { data: res3 } = await this.$http.get('quanxian/deleteArticlePath?path=' + path)
      if (res3.status !== 0) {
        return this.$message.error('删除文章path失败！')
      }
      this.getAsideInfo()
    },

    // 显示添加一级导航的输入框
    showInputAdd() {
      this.inputVisibleAdd = true
      this.$nextTick(_ => {
        this.$refs.saveTagInputAdd.$refs.input.focus()
      })
    },

    // 添加一级导航
    async handleInputConfirmAdd() {
      const inputValue = this.inputValueAdd.trim()
      if (inputValue.length === 0) {
        this.inputVisibleAdd = false
        this.inputValueAdd = ''
        return
      }

      const obj = {
        my_aside_lv1: inputValue
      }
      this.inputVisibleAdd = false
      this.inputValueAdd = ''
      const { data: res } = await this.$http.post('quanxian/addAsideLv1', { obj })
      if (res.status !== 0) {
        return this.$message.error('添加一级导航失败！')
      }
      this.$message.success('添加一级导航成功！')
      this.getAsideInfo()
    }
  }
}
</script>

<style scoped lang="less">
.box-card2 {
  margin-top: 10px;
  width: 100%;

  h3:nth-of-type(1) {
    margin-top: 0;
  }

  .el-tag {
    margin: 7px;
  }

  .bdtop {
    border-top: 2px solid #eee;
  }

  .bdbottom {
    border-bottom: 2px solid #eee;
  }

  .vcenter {
    display: flex;
    align-items: center;
  }

  .button-new-tag {
    margin-top: 7px;
    margin-bottom: 7px;
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    margin-top: 7px;
    margin-bottom: 7px;
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}
</style>
