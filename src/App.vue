<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view v-if="isRouterAlive"/>
    </div>
  </a-locale-provider>
</template>

<script>
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
  import moment from 'moment';
  import 'moment/locale/zh-cn';
  moment.locale('zh-cn');
  export default {
    provide () {
      return {
        reload: this.reload
      }
    },
    methods: {
      reload () {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      }
    },
    data() {
      return {
        locale: zhCN,
        isRouterAlive: true
      }
    }
  }
</script>

<style scoped>
  #app {
    height: 100%;
  }
</style>
