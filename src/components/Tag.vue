<template>
  <div>
    <span v-for=" (value, key) in tags " v-bind:key="key">
    <a-checkable-tag
            :key="key"
            :checked="selectedTags.indexOf(value.id) > -1"
            @change="(checked) => handleChange(value.id, checked)"
    >
      {{value.labelName}}
    </a-checkable-tag>
  </span>
  </div>
</template>

<script>
  import {requestAllLabel} from "@/network/api";
  export default {
    name: "Tag",
    data(){
      return {
        tags: {},
        selectedTags: []
      }
    },
    methods: {
      handleChange(key, checked) {
        const { selectedTags } = this;
        this.selectedTags = checked ? [...selectedTags, key] : selectedTags.filter(t => t !== key);
        this.$emit("tagsChanged", this.selectedTags)
      },
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

</style>
