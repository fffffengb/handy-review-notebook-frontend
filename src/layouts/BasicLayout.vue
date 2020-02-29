<template>
  <a-layout id="base-layout">
    <!-- 侧边栏 -->
    <a-layout-sider :trigger="null" collapsible v-model="collapsed" theme="light">
      <div class="logo">
        <a-icon style="font-size: 36px; padding: 4px" type="smile" theme="twoTone"/>
      </div>
      <a-menu theme="light" mode="inline" :defaultSelectedKeys="['1']">
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
    </a-layout-sider>

    <!-- 主体 -->
    <a-layout>

      <!--顶部导航栏-->
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
      </a-layout-header>

      <!-- 内容 -->
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        {{collapsed}}
      </a-layout-content>

      <!-- 页脚 -->

    </a-layout>
  </a-layout>
</template>

<script>
  export default {
    data() {
      return {
        collapsed: false,
      };
    },
  };
</script>

<style>
  #base-layout .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  #base-layout .trigger:hover {
    color: #1890ff;
  }

  #base-layout .logo {
    height: 36px;
    /* width: 50%; */
    background: rgb(255, 255, 255);
    margin: 16px;
  }

  #base-layout {
    height: 100%;
  }
  
</style>
