<template>
  <a-layout id="base-layout">
    <!-- 侧边栏 -->
      <div id="sider">
        <GlobalSider @clickitem="switchview"></GlobalSider>
      </div>

    <!-- 主体 -->
    <a-layout>
      <!--顶部导航栏-->
      <GlobalHeader></GlobalHeader>
      <!-- 内容 -->
      <a-layout-content :style="{ margin: '5px', padding: '5px', background: '#FFF', minHeight: '280px' }" >
        <keep-alive>
          <router-view/>
        </keep-alive>
      </a-layout-content>

      <!-- 页脚 -->

    </a-layout>
  </a-layout>
</template>

<script>
import { GlobalHeader, GlobalSider } from '@/components'

  export default {
    name: 'BasicLayout',
    components: {
      GlobalHeader,
      GlobalSider
    },
    data() {
      return {
        collapsed: false,
      };
    },
    methods: {
      switchview(path) {
        this.$router.replace(path).catch(err => {
          console.log("在BasicLayout中重复选择路由")
          console.log(err)
        })
      }
    }
  };
</script>

<style>

  #base-layout .trigger:hover {
    color: #1890ff;
  }

  #base-layout #sider #logo {
    padding: 1px;
    border-bottom:1px solid #188fff96;
  }

  #base-layout {
    height: 100%;
  }

</style>
