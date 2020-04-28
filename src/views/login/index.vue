<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">欢迎登陆题录系统</h3>
      </div>

      <el-form-item prop="loginEmail">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="loginEmail"
          v-model="loginForm.email"
          placeholder="邮件"
          name="loginEmail"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登陆</el-button>

      <div style="position:relative">
        <div class="tips">
          <span>教师请直接登陆</span>
        </div>
        <div class="tips">
          <span style="margin-right:18px;">学生若没有账户</span>
          <span>可直接注册获取账户</span>
        </div>

        <el-button class="thirdparty-button" type="primary" @click="showDialog=true">
          注册
        </el-button>
      </div>
    </el-form>

    <el-dialog ref="dialogForm" title="注册" :visible.sync="showDialog" @close="handleDialogClose">
      <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form" autocomplete="on" label-position="left">
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="reusername"
            v-model="registerForm.username"
            placeholder="用户名"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
            clearable
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            key="password"
            ref="password"
            v-model="registerForm.password"
            type="password"
            placeholder="密码"
            name="password"
            tabindex="2"
            autocomplete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            key="rePassword"
            ref="rePassword"
            v-model="registerForm.rePassword"
            type="password"
            placeholder="重复密码"
            name="rePassword"
            tabindex="3"
            autocomplete="on"
          />
        </el-form-item>

        <el-form-item prop="academy">
          <span class="svg-container">
            <svg-icon icon-class="peoples" />
          </span>
          <el-input
            key="academy"
            ref="academy"
            v-model="registerForm.academy"
            placeholder="专业"
            name="academy"
            tabindex="5"
            autocomplete="on"
          />
        </el-form-item>

        <el-form-item prop="university">
          <span class="svg-container">
            <i class="el-icon-s-home" />
          </span>
          <el-input
            key="university"
            ref="university"
            v-model="registerForm.university"
            placeholder="学校"
            name="university"
            tabindex="6"
            autocomplete="on"
          />
        </el-form-item>

        <el-form-item prop="userClass">
          <span class="svg-container">
            <svg-icon icon-class="people" />
          </span>
          <el-input
            key="userClass"
            ref="userClass"
            v-model="registerForm.userClass"
            placeholder="班级"
            name="userClass"
            tabindex="7"
            autocomplete="on"
          />
        </el-form-item>

        <el-form-item prop="email">
          <span class="svg-container">
            <svg-icon icon-class="email" />
          </span>
          <el-input
            key="email"
            ref="email"
            v-model="registerForm.email"
            placeholder="邮件"
            name="email"
            tabindex="4"
            autocomplete="on"
          />
        </el-form-item>

        <el-form-item prop="code">
          <el-input
            key="code"
            ref="code"
            v-model="registerForm.code"
            placeholder="请输入验证码:"
            style="width:230px"
            name="code"
          />
          <el-button
            v-show="showTime"
            type="text"
            @click="sendEmail(registerForm.emaill)"
          >
            发送邮箱验证码
          </el-button>
          <el-button
            v-show="!showTime"
            type="text"
            :disabled="true"
          >{{ sendTime }}秒
          </el-button>
        </el-form-item>

        <el-button :loading="loadingRegister" type="primary" style="width:100%;margin-top:40px;margin-bottom:30px;" @click.native.prevent="handleRegister">注册</el-button>

      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  components: { },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('长度必须大于6'))
      } else {
        callback()
      }
    }

    const validateRequired = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入值'))
      } else {
        callback()
      }
    }

    const validateEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }

    return {
      loginForm: {
        email: 'admin',
        password: '111111'
      },
      registerForm: {
        username: '',
        password: '',
        rePassword: '',
        email: '',
        userClass: '',
        academy: '',
        university: '',
        code: ''
      },
      loginRules: {
        email: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      registerRules: {
        username: [{ required: true, trigger: 'blur', validator: validateRequired }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        rePassword: [{ required: true, trigger: 'blur', validator: validatePassword }],
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        userClass: [{ required: true, trigger: 'blur', validator: validateRequired }],
        academy: [{ required: true, trigger: 'blur', validator: validateRequired }],
        university: [{ required: true, trigger: 'blur', validator: validateRequired }],
        code: [{ required: true, trigger: 'blur', validator: validateRequired }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      loadingRegister: false,
      otherQuery: {},
      showTime: true, /* 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
      sendTime: '',
      timer: null,
      showCode: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.loginEmail === '') {
      this.$refs.loginEmail.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          alert('请输入信息')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    handleDialogClose() {
      this.$refs.registerForm.clearValidate()
    },
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          if (this.registerForm.password === this.registerForm.rePassword) {
            this.loadingRegister = true
            this.$store.dispatch('user/register', this.registerForm)
              .then(() => {
                this.showDialog = false
                this.loadingRegister = false
              })
              .catch(() => {
                this.loadingRegister = false
              })
          } else {
            alert('两次密码请输入相同')
            return false
          }
        } else {
          alert('请输入信息')
          return false
        }
      })
    },

    sendEmail() {
      this.showCode = true
      const TIME_COUNT = 60 //  更改倒计时时间
      if (!this.timer) {
        this.sendTime = TIME_COUNT
        this.showTime = false
        this.$store.dispatch('user/registerEmail', this.registerForm.email)
          .then(() => {
            alert('发送成功,注意查收')
          })
          .catch(() => {
            alert('发送失败')
          })
        this.timer = setInterval(() => {
          if (this.sendTime > 0 && this.sendTime <= TIME_COUNT) {
            this.sendTime--
          } else {
            this.showTime = true
            clearInterval(this.timer) // 清除定时器
            this.timer = null
          }
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .register-form{
    .el-input {
      input {
        color: $bg;
        caret-color: $bg;
      }
      .el-input-group__append{
        top:30px;
      }
    }
    .code {
      margin-top: 60px;
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .register-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
