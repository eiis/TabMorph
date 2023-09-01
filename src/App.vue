<script setup lang="ts">

import { Ref, ref } from 'vue';

interface BookMarks {
  active: boolean
  audible: boolean
  autoDiscardable: boolean
  discarded: boolean
  favIconUrl: string
  groupId: number
  height: number
  highlighted: boolean
  id: number
  incognito: boolean
  index: number
  mutedInfo: MutedInfo
  pinned: boolean
  selected: boolean
  status: string
  title: string
  url: string
  width: number
  windowId: number
}

interface MutedInfo {
  muted: boolean
}

const bookMarks: Ref<BookMarks[]> = ref([]);  // 定义一个响应式引用存储textarea的值

chrome.tabs.query({
  currentWindow: true
}).then((tabs) => {
  // for (let tab of tabs) {
    console.log(tabs,'tabs');
    bookMarks.value = tabs as any;
  // }
})

function bookMark(e: BookMarks){
  console.log(e.url,'bookMark');
  window.location.href = e.url;
}

</script>

<template>
  <div class="w-full h-[100px] rounded p-4">
    <div v-for="item in bookMarks" :key="item.id" class="flex items-center justify-center hover:text-yellow-400 ">
      <img class="w-[10px] h-[10px]" :src="item.favIconUrl">
      <span @click="bookMark(item)" class="truncate w-[80px]">{{ item.title }}</span>
    </div>
  </div>
</template>

<style scoped>
</style>
