<template>
    <div id="app" v-if="tag === true">
        <m-header></m-header>
        <swiper></swiper>
        <tab></tab>
        <hr/>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
    <div id="login" v-else>
        <div class="bg-image bg-blur"></div>
        <div class="login_title">Movie Infomation</div>
        <div class="login_content">
            <div class="login" v-if=" type === 'login'">
                <h1 class="h1">登录</h1>
                <form action="">
                    <div class="username">
                        <span class="span">用户名</span>：
                        <input type="text" name="username" v-model="login_username" placeholder="请输入用户名" required>
                    </div>
                    <span class="message span">{{message1}}</span>
                    <div class="password">
                        <span class="span">密码</span>：
                        <input type="password" name="password" v-model="login_password" placeholder="请输入密码" required>
                    </div>
                    <span class="message span">{{message2}}</span>
                    <div>
                        <input class="submit" type="button" value="登录" v-on:click="login">
                    </div>
                    <div class="no-user">
                        <span v-on:click="changeType" class="span" style="font-size: 14px;color: orange; cursor:pointer;">未拥有账号,点击注册</span>
                    </div>
                </form>
            </div>
            <div class="register" v-else>
                <h1 class="h1">注册</h1>
                <form action="">
                    <div class="username">
                        <span class="span">用户名</span>：
                        <input type="text" name="username" v-model="register_username" placeholder="请输入用户名" required>
                    </div>
                    <span class="message span">{{message3}}</span>
                    <div class="password">
                        <span class="span">密码</span>：
                        <input type="password" name="password" v-model="register_password" placeholder="请输入密码" required>
                    </div>
                    <span class="message span">{{message4}}</span>
                    <div>
                        <input class="submit" type="button" value="注册" v-on:click="register">
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
import header from './components/header/header'
import tab from './components/tab/tab.vue'
import swiper from './base/swiper/swiper.vue'
import $ from 'jquery'
import axios from 'axios'
import qs from 'qs'
import {setCookie} from './common/js/cookoie.js'

export default {
  data () {
    return {
      tag: false,
      type: 'login',
      login_username: '',
      login_password: '',
      message1: '',
      message2: '',
      message3: '',
      message4: '',
      register_username: '',
      register_password: ''
    }
  },
  created() {
    this._initHeight()
  },
  watch: {
    login_username: function () {
      if (this.login_username.length < 4) {
        this.message1 = '用户名太短'
      } else {
        this.message1 = ''
      }
    },
    login_password: function () {
      if (this.login_password.length < 4 || this.login_password.length > 12) {
        this.message2 = '密码长度为4到12位之间'
      } else {
        this.message2 = ''
      }
    },
    register_username: function () {
      if (this.register_username.length < 4) {
        this.message3 = '用户名太短'
      } else {
        this.message3 = ''
      }
    },
    register_password: function () {
      if (this.register_password.length < 4 || this.register_password.length > 12) {
        this.message4 = '密码长度为4到12位之间'
      } else {
        this.message4 = ''
      }
    }
  },
  methods: {
    _initHeight() {
      const _this = this
      if (_this.tag !== true) {
        const h = $(window).height()
        this.$nextTick(() => {
          $('#login').css('height', h)
          $('input[name="username"]').focus()
        })
      }
    },
    changeType () {
      this.type = 'register'
    },
    login () {
      const _this = this
      axios.post('http://localhost:8088/video/index.php?g=Video&m=users&a=login', qs.stringify({
        username: _this.login_username,
        password: _this.login_password
      }), {headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }})
        .then((res) => {
          if (res.data.success === true) {
            setCookie('uid', res.data.uid)
            setCookie('uname', res.data.username)
            this.$nextTick(() => {
              _this.tag = true
              $('div').removeClass('content')
            })
          } else {
            _this.message2 = res.data.info
          }
        })
    },
    register () {
      const _this = this
      axios.post('http://localhost:8088/video/index.php?g=Video&m=users&a=register', qs.stringify({
        username: _this.register_username,
        password: _this.register_password
      }), {headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }})
        .then((res) => {
          if (res.data.success === true) {
            this.$nextTick(() => {
              _this.type = 'login'
            })
          } else {
            _this.message4 = res.data.info
          }
        })
    }
  },
  components: {
    'm-header': header,
    'tab': tab,
    'swiper': swiper
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
    #login {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        width: 100%;
    }
        .bg-image
            position:absolute
            width:100%
            height:100%
            background: url("./assets/bg.jpg")
        .bg-blur
            width: 100%
            background-repeat no-repeat
            background-position center
            background-size: cover
            filter: blur(15px)
        .login_title
            top: 80px
            position: relative
            width: 510px
            margin: 0 auto
            font-weight bold
            font-size: 62px
        .login_content
            position: relative
            padding-top:25px
            width: 540px
            height: 345px
            border-radius: 20%
            margin: 0 auto
            top: 100px
            text-align center
            background-color aliceblue
            .h1
                font-size: 32px
                font-weight bold
                padding-bottom: 10px
                border-bottom: 1px inset grey
            .span
                width: 100px
                display: inline-block
            form
                font-size 20px
                position:relative
                top 30px
                .submit
                    position:relative
                    background-color: #9cd5ff
                    width: 100px
                    top 20px
                    -webkit-border-radius: 30%
                    -moz-border-radius: 30%
                    border-radius: 30%
                div
                    margin-top 20px
                .no-user
                    position: relative
                    top:10px
                    left: 150px
                .message
                    color: red
                    width: 220px
                    position: relative
                    top: 10px
                    margin-left: 125px
</style>
