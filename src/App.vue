<script setup lang="ts">

import { ref } from 'vue';

const textareaValue = ref(window.location.href); // 定义一个响应式引用存储textarea的值
function click(){
  console.log(1111);
  textareaValue.value ='1111'
}

</script>

<template>
  <div>
    <textarea 
      v-model="textareaValue" 
      class="border rounded p-2 w-full h-32" 
      placeholder="请输入内容">
    </textarea>
    <div @click="click">Click</div>
  </div>
</template>

<style scoped>
</style>
