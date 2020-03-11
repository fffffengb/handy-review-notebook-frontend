<!--<template>-->
<!--  <div>-->
<!--    <h1>登录</h1>-->
<!--    <a-button type="primary" @click="login(username, password)">按钮</a-button>-->
<!--    <a-input placeholder="Basic usage" v-model="username" ref="userNameInput">-->
<!--      <a-icon slot="prefix" type="user" />-->
<!--    </a-input>-->
<!--    <a-input placeholder="Basic usage" v-model="password" ref="passwordInput">-->
<!--      <a-icon slot="prefix" type="user" />-->
<!--    </a-input>-->
<!--    <a-alert type="error" message="Error text" banner v-if="errPassword"/>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--  import { postLogin, cacheLoginStatus } from '@/network/api'-->
<!--  import cookie from 'js-cookie'-->
<!--  export default {-->
<!--  name: 'Login',-->
<!--  data() {-->
<!--    return {-->
<!--      username: "fffengb",-->
<!--      password: "cptbtptp",-->
<!--      errPassword: false-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    login(username, password) {-->
<!--      postLogin(username, password).then((res) =>{-->
<!--        // 标记此用户已登录,用于路由守卫判断-->
<!--        this.$store.commit("setLoginStatus", true);-->
<!--        //存储认证token和获取时间-->
<!--        cacheLoginStatus(res.data)-->
<!--        cookie.set("username", username, {expires: 15});-->
<!--        cookie.set("password", password, {expires: 15});-->
<!--        this.$router.push("/home");  // 跳转到首页-->
<!--      }).catch(err => {-->
<!--        this.errPassword = true-->
<!--        console.log(err);-->
<!--      })-->
<!--    }-->
<!--  }-->
<!--  }-->

<!--</script>-->

<!--<style>-->
<!--</style>-->

<template>
  <div class="root">
    <div class="avatar">
      <a-avatar src="timg.jfif" :size="128"/>
    </div>
    <div class="main-form">
      <h1>这个头像真可爱</h1>
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item>
          <a-input v-decorator="[ 'userName', { rules: [{ required: true, message: '用户名不能为空~' }] },]"
                   placeholder="用户名: fffengb; 密码: cptbtptp"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input v-decorator="[ 'password', { rules: [{ required: true, message: '密码不能为空~' }] },]"
                  type="password"
                  placeholder="Password"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
  <!--        <a-checkbox-->
  <!--                v-decorator="[-->
  <!--          'remember',-->
  <!--          {-->
  <!--            valuePropName: 'checked',-->
  <!--            initialValue: true,-->
  <!--          },-->
  <!--        ]"-->
  <!--        >-->
  <!--          Remember me-->
  <!--        </a-checkbox>-->
  <!--        <a class="login-form-forgot" href="">-->
  <!--          Forgot password-->
  <!--        </a>-->
          <a-button type="primary" ghost html-type="submit" class="login-form-button">
            登录
          </a-button>
          <a-button type="primary" ghost @click="register" class="register-form-button">
            注册
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
  import { postLogin, cacheLoginStatus } from '@/network/api'
  import cookie from 'js-cookie'
  export default {
    name: 'Login',
    data() {
      return {
        username: "fffengb",
        password: "cptbtptp",
        errPassword: false
      };
    },
    beforeCreate() {
      this.form = this.$form.createForm(this, { name: 'normal_login' });
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log(values.userName, values.password);
            postLogin(values.userName, values.password).then((res) =>{
              // 标记此用户已登录,用于路由守卫判断
              this.$store.commit("setLoginStatus", true);
              //存储认证token和获取时间
              cacheLoginStatus(res.data)
              cookie.set("username", this.username, {expires: 15});
              cookie.set("password", this.password, {expires: 15});
              this.$router.push("/home");  // 跳转到首页
            }).catch(err => {
              this.errPassword = true
              console.log(err);
            })
          }
        });
      },
      register(){
        this.$message.info("此功能暂未开放~")
      }
    },
  };
</script>
<style scoped>
  .root {
    height: 100%;
    width: 100%;
    background-color: #ADD8E6;
  }

  .avatar {
    position: absolute;
    left: 47%;
    top: 25%;
  }

  .main-form {
    height: 200px;
    width: 600px;
    padding: 30px;
    position: absolute;
    left: 33%;
    top: 33%;
  }

  .register-form-button {
    margin-left: 20px;
  }
</style>
