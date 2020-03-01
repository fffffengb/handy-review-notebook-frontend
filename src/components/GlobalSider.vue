<template>
  <div id="sider">
    <a-layout-sider :trigger="null" theme="light" :style="{ height: '100%' }">
      <!-- Logo -->
      <div id="logo">
        <Logo title="好用的笔记本"/>
      </div>

      <!-- 菜单栏 :style="{ background: '#00'} -->
      <div id="menu">
          <a-menu theme="light" mode="inline" :defaultSelectedKeys="['1']" @click="clickMenu">
            <a-menu-item key="1">
              <a-icon type="user" />
              <span>一个新的笔记</span>
            </a-menu-item>

            <a-menu-item key="2">
              <a-icon type="video-camera" />
              <span>今天需要复习的笔记</span>
            </a-menu-item>

            <a-menu-item key="3">
              <a-icon type="upload" />
              <span>查看往日的笔记</span>
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
  methods: {
      clickMenu({key}) {
        let path = ""
        if (key === "1") {
          path = "newFile"
        } else if (key === "2") {
          path = "review"
        } else if (key === "3") {
          path = "allFile"
        }
        this.$emit("clickitem", path)
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