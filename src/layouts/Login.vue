<template>
  <div>
    <h1>登录</h1>
    <a-button type="primary" @click="login(username, password)">按钮</a-button>
    <a-input placeholder="Basic usage" v-model="username" ref="userNameInput">
      <a-icon slot="prefix" type="user" />
    </a-input>
    <a-input placeholder="Basic usage" v-model="password" ref="passwordInput">
      <a-icon slot="prefix" type="user" />
    </a-input>
    <a-alert type="error" message="Error text" banner v-if="errPassword"/>
  </div>
</template>

<script>
  import {postLogin} from '@/network/api'
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
  methods: {
    login(username, password) {
      postLogin(username, password).then((data) =>{
        // 标记此用户已登录,用于路由守卫判断
        this.$store.commit("setLoginStatus", true);
        //存储认证token和获取时间
        window.sessionStorage.setItem("token", data.data);
        window.sessionStorage.setItem("tokenCreateTime", new Date() + "")
        cookie.set("username", username, {expires: 15});
        cookie.set("password", password, {expires: 15});
        this.$router.push("/home");  // 跳转到首页
      }).catch(err => {
        this.errPassword = true
        console.log(err);
      })
    }
  }
  }

</script>

<style>
</style>
