<template>
  <a-layout-header class="header" style="background: #FFF;">
      <a-dropdown class="dropdown" >
        <a class="dropdown-link" href="#">
          <a-avatar class="avatar" :size="54" style="margin: 5px;" :src="avatar"/>
          <span class="nickname">{{ nickname }}</span>
        </a>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper" @click="clickMenu">
          <a-menu-item key="0">
            <router-link :to="{ name: 'center' }">
              <a-icon type="user"/>
              <span>个人中心</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="1">
            <router-link :to="{ name: 'settings' }">
              <a-icon type="setting"/>
              <span>设置</span>
            </router-link>
          </a-menu-item>
          <a-menu-divider/>
          <a-menu-item key="2">
            <a-icon type="logout"/>
            <span>退出</span>
          </a-menu-item>
        </a-menu>
      </a-dropdown>      
  </a-layout-header>
</template>

<script>
export default {
  name: 'GlobalHeader',
  data () {
    return {
      avatar : '/TheLittlePrince.jpg',
      nickname : '天野远子'
    }
    
  },
  methods: {
    clickMenu({ key, domEvent }) {
      console.log("点击了退出")
      console.log({ key, domEvent })
    }
  }
}
</script>

<style>
  .header .dropdown {
    float: right;
    color: #000;
    text-decoration:none;
  }
  .header .dropdown .nickname {
    font-size: 20px;
    font-family: '仿宋';
  }
</style>