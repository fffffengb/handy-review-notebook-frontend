<template>
  <div id="sider">
    <a-layout-sider :trigger="null" theme="light" :style="{ height: '100%' }">
      <!-- Logo -->
      <div id="logo">
        <Logo title="好用的笔记本"/>
      </div>

      <!-- 菜单栏 :style="{ background: '#00'} -->
      <div id="menu">
          <a-menu theme="light" mode="inline" :selectedKeys="[selectedKey]" @click="clickMenu">
            <a-menu-item key="1">
              <a-icon type="book" />
              <span>一个新的笔记</span>
            </a-menu-item>

            <a-menu-item key="2">
              <a-icon type="read" />
              <span>查看所有的笔记</span>
            </a-menu-item>

            <a-menu-item key="3">
              <a-icon type="user" />
              <span>个人中心</span>
            </a-menu-item>

          </a-menu>
      </div>
    </a-layout-sider>
  </div>
</template>

<script>
import { Logo } from '@/components'
export default {
  name: 'GlobalSider',
  components: {
    Logo
  },
  data() {
    return {
      selectedKey: "2"
    };
  },
  methods: {
    clickMenu({key}) {
      let path = "";
      this.selectedKey = key;
      if (key === "1") {
        path = "newFile"
      } else if (key === "2") {
        path = "allFile"
      } else if (key === "3") {
        path = "profile"
      }
      this.$emit("clickItem", path)
      }
  },
  mounted() {
    console.log(this.$route.name);
    if (this.$route.name === "NewFile") {
      this.selectedKey = "1";
      console.log(this.selectedKey);
    } else if (this.$route.name === "AllFile") {
      this.selectedKey = "2";
    } else {
      this.selectedKey = "3";
    }
  }
}
</script>

<style>
  #sider {
    height: 100%;
  }

  #menu {
    padding-top: 15px;
  }
</style>
