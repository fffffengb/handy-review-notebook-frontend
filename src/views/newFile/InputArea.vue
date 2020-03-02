<template>
  <div class="input-area-root">
    <div class="element hint-text">
      <h1>创建一个新的卡片</h1>
    </div>
    
    <div class="element main-area">
      <a-input placeholder="问题/提示信息" v-model="question"/>
      <div class="answer">
        <a-textarea placeholder="答案" :rows="16" v-model="answer"/>
      </div>
    </div>

    <div class="element save-button">
      <a-button type="primary" ghost @click="save">保存</a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputArea',
  data() {
    return {
      question : "",
      answer : ""
    }
  },
  methods: {
    save () {
      // 从VUEX中取到在LabelArea.vue组件中存下来的标签
      let allSelectedLabels = this.$store.getters.getAllSelectedLabels
      console.log(allSelectedLabels)
      // 发送POST请求到后端
    }
  }
}
</script>

<style>
  .element {
    margin: 10px;
  }
  .hint-text {
    margin-bottom: 5%;
  }
  .answer {
    margin-top: 5%;
  }
  .save-button {
    float: right;
  }
</style>
