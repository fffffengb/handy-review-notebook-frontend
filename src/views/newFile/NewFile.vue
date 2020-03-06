<template>
  <div class="newFile">
    <div class="spin">
      <a-spin size="large" :spinning="spinning"></a-spin>
    </div>
    <div class="inputArea">
      <h1>创建一个新的卡片</h1>
      <div class="question element">
        <a-input placeholder="问题/提示信息" v-model="question"/>
      </div>
      <div class="answer element">
        <a-textarea placeholder="答案" :rows="16" v-model="answer"/>
      </div>
      <div class="button">
        <a-button type="primary" ghost @click="save">保存</a-button>
      </div>
    </div>
    <div class="labelArea">
      <h1>选择合适的标签吧</h1>
      <div class="label element">
        <template v-for=" (value, key) in tags">
          <a-checkable-tag
                  :key="key"
                  :checked="selectedTags.indexOf(value.id) > -1"
                  @change="(checked) => handleChange(value.id, checked)"
          >
            {{value.labelName}}
          </a-checkable-tag>
        </template>
      </div>
    </div>
  </div>
</template>

<script>

  import {postNewCard, requestAllLabel} from "@/network/api";

export default {
  name: "NewFile",
  data() {
    return {
      spinning: false,
      question: "",
      answer: "",
      tags: {},
      selectedTags: []
    }
  },
  methods: {
    handleChange(key, checked) {
      const { selectedTags } = this;
      this.selectedTags = checked ? [...selectedTags, key] : selectedTags.filter(t => t !== key);
      this.$store.commit("changeSelectedLabels", this.selectedTags)
      console.log(this.selectedTags);
    },
    save () {
      // 从VUEX中取到在LabelArea.vue组件中存下来的标签
      let allSelectedLabels = this.$store.getters.getAllSelectedLabels
      console.log(allSelectedLabels)
      // 发送POST请求到后端
      postNewCard(this.question, this.answer, allSelectedLabels).then(res => {
        // 加载完成
        this.spinning = false
        // 添加成功提示
        this.$message.success('添加成功啦~')
        // 取消所有已选择的标签
        this.selectedTags = []
        console.log(res)
      }).catch(err => {
        this.$message.error('网络异常')
        console.log(err)
      })
      // 异步显示正在加载
      this.spinning = true
    }
  },
  mounted() {
    requestAllLabel().then(res => {
      this.tags = res.data
    }).catch(err =>{
      console.log("请求所有标签时出现了错误: ", err)
    })
  }
}
</script>

<style scoped>
  .newFile {
    height: 100%;
  }
  .element {
    margin-top: 50px;
    margin-bottom: 50px;
  }

  .newFile .spin {
    z-index: 1;
    position: absolute;
    left: 50%;
    top: 50%;
  }
  .newFile .inputArea {
    height: 100%;
    width: 68%;
    float: left;
    margin: 5px;
  }

  .newFile .labelArea {
    height: 100%;
    width: 30%;
    float: left;
    margin: 5px;
  }

  .newFile .button {
    float: right;
  }
</style>
