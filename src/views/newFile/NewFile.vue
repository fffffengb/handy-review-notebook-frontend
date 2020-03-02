<template>
  <div class="newFile">
    <div class="inputArea">
      <input-area></input-area>
    </div>
    <div class="labelArea">
      <label-area></label-area>
    </div>
  </div>
</template>

<script>
import InputArea from './InputArea.vue'
import LabelArea from './LabelArea.vue'
export default {
  name: "NewFile",
  components: {
    InputArea,
    LabelArea
  }
}
</script>

<style>
  .newFile {
    height: 100%;
    
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
</style>
