<template>
  <div>
    <div class="label-area-hint-text">
      <h1>给这个卡片添加相应的标签吧</h1>
    </div>
    
    <br/>
    <template v-for=" (value, key) in tags">
      <a-checkable-tag
        :key="key"
        :checked="selectedTags.indexOf(key) > -1"
        @change="(checked) => handleChange(key, checked)"
      >
        {{value}}
      </a-checkable-tag>
    </template>
  </div>
</template>
<script>
  export default {
    name: "LabelArea",
    data() {
      return {
        tags: {"1": "搜索结果", "2": "单词","3": "搜索结果", "4": "单词","5": "搜索结果", "6": "单词","7": "搜索结果", "8": "单词"},
        selectedTags: [],
      };
    },
    methods: {
      handleChange(key, checked) {
        const { selectedTags } = this;
        const nextSelectedTags = checked ? [...selectedTags, key] : selectedTags.filter(t => t !== key);
        this.selectedTags = nextSelectedTags;
        this.$store.commit("changeSelectedLabels", this.selectedTags)
      },
    },
  };
</script>

<style>
  .label-area-hint-text {
    padding-left: 7px;
    padding-top: 10px;
  }
</style>
