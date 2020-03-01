<template>
  <div class="logo">
    <a-icon style="font-size: 26px; padding: 6px;" type="smile" theme="twoTone"/>
    <span style="font-size: 24px; font-family: 黑体">{{title}}</span>
  </div>
</template>

<script>

export default {
  name: 'Logo',
  props: {
    title: {
      type: String,
      default: '好用的笔记本',
      required: false
    }
  }
}
</script>

<style>
  .logo {
    height: 64px;
    line-height:64px;
    background: rgb(255, 255, 255);
  }
</style>

