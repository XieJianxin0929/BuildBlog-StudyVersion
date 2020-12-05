<template>
  <div class="login">
    <div class="login_box">
      <!-- 头像 -->
      <div class="logo">
        <img src="../assets/logo.jpg" />
      </div>
      <!-- 登录 -->
      <el-form ref="loginFormRef" :model="formmsg" class="login_form" :rules="rules">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user-solid" v-model="formmsg.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" type="password" v-model="formmsg.password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      // 发送请求之前先对表单进行预校验
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('myblog/login', this.formmsg)
        if (res.status !== 0) return this.$message.error('登录失败！')
        this.$message.success('登录成功')
        // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
        //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
        //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
        window.sessionStorage.setItem('token', res.token)
        // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push('/cms')
      })
    }
  },
  data() {
    return {
      formmsg: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 15,
            message: '长度在 3 到 15 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: #2b4b6b;
  .login_box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 2px 3px 3px rgba(255, 255, 255, 0.6);
    .logo {
      position: absolute;
      left: 50%;
      top: -75px;
      transform: translate(-50%);
      width: 130px;
      height: 130px;
      background-color: #fff;
      border: 3px solid #ccc;
      border-radius: 50%;
      overflow: hidden;
      padding: 10px;
      img {
        width: 100%;
        background-color: #ccc;
        border-radius: 50%;
      }
    }
    .login_form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
    }

    .btns {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
